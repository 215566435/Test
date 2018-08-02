/**
 * 全球好物页面的model
 */
import { Alert } from "react-native";
import BaseManager from "../../NetworkManager/BaseManager";

export default {
  namespace: "globalProducts",
  //这个state是伪数据，也可以在index中声明
  state: {
    globalProducts: {
      globalProductsList: [{
        n: {},
        i: {},
        g: [
          {
            id: {},
            n: {},
            i: {},
            p: {},
            ap: {
              p: {},
              p2: {},
              ps: {}
            },
            s: {},
            si: {}
          }
        ],
        l: {}
      }],
      topImage: {}
    }
  },

  reducers: {
    mapGlobalProducts(state, { payload }) {
      return { ...state, globalProducts: payload };
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchGlobalProducts({ select, call, put }, { payload }) {
      let globalProducts = yield select(state => state.globalProducts.globalProductsList);
      console.log("GlobalProducts", globalProducts);
      const manager = new BaseManager();
      const res = yield manager.fetchApi({
        //fetch新的数据
        url: manager.Url + "goods/globalProducts",
        body: {}
      });

      // 拿到伪数据
      //const res = globalProducts;

      console.log("请求拿到的数据", res);
      try {
        let items = res.data; //数据格式转化
        yield put({
          type: "mapGlobalProducts",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    },

    // 直接从Home的action抄过来的跳转方法 TODO：理解，整理
    *onGoodPress({ select, call, put }, { payload }){
      console.log('onLayoutPress中payload', payload);
      const PriceListState = yield select(allState => allState.PriceList)
      yield put({
          type: 'SET_STATE',
          data: { ...PriceListState, currentID: payload.id }
      })
      payload.instance.props.navigation.navigate('EventDetailPage')
    }
  }
};
