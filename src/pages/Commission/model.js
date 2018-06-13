/**
 * 类Dva数据模型
 * 在rootSaga中配置model
 */
import BaseManager from '../../NetworkManager/BaseManager'

export default {
  namespace: 'commission',
  state: {},
  reducers: {
    mapCommissionList(state, { payload }) {
      return { ...state, commission: payload };
    }
  },
  effects: {
    *fetchCommissionList({ select, call, put }, { payload }) {
        console.log('开始fetch');
        const baseManager = new BaseManager;
        const res = yield baseManager.fetchApi({
            url: baseManager.Url + 'user/CommissionsList',
            body: {
              type: 0,
              keyword: '',
              currentpage: 1,
              pagesize: 15
            }
        })

        console.log('res', res);

        try {
            const items = res.data.items
            // console.log(res)
            yield put({
              type: 'mapCommissionList',
              payload: items
            })
          } catch (e) {
            Alert.alert('出错了', '服务请求出错')
          }
    }
  }
};
