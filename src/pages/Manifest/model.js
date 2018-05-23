import BaseManager from '../../NetworkManager/BaseManager'
import { Alert } from 'react-native'

//admin.js
export default {
  namespace: 'manifest',
  state: {
    orderList: []
  },
  reducers: {
    mapOrderList(state, { payload }) {
      return { ...state, orderList: payload }
    }
  },
  effects: {
    *fetchOrderList({ select, call, put }, { payload }) {
      const manager = new BaseManager()
      const res = yield manager.fetchApi({
        url: manager.Url + 'order/list',
        body: {
          type: 0,
          keyword: '',
          currentpage: 1,
          pagesize: 15
        }
      })

      try {
        const items = res.data.items
        // console.log(res)
        yield put({
          type: 'mapOrderList',
          payload: items
        })
      } catch (e) {
        Alert.alert('出错了', '服务请求出错')
      }
    }
  }
}
