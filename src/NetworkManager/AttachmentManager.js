import BaseManager from './BaseManager'
import { select } from 'redux-saga/effects'

export class AttachManager extends BaseManager {
    constructor() {
        super()
    }
    *getAttach() {
        const { data } = yield select(state => state.productDetail)

        const json = yield this.fetchApi({
            url: this.Url + 'order/GetAttach?packId=' + data.i,
            body: {}
        })

        return json
    }

    *MarkAsSentToBuyer() {
        const { data } = yield select(state => state.productDetail)

        const json = yield this.fetchApi({
            url: this.Url + 'order/MarkAsSentToBuyer',
            body: {
                id: data.i
            }
        })
    }
}
