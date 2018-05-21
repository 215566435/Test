import BaseManager from './BaseManager'

class Cart extends BaseManager {
  *ListSummary() {
    return yield this.fetchApi({
      url: this.Url + 'cart/ListSummary',
      body: {
        returnWithAddress: true
      }
    })
  }
  *SetPackPickingMethod(packIndex, isPickup) {
    return yield this.fetchApi({
      url: this.Url + 'cart/SetPackPickingMethod',
      body: {
        packIndex,
        isPickup
      }
    })
  }

  *setVoucher(code) {
    return yield this.fetchApi({
      url: this.Url + 'cart/SetVoucher',
      body: {
        code: code
      }
    })
  }
  *SwitchCourier(courier) {
    return yield this.fetchApi({
      url: this.Url + 'cart/ChangePackCourier',
      body: {
        ...courier
      }
    })
  }
  *SetInsurance(isBuyInsurance) {
    return yield this.fetchApi({
      url: this.Url + 'cart/SetInsurance',
      body: {
        i: !isBuyInsurance
      }
    })
  }
  *SwitchDelivery(isPickup) {
    return yield this.fetchApi({
      url: this.Url + 'cart/SwitchDelivery',
      body: {
        i: isPickup
      }
    })
  }
  *PromotionFreeItem(key) {
    return yield this.fetchApi({
      url: this.Url + 'cart/getFreeProducts',
      body: {
        PromotionsFreeItemKey: key
      }
    })
  }
  *addFreeItem(skuid, key) {
    return yield this.fetchApi({
      url: this.Url + 'cart/addFreeItem',
      body: {
        ConditionKey: key,
        qty: 1,
        skuid: skuid
      }
    })
  }
}

export const CartManager = new Cart()
