import OrderManager from '../../NetworkManager/OrderManager'

const oManager = new OrderManager()
export default {
    namespace: 'productHistory',
    state: {},
    effects: {
        *fetchHistory({ put, select }, { payload }) {
            const { data } = yield select(state => state.productDetail)

            const json = yield oManager.fetchApi({
                url: oManager.Url + 'order/getlog?packId=' + data.i,
                body: {}
            })

            console.log(json)
            yield put({
                type: 'mapHistory',
                payload: json.data
            })
        }
    },
    reducers: {
        mapHistory: (state, { payload }) => {
            return { ...state, data: payload }
        }
    }
}
