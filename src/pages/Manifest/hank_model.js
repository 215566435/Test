import BaseManager from "../../NetworkManager/BaseManager";
import { ListManager } from "../../NetworkManager/BaseManager";
import { Alert } from "react-native";

//admin.js
export default {
  namespace: "manifest",
  state: {
    orderList: []
  },
  reducers: {
    mapOrderList(state, { payload }) {
      return { ...state, orderList: payload };
    }
  },
  effects: {
    *fetchOrderList({ select, call, put }, { payload }) {
      const orderList = yield select(state => state.manifest.orderList); //select拿到当前list数据
      const manager = new BaseManager();
      const res = yield manager.fetchApi({//fetch新的数据
        url: manager.Url + "order/list",
        body: {
          type: payload.type,
          keyword: "",
          currentpage: payload.page,
          pagesize: 15
        }
      });
      try {
        let items = res.data.items;//数据格式转化
        //  console.log(res)   
          items = [...orderList, ...items]
        yield put({
          type: "mapOrderList",
          payload: items
        });
      } catch (e) {
        
        Alert.alert("出错了", e.message);
      }

    }
  }
};
