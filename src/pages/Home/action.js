import { call, put, take, select } from "redux-saga/effects";
import { Url, header, setLogin } from "../../util";
import { AsyncStorage } from "react-native";
import { combineReducers } from "redux";
import BaseManager from "../../NetworkManager/BaseManager";

function* fetchFunc({ url, body }) {
  yield setLogin();
  const res = yield call(fetch, url, {
    method: "POST",
    headers: header.get(),
    body: JSON.stringify(body)
  });
  return yield res.json();
}

class HomeManager extends BaseManager {
  *getHomeData() {
    const homeJsonData = yield AsyncStorage.getItem("homeData");
    if (homeJsonData === null) {
      const json = yield this.getHomeDataRefresh();
      // yield AsyncStorage.setItem('homeData', JSON.stringify(json));
      return json;
    } else {
      return JSON.parse(homeJsonData);
    }
  }
  *getHomeDataRefresh() {
    const json = yield this.fetchApi({
      url: this.Url + "home/index",
      body: ""
    });
    yield AsyncStorage.setItem("homeData", JSON.stringify(json));
    return json;
  }

  *mapHomeDataToProps(json, put, state) {
    yield put({
      type: "Home_SET_STATE",
      data: {
        ...state,
        Carousel: json.data.s,
        goodNews: json.data.g,
        event: json.data.e,
        hotKey: json.data.h
      }
    });
  }
}

const actionStategy = {
  fetchHome: function*(state) {
    //const Token = yield AsyncStorage.getItem("token");
    const Token = yield AsyncStorage.getItem("token");
    if (!Token) {
      AsyncStorage.clear();
    }else {
        header.set(Token)
    }
    const hmanager = new HomeManager();
    yield hmanager.mapHomeDataToProps(
      yield hmanager.getHomeDataRefresh(),
      put,
      state
    );
    // yield hmanager.mapHomeDataToProps(yield hmanager.getHomeData(), put, state);

    // setTimeout(() => {
    //   hmanager.mapHomeDataToProps(hmanager.getHomeDataRefresh(), put, state);
    // }, 1000);
    // yield hmanager.mapHomeDataToProps(yield hmanager.getHomeDataRefresh(), put, state);
    // const Token = yield AsyncStorage.getItem('Token')
    // if (Token) {
    //     AsyncStorage.clear();
    //     yield hmanager.mapHomeDataToProps(yield hmanager.getHomeDataRefresh(), put, state);
    // }

    // if (Token) {
    //     AsyncStorage.clear();
    //     yield hmanager.mapHomeDataToProps(yield hmanager.getHomeDataRefresh(), put, state);
    // }

    const info = yield fetchFunc({
      url: Url + "user/GetCurrentUserinfo",
      body: ""
    });
    console.log(info);
    yield put({
      type: "Home_SET_STATE",
      data: { noteCount: info.data.messageCount }
    });

    const Aud = yield AsyncStorage.getItem("isAud");
    let fix = false;
    if (Aud === "true") {
      fix = true;
    } else {
      fix = false;
    }
    const PriceList = yield select(p => p.PriceList);
    yield put({
      type: "SET_STATE",
      data: { ...PriceList, isAud: fix }
    });
  },
  checkDetail: function*(state, others) {
    const PriceListState = yield select(allState => allState.PriceList);
    yield put({
      type: "SET_STATE",
      data: { ...PriceListState, currentID: others.id }
    });
    others.instance.props.navigation.navigate("EventDetailPage");
  },
  EventImagePress: function*(state, others) {
    others.instance.props.navigation.navigate("Activity", {
      id: others.id,
      page: "EventDetailPage"
    });
  },
  homeSearch: function*(state, others) {
    others.instance.props.navigation.navigate("Search");
  },
  AUDonValueChange: function*() {
    const state = yield select(state => state.PriceList);
    const fix = !state.isAud ? "true" : "false";
    AsyncStorage.setItem("isAud", fix);
    yield put({
      type: "SET_STATE_Currency",
      data: { ...state, isAud: state.isAud !== void 666 ? !state.isAud : true }
    });
  },
  refreshAll: function*() {
    yield put({
      type: "fetchHome"
    });
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
      const state = yield select(state => state.Home);
      const actionFn = actionStategy[type];
      if (!actionFn) continue;
      yield call(actionFn, state, others);
    } catch (e) {
      console.log(e);
    }
  }
};
