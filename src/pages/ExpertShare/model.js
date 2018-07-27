/**
 * 达人分享列表页面的model
 */
import { Alert } from "react-native";

export default {
  namespace: 'expertShare',
  //这个state是伪数据，也可以在index中声明
  state: {
      data: {
        items: [
          {id: 1, title: "title", subTitle: "subTitle", image: "/images/upload/390978-f0588c5c6c6d0997e4cd4dedd889b218-800x500.jpg"}, 
          {id: 2, title: "title", subTitle: "subTitle", image: "/images/upload/390978-f0588c5c6c6d0997e4cd4dedd889b218-800x500.jpg"}, 
          {id: 3, title: "title", subTitle: "subTitle", image: "/images/upload/390978-f0588c5c6c6d0997e4cd4dedd889b218-800x500.jpg"}, 
          {id: 4, title: "title", subTitle: "subTitle", image: "/img3/upload/1/20180104134707920.jpg"}, 
          {id: 5, title: "title", subTitle: "subTitle", image: "/img3/upload/1/20180104134707920.jpg"}, 
        ],
      }
    },

  reducers: {
    mapExpertShare(state, { payload }) {
      return { ...state,  expertShare: payload};
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchExpertShare({ select, call, put }, { payload }) {
      let expertShare = yield select(state => state.expertShare);
      console.log('ExpertShare', expertShare);
      // const manager = new BaseManager();
      // const res = yield manager.fetchApi({
      //   //fetch新的数据
      //   url: manager.Url + "ExpertShare/list",
      //   body: {
      //     type: payload.type,
      //     keyword: "",
      //     currentpage: payload.page,
      //     pagesize: 15
      //   }
      // });

      // 拿到伪数据
      const res = expertShare

      console.log('请求拿到的数据', res);
      try {
        let items = res.data.items; //数据格式转化
        yield put({
          type: "mapExpertShare",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    }
  }
};
