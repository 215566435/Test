import { call, put, take, select } from 'redux-saga/effects';
import { Alert, AsyncStorage } from 'react-native'
import { Url, header } from '../../util';


function* modifyItems({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}

const actionStategy = {
    fetchCart: function* (state) {
        const PriceState = yield select(state => state.PriceList);
        const currency = PriceState.isAud ? 'AUD' : "RMB"

        const json = yield modifyItems({
            url: Url + 'cart/ListSummary',
            body: { currency: currency }
        })


        yield put({
            type: 'Cart_SET_STATE',
            data: {
                ...state,
                items: json.data.items,
                total: json.data.o
            }
        })

    },
    CartChangeCurrency: function* (state, others) {
        const PriceState = yield select(states => states.PriceList);

        const audState = !PriceState.isAud;
        yield put({
            type: 'SET_STATE',
            data: { ...PriceState, isAud: audState }
        })

        yield actionStategy.fetchCart(state)
    },
    modify: function* (state, others) {
        const value = others.item.value;
        const id = others.item.id;

        const json = yield modifyItems({
            url: Url + 'cart/ModifyItem',
            body: {
                id: id,
                qty: value,
                selected: true
            }
        })
        yield put({
            type: 'Cart_SET_STATE',
            data: {
                ...state,
                items: json.data.items,
                total: json.data.o
            }
        })
        console.log('modify')
    },
    delete: function* (state, others) {
        const value = others.item.value;
        const id = others.item.id;
        const json = yield modifyItems({
            url: Url + 'cart/removeitem',
            body: {
                id: id,
                qty: value,
                selected: true
            }
        })
        yield put({
            type: 'Cart_SET_STATE',
            data: {
                ...state,
                items: json.data.items,
                total: json.data.o
            }
        })
    },
    checkOut: function* (state, others) {
        const res = yield AsyncStorage.multiGet(['Receiver', 'Sender'])
        const returnWithAddress = res[0][1] ? false : true;
        console.log(returnWithAddress)
        const json = yield modifyItems({
            url: Url + 'cart/ListSummary',
            body: {
                returnWithAddress: returnWithAddress
            }
        })


        if (!json.success) {
            Alert.alert(
                '操作失败',
                json.message,
                [
                    { text: 'Cancel' },
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
            return;
        }

        console.log(json.data)
        if (json.data.isValid) {
            others.instance.props.navigation.navigate('Settle', {
                deliveryInfo: json.data.couriers,
                total: json.data.t,
                Cartinstance: others.instance,
                currency: json.data.cr,
                origin: json.data.o,
                Couriers: json.data.u,
                Receiver: returnWithAddress ? json.data.receiver : JSON.parse(res[0][1]),
                Sender: returnWithAddress ? json.data.sender : JSON.parse(res[1][1]),
                insuranceRate: json.data.s,
                otherFee: json.data.e,
                buyInsurance: json.data.l,
                insuranceFee: json.data.r,
                deliveryFee: json.data.dd
            });
        } else {
            Alert.alert(
                '操作失败',
                json.data.message,
                [
                    { text: 'Cancel' },
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }
}

function convert() {
    return Object.keys(actionStategy)
}

export const watch = function* () {
    const actionList = convert();
    while (true) {
        const { type, ...others } = yield take(actionList);
        try {
            const state = yield select(state => state.Cart);
            const actionFn = actionStategy[type];
            yield call(actionFn, state, others);
        } catch (e) {
            console.log(e)
        }
    }

}