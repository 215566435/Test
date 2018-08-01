/**
 * 会员臻选页面的model
 */
import BaseManager from "../../NetworkManager/BaseManager";
import { Alert } from "react-native";

export default {
  namespace: "memberCollection",
  //这个state是伪数据
  state: {
    // data: {
    //   items: [
    //     {id: 1, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
    //     {id: 2, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
    //     {id: 3, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
    //     {id: 4, n: "abc", i: "/proimgs/AG/20160408191118644.jpg", p: { a: 12.5, ai: 16.92, r: 63.69, ri: 86.29},  p2: { a: 12.5, ai: 17.92, r: 64.69, ri: 87.29},},
    //   ]
    // }
  },

  reducers: {
    mapMemberCollection(state, { payload }) {
      return { ...state, memberCollection: payload };
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchMemberCollection({ select, call, put }, { payload }) {
      // let memberCollection = yield select(state => state.memberCollection);
      // console.log('memberCollection', memberCollection);
      const manager = new BaseManager();
      const res = yield manager.fetchApi({
        //fetch新的数据
        url: manager.Url + "goods/recommendation",
        body: {
          keyword: "",
          currentpage: 1,
          pagesize: 15
        }
      });

      // 拿到伪数据
      // const res = memberCollection

      console.log("请求拿到的数据", res);
      try {
        let items = res.data; //数据格式转化
        yield put({
          type: "mapMemberCollection",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    },

  // 单个产品点击跳转到产品页面， 本来想自己写的， 但是直接调用就能跳，虽然也不明白原理。
  // TODO： 弄明白产品跳转的原理。
  //   *GoodItem({ select, call, put },{payload} ){
  //     const PriceListState = yield select(allState => allState.PriceList)
  //     console.log('点击时间的payload', payload);
  //     // yield put({
  //     //     type: 'SET_STATE',
  //     //     data: { ...PriceListState, currentID: others.id }
  //     // })
  //     // others.instance.props.navigation.navigate('EventDetailPage')
  // }

    //   checkDetail: function* (state, others) {
    //     const PriceListState = yield select(allState => allState.PriceList)
    //     yield put({
    //         type: 'SET_STATE',
    //         data: { ...PriceListState, currentID: others.id }
    //     })
    //     others.instance.props.navigation.navigate('EventDetailPage')
    // },

    // 首页的checkDetail实现产品跳转方法
    //会员臻选页面的goodsOnPressHandler，同理于首页的checkDetail。。吐槽这个命名方式
    // *goodsOnPressHandler({ select, call, put }, { payload }) {
    //   const PriceListState = yield select(allState => allState.PriceList);
    //   yield put({
    //     type: "SET_STATE",
    //     data: { ...PriceListState, currentID: others.id }
    //   });
    //   others.instance.props.navigation.navigate("EventDetailPage");
    // }
  }
};
