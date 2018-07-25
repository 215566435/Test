/**
 * 会员臻选页面的model
 */
import { Alert } from "react-native";

export default {
  namespace: 'globalProducts',
  //这个state是伪数据，也可以在index中声明
  state: {
      data: {
        items: [
          {id: 1, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
          {id: 2, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
          {id: 3, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
          {id: 4, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
        ]
      }
    },

  reducers: {
    mapGlobalProducts(state, { payload }) {
      return { ...state,  globalProducts: payload};
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchGlobalProducts({ select, call, put }, { payload }) {
      let globalProducts = yield select(state => state.globalProducts);
      console.log('GlobalProducts', globalProducts);
      // const manager = new BaseManager();
      // const res = yield manager.fetchApi({
      //   //fetch新的数据
      //   url: manager.Url + "GlobalProducts/list",
      //   body: {
      //     type: payload.type,
      //     keyword: "",
      //     currentpage: payload.page,
      //     pagesize: 15
      //   }
      // });

      // 拿到伪数据
      const res = globalProducts

      console.log('请求拿到的数据', res);
      try {
        let items = res.data.items; //数据格式转化
        yield put({
          type: "mapGlobalProducts",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    }
  }
};
