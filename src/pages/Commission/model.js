/**
 * 类Dva数据模型
 * 在rootSaga中配置model
 */
import BaseManager from "../../NetworkManager/BaseManager";
// 把Alert引到数据层，不太好吧！！但是之前都这么做得，忍了
import { Alert } from "react-native";

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
     * 页面加载完成发请求，接收佣金列表
     * 用户滑动到底，接受新列表数据，和原来数据合并（下拉刷新效果）
     */
    *fetchCommissionList({ select, call, put }, { payload }) {
      //select拿到当前list数据
      let commission = yield select(state => state.commission.commission);
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
          currentpage: payload.pageIndex, // 前台的计数器，每次onEndReached就会传入新的currentpage
          pagesize: 15
        }
      });

      console.log("结束fetchCommissionList", res);

      try {
        // 新请求获取的数据
        const items = res.data.items;
        console.log("合并前items", items);
        if (items.length !== 0) {
          // 反了，结果新拿到的数据在旧的数据上面，注意
          // items = [...items, ...commission];
          // 和现有的数据合并
          const newItems = [...commission, ...items];
          console.log("合并后newItems", newItems);
          yield put({
            type: "mapCommissionList",
            payload: newItems
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
      //获取可提佣金数
      const commissionSummary = yield baseManager.fetchApi({
        url: baseManager.Url + "user/GetCommissionSummary",
        body: {}
      });
      console.log("fetchCommission中的commissionSummary", commissionSummary);
      const maxCommissionId = yield baseManager.fetchApi({
        url: baseManager.Url + "user/GetMaxCommissionId",
        body: {}
      });

      try {
        //转换数据结构
        // items = { ...maxCommissionId, ...commissionSummary.data.commissionAmounts};
        items = {
          ...commissionSummary.data.commissionAmounts,
          ...maxCommissionId
        };
        console.log("model文件中的items", items);
        yield put({
          type: "mapCommission",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", "服务请求出错");
        console.log("请求出错");
      }
    },
    /**
     * 发请求，接收目前最大的佣金ID，请求后台佣金提现时候需要提供这个ID
     */
    *createCommissionWithdraw({ select, call, put }, { payload }) {
      console.log("开始createCommissionWithdraw");
      const {
        maxCommissionId,
        Account,
        BankName,
        OrderCommissionWithdrawMethod,
        PayName,
        instance
      } = payload;
      
      //如果不想发下单请求，测试用comment这里开始
      console.log("maxCommissionId", maxCommissionId);
      console.log("Model中Account", Account);
      const baseManager = new BaseManager();
      // 请求数据
      // public int MaxCommissionId { get; set; }
      // public string Account { get; set; }
      // public string BankName { get; set; }
      // // 枚举类型传入字符串就行
      // public OrderCommissionWithdrawMethod Method { get; set; }
      // public string PayName { get; set; }

      // 佣金提现方式
      // PreDeposit = 0,
      // WeChat = 1,
      // Alipay = 2,
      // ChinaBank = 3,
      // OverseasBankAUD = 4,

      const res = yield baseManager.fetchApi({
        url: baseManager.Url + "user/createCommissionWithdraw",
        body: {
          MaxCommissionId: maxCommissionId,
          Account: Account,
          BankName: BankName,
          OrderCommissionWithdrawMethod: OrderCommissionWithdrawMethod,
          PayName: PayName
        }
      });
      console.log("createCommissionWithdraw中的res", res);

      if (!res.success) {
        Alert.alert("请求失败！", res.message);
        return;
      }

      //一秒后没有完成，自动跳转到佣金记录来源详情页面
      setTimeout(() => {
        instance.props.navigation.goBack();
      }, 1000);
      //comment 这里结束

      // 提现申请完成返回上一页，
      //instance.props.navigation.goBack();

      // 对提现申请用户体验优化，下单完成后跳转到佣金提现记录页面
      // 同时要传入一个数据，在佣金提现记录页面可以判断，如果是申请提款完成以后跳转进过去的，
      // 顶部返回按钮就直接跳转到profile页面，而不是跳回申请提现页面
      instance.props.navigation.navigate('CommissionWithdraw', { flag: "true" })
      Alert.alert("提现请求发起成功！请您耐心等待审核！");
    }
  }
};
