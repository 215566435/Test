import BaseManager from './BaseManager'

class OrderManager extends BaseManager {
    *fetchProductDetail(messageId, orderId, memberId) {
        return yield this.fetchApi({
            url: this.Url + 'order/get',
            body: {
                messageId,
                orderId,
                memberId
            }
        })
    }
}

export default OrderManager
