import BaseManager from './BaseManager'
import { select } from 'redux-saga/effects'

export class PaymentManager extends BaseManager {
    *getOrderData() {
        const { paymentId, payData } = yield select(state => state.payment)
        return {
            paymentId,
            payData
        }
    }
    *checkPayment() {
        const { paymentId, payData } = yield this.getOrderData()

        const json = yield this.fetchApi({
            url: this.Url + 'payment/check',
            body: {
                id: paymentId,
                data: payData
            }
        })
        return json
    }

    *requestPayByDeposite() {
        const productDetail = yield select(state => state.productDetail)


        const json = yield this.fetchApi({
            url: this.Url + 'Payment/PayOrderByDeposit',
            body: {
                i: productDetail.data.oi,
                pi: productDetail.data.i
            }
        })

        return json
    }

    *requestPayment(payload) {
        const productDetail = yield select(state => state.productDetail)
        const json = yield this.fetchApi({
            url: this.Url + 'payment/PayOrderBySupay',
            body: {
                orderId: productDetail.data.oi,
                PaymentMethodId: payload.methodId
            }
        })
        return json
    }
}
