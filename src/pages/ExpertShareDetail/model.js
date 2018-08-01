/**
 * 达人分享页面的model
 */
import { Alert } from "react-native";
import BaseManager from "../../NetworkManager/BaseManager";

export default {
  namespace: 'expertShareDetail',
  //这个state是伪数据，也可以在index中声明
  state: {
      data: {
        id: 1,
        image: "/proimgs/AG/20160408191118644.jpg",
        avatar: "/proimgs/AG/20160408191118644.jpg",
        author: "AustGo",
        content: "content here",
      },
      expertShareDetail: {

      }
    },

  reducers: {
    mapExpertShareDetail(state, { payload }) {
      return { ...state,  expertShareDetail: payload};
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchExpertShareDetail({ select, call, put }, { payload }) {
      let expertShareDetail = yield select(state => state.data);
      //console.log('ExpertShareDetail', expertShareDetail);
      // const manager = new BaseManager();
      // const res = yield manager.fetchApi({
      //   //fetch新的数据
      //   url: manager.Url + "ExpertShareDetail/list",
      //   body: {
      //     type: payload.type,
      //     keyword: "",
      //     currentpage: payload.page,
      //     pagesize: 15
      //   }
      // });

      // 拿到伪数据
      const res = expertShareDetail

      //console.log('请求拿到的数据', res);
      try {
        let items = res; //数据格式转化
        yield put({
          type: "mapExpertShareDetail",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    }
  }
};
