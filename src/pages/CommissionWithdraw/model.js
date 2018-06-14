/**
 * 类Dva数据模型
 * 在rootSaga中配置model
 */
import BaseManager from '../../NetworkManager/BaseManager'

export default {
  namespace: 'CommissionWithdraw',
  state: {},
  reducers: {
    mapCommissionWithdrawList(state, { payload }) {
      return { ...state, CommissionWithdraw: payload };
    }
  },
  effects: {
    *fetchCommissionWithdrawList({ select, call, put }, { payload }) {
        let CommissionWithdraw = yield select(state => state.CommissionWithdraw.CommissionWithdraw); //select拿到当前list数据
        // 解决第一次拿来CommissionWithdraw是undefined问题
        if (CommissionWithdraw === void 666) {
            CommissionWithdraw = {};
        }
        console.log('model文件CommissionWithdraw state', CommissionWithdraw);

        console.log('开始fetch');
        const baseManager = new BaseManager;
        const res = yield baseManager.fetchApi({
            url: baseManager.Url + 'user/CommissionWithdrawsList',
            body: {
              type: 0,//佣金页面不涉及type默认0就行
              keyword: '',//也不涉及keyword
              currentpage: payload.pageIndex,
              pagesize: 15
            }
        })

        //console.log('res', res);

        try {
            let items = res.data.items
            console.log('合并前items', items)
            if (items.length !== 0) {          
              items = [...items, ...CommissionWithdraw]
              console.log('合并后items', items)
              yield put({
                type: 'mapCommissionWithdrawList',
                payload: items
              })
            }
          } catch (e) {
            Alert.alert('出错了', '服务请求出错')
          }
    }
  }
};
