import BaseManager from './BaseManager'

export class ChargeManager extends BaseManager {
  *PaymentMethod() {
    return yield this.fetchApi({
      url: this.Url + 'payment/GetRechargeMethods',
      body: {}
    })
  }
  *recharge(money, currency) {
    return yield this.fetchApi({
      url: this.Url + 'payment/rechargebysupay',
      body: {
        money: money,
        currency: currency,
        PaymentMethodId: 58
      }
    })
  }
}
