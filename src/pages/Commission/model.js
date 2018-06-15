/**
 * 类Dva数据模型
 * 在rootSaga中配置model
 */
import BaseManager from "../../NetworkManager/BaseManager";

export default {
  namespace: "commission",
  state: {},
  reducers: {
    mapCommissionList(state, { payload }) {
      return { ...state, commission: payload };
    },
    mapCommission(state, { payload }) {
      return { ...state, commissionAmounts: payload };
    }
  },
  effects: {
    /**
     * 发请求，接收佣金列表
     */
    *fetchCommissionList({ select, call, put }, { payload }) {
      let commission = yield select(state => state.commission.commission); //select拿到当前list数据
      // 解决第一次拿来commission是undefined问题
      if (commission === void 666) {
        commission = {};
      }
      console.log("model文件commission state", commission);

      console.log("开始fetchCommissionList");
      const baseManager = new BaseManager();
      const res = yield baseManager.fetchApi({
        url: baseManager.Url + "user/CommissionsList",
        body: {
          type: 0, //佣金页面不涉及type默认0就行
          keyword: "", //也不涉及keyword
          currentpage: payload.pageIndex,
          pagesize: 15
        }
      });

      //console.log('res', res);

      try {
        let items = res.data.items;
        console.log("合并前items", items);
        if (items.length !== 0) {
          items = [...items, ...commission];
          console.log("合并后items", items);
          yield put({
            type: "mapCommissionList",
            payload: items
          });
        }
      } catch (e) {
        Alert.alert("出错了", "服务请求出错");
      }
    },
    /**
     * 发请求，接收佣金数量,
     * 同样的代码在profile里面也写过，但是之前是用async和await写得
     */
    *fetchCommission({ select, call, put }, { payload }) {
      console.log("开始fetchCommission");
      const baseManager = new BaseManager();
      const res = yield baseManager.fetchApi({
        url: baseManager.Url + "user/GetCommissionSummary",
        body: {}
      });

      console.log('fetchCommission中的res',res);

      try {
        //转换数据结构
        items = res.data.commissionAmounts
        yield put({
          type: "mapCommission",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", "服务请求出错");
        console.log('请求出错');
      }
    }
  }
};
