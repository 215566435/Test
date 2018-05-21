import OrderManager from '../../NetworkManager/OrderManager'
import { showLoading, hideLoading } from '../Loading'

const oManager = new OrderManager()
export default {
  namespace: 'productDetail',
  state: {
    data: null
  },
  effects: {
    *fetchProductDetail({ put }, { payload }) {
      yield put({
        type: 'mapProductDetail',
        payload: null
      })

      console.log('fetchProductDetail')

      yield showLoading('加载中..')
      const json = yield oManager.fetchProductDetail(payload.messageId, payload.id, payload.memberId)

      console.log('f1121121etchProductDetail')
      yield put({
        type: 'mapProductDetail',
        payload: json.data
      })
      yield hideLoading()
    }
  },
  reducers: {
    mapProductDetail: (state, { payload }) => {
      return { ...state, data: payload }
    }
  }
}
