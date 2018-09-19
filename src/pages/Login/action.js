import { call, put, take, select } from "redux-saga/effects";
import { Url, header } from "../../util";
import { Alert, Platform, ToastAndroid, AsyncStorage } from "react-native";
import * as WeChat from "react-native-wechat";
/**
 * 服务器返回的错误代码，用map来对应
 */
const ERR_MSG = {
  "UserName Required": "用户名必须填写",
  "Password Required": "密码必须填写",
  "Verify Required": "验证码必须填写"
};

/**
 * 封装的alert方法
 * @param {string} msg
 */
function alert(msg) {
  Alert.alert(
    "登陆失败",
    ERR_MSG[msg] ? ERR_MSG[msg] : msg,
    [{ text: "Cancel", style: "cancel" }, { text: "OK" }],
    { cancelable: false }
  );
}

function* showLoading(bool) {
  yield put({
    type: "Login_SET_STATE",
    data: {
      loading: bool
    }
  });
}

function* fetchWrap({ url, body }) {
  if (Platform.OS !== "ios") {
    ToastAndroid.showWithGravity(
      "登陆中...",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  } else {
    yield showLoading(true);
  }
  const res = yield call(fetch, url, {
    method: "POST",
    headers: header.get(),
    body: JSON.stringify(body)
  });
  yield showLoading(false);
  return yield res.json();
}
//登录逻辑判断
const actionStategy = {
  onWechatLogin: function*(state, others) {
    try {
      const wxRes = yield WeChat.sendAuthRequest("snsapi_userinfo");
      const json = yield fetchWrap({
        url: Url + "user/LoginByWechat",
        body: {
          WechatCode: wxRes.code
        }
      });
      // console.log(others.ins, json);
      others.ins.onLoginFinished(json);
    } catch (e) {
      alert(e);
    }
  },
  onNormalLogin: function*(state, others) {
    console.log('login', others);
    try {
      const body = {
        username: others.form.name,
        password: others.form.psw,
        verify: others.form.code,
        hash: others.form.hash,
        unionId: others.form.unionId
      };
      const json = yield fetchWrap({
        url: Url + "user/Login",
        body: body
      });
      others.ins.onLoginFinished(json);
    } catch (e) {
      alert(e);
    }
  }
};

function convert() {
  return Object.keys(actionStategy);
}

export const watch = function*() {
  const actionList = convert();

  while (true) {
    const { type, ...others } = yield take(actionList);
    try {
      const state = yield select(state => state.Login);
      const actionFn = actionStategy[type];
      if (!actionFn) continue;
      yield call(actionFn, state, others);
    } catch (e) {
      console.log(e);
    }
  }
};
