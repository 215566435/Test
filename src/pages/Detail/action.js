import { call, put, take, select } from "redux-saga/effects";
import { Alert } from "react-native";
import { header, Url } from "../../util";

const computedUrl = Url => {
  return (
    "http://cdn2u.com" +
    Url +
    `?width=${750}` +
    `&constrain=${true}` +
    `&bgcolor=white`
  );
};

const getSizeSync = ary => {
  return ary.map(url => {
    return {
      url: url,
      height: 750
    };
  });
};

/**
 * 选出加入购物车的物品
 */
function nameSelector(matchID, item) {
  for (let index in item) {
    if (item[index].id === matchID) {
      return item[index];
    }
  }
}

/**
 * DetailPageInstance 是用于跳转用的实例，因此我们要传递一个实例过来
 * 这样子我们才能够在alert中跳转
 */
function reformJson(item) {
  return {
    id: item.id,
    qty: item.qty || 1,
    selected: item.selected
  };
}

const actionStategy = {
    // 组件加载完成， 从服务器请求数据
    fetchGoods: function*(state) {
        const allState = yield select(state => state);
        const currentID = allState.PriceList.currentID;
        const res = yield call(fetch, Url + "goods/Get?id=" + currentID, {
        method: "POST",
        headers: header.get(),
        body: "{}"
        });

        const json = yield res.json();
        console.log(json);
        const aryRes = getSizeSync(json.data.ci);
        const firstPatch = { ...state, page: json.data, contentImg: aryRes };
        yield put({
        type: "Detail_SET_STATE",
        data: firstPatch
        });
    },
    addCartItem: function*(state, others) {
        const item = reformJson(others.item);
        const DetailPageInstance = others.item.DetailPageInstance;
        const res = yield call(fetch, Url + "cart/AddItem", {
        method: "POST",
        headers: header.get(),
        body: JSON.stringify(item)
        });
        const json = yield res.json();

        const oneItem = nameSelector(item.id, json.data.items);
        Alert.alert(
        "加入成功!",
        `${oneItem.name}\n\n 加入数量：${item.qty}\n`,
        [
            { text: "返回", style: "cancel" },
            {
            text: "查看购物车",
            onPress: () => DetailPageInstance.props.navigation.navigate("Cart")
            }
        ],
        { cancelable: false }
        );
    },
    clearDetail: function*(state) {
        yield put({
        type: "Detail_SET_STATE",
        data: { ...state, page: undefined, contentImg: [] }
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
      const state = yield select(state => state.Detail);
      const actionFn = actionStategy[type];
      yield call(actionFn, state, others);
    } catch (e) {
      console.log(e);
    }
  }
};
