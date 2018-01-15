import BaseManager from "./BaseManager";



class Cart extends BaseManager {
    *ListSummary() {
        return yield this.fetchApi({
            url: this.Url + 'cart/ListSummary',
            body: {
                returnWithAddress: true
            }
        })

    }
    *SwitchCourier(courier) {
        return yield this.fetchApi({
            url: this.Url + 'cart/SwitchCourier',
            body: {
                ...courier
            }
        });
    }
    *SetInsurance(isBuyInsurance) {
        return yield this.fetchApi({
            url: this.Url + 'cart/SetInsurance',
            body: {
                i: !isBuyInsurance
            }
        });
    }
    *SwitchDelivery(isPickup) {
        return yield this.fetchApi({
            url: this.Url + 'cart/SwitchDelivery',
            body: {
                i: isPickup
            }
        })
    }
}

export const CartManager = new Cart();