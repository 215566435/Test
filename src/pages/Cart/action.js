import { call, put, take, select } from 'redux-saga/effects';
import { Alert } from 'react-native'
import { Url, header } from '../../util';


function* modifyItems({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    console.log(res)
    return yield res.json();
}

const actionStategy = {
    fetchCart: function* (state) {
        const json = yield modifyItems({
            url: Url + 'cart/ListSummary',
            body: {}
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
        const json = yield modifyItems({
            url: Url + 'cart/ListSummary',
            body: {}
        })

        if (json.data.isValid) {
            others.instance.props.navigation.navigate('Settle', {
                deliveryInfo: json.data.couriers,
                total: json.data.t,
                Cartinstance: others.instance
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
        console.log(json);
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