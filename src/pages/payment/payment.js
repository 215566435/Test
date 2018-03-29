import { showLoading, hideLoading } from '../Loading'
import { PaymentManager } from '../../NetworkManager/PaymentManager'

const paymentManager = new PaymentManager()
export default {
    namespace: 'payment',
    state: {
        methods: [],
        paymentState: 'notPay'
    },
    effects: {
        *pay({ put, select }, { payload }) {
            yield showLoading('支付准备中，支付完毕后请手动返回澳购助手..')

            const productDetail = yield select(state => state.productDetail)
            const json = yield paymentManager.requestPayment(payload)
            yield put({
                type: 'mapUrl',
                payload: {
                    payUrl: json.data.payUrl,
                    paymentId: json.data.paymentId,
                    payData: json.data.payData
                }
            })
            console.log(json)
        },
        *getPaymentMethods({ put, select }) {
            const productDetail = yield select(state => state.productDetail)

            //判断是否可以预存款
            const isPrepay =
                productDetail.data.balance > productDetail.data.po
                    ? true
                    : false

            yield put({
                type: 'mapMethods&Prepay',
                payload: {
                    methods: productDetail.data.paymentMethod,
                    isPrepay
                }
            })
        },
        *goToPayment({ put, select }, { payload }) {
            const { paymentId, payData } = yield select(state => state.payment)
            const { isGoing, instance } = payload

            if (!isGoing) {
                //回来的时候检查
                yield showLoading('支付检查中..')
                const json = yield paymentManager.checkPayment()

                if (json.data === null) {
                    yield put({
                        type: 'paymentState',
                        payload: 'fail'
                    })
                } else {
                    instance.props.navigation.goBack()
                    yield put({
                        type: 'paymentState',
                        payload: 'done'
                    })
                }

                yield hideLoading()
            }
        },
        *payByDeposite({ put, select }, { payload }) {
            
            yield showLoading('支付中..')

            const json = yield paymentManager.requestPayByDeposite()
            console.log(json)

            if (json.success) {
                payload.props.navigation.goBack()
                yield put({
                    type: 'paymentState',
                    payload: 'done'
                })
            } else {
                Alert.alert('支付失败', json.message, [{ text: '确定' }], {
                    cancelable: false
                })
            }
        }
    },
    reducers: {
        'mapMethods&Prepay': (state, { payload }) => {
            const { methods, isPrepay } = payload
            return { ...state, methods, isPrepay }
        },
        mapUrl: (state, { payload }) => {
            const { payUrl, paymentId, payData } = payload
            return { ...state, url: payUrl, paymentId, payData }
        },
        paymentState: (state, { payload }) => {
            return { ...state, paymentState: payload }
        },
        clearPayment: (state, { payload }) => {
            return {
                ...state,
                url: void 666,
                paymentId: void 666,
                payData: void 666,
                paymentState: 'notPay'
            }
        }
    }
}
