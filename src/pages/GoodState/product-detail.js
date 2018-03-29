import OrderManager from '../../NetworkManager/OrderManager'
import { showLoading, hideLoading } from '../Loading'

const oManager = new OrderManager()
export default {
    namespace: 'productDetail',
    state: {},
    effects: {
        *fetchProductDetail({ put }, { payload }) {
            yield showLoading('加载中..')
            const json = yield oManager.fetchProductDetail(
                payload.messageId,
                payload.id,
                payload.memberId
            )

            console.log('获取到', payload)
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
