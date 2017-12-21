import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from 'utils';
import { Alert, ToastAndroid } from 'react-native';

function* putResult(address, json, keyword) {
    yield put({
        type: "SET_STATE_Settle",
        data: {
            address: address,
            currentPage: json.data.currentPage,
            totalPages: json.data.totalPages,
            keyword: keyword
        }
    })
}
const TypeConvertor = (type) => {
    if (type === 'Receiver') return 0
    return 1
}
const getPersonType = (others) => {
    if (others.Receiver) {
        return 'Receiver'
    }
    if (others.Sender) {
        return 'Sender'
    }
    throw new Error('无法找到Sender或者Receiver,请传递Receiver或Sender')
}
const checkValue = (value) => {
    if (value === void 666) return ''
    return value
}

/**
 * 因为默认消息不一致，所以必须转换成一致的名称
 * @param {*} model 
 */
const modelConvet = (model) => {
    console.log(model)
    if (model) {
        return {
            n: model.name,
            i: model.idNumber,
            id: model.id,
            a: model.address,
            p: model.phone,
            d: model.isDefault,
            t: model.type
        }
    }
    return model
}

export const actionStategy = {
    fetchSettleAddress: function* (state, others) {
        const json = yield fetchApi({
            url: Url + 'user/ListAddress2',
            body: {
                type: 0,
                keyword: '',
                currentPage: 1,
                pageSize: 15,
                addressType: TypeConvertor(others.PersonType)
            }
        })

        yield putResult(json.data.items, json);
    },
    addressSettleSearch: function* (state, others) {
        const json = yield fetchApi({
            url: Url + 'user/ListAddress2',
            body: {
                type: 0,
                keyword: others.keyword,
                currentPage: 1,
                pageSize: 15,
                addressType: TypeConvertor(others.PersonType)
            }
        })
        yield putResult(json.data.items, json, others.keyword);
    },
    appendSettleAddress: function* (state, others) {
        const { keyword, address } = state.Settle;
        console.log(state.Settle)
        const { currentPage, totalPages } = getCurrent(state.Settle);
        if (currentPage > totalPages) {
            return
        }
        const json = yield fetchApi({
            url: Url + 'user/ListAddress2',
            body: {
                type: 0,
                keyword: keyword,
                currentPage: currentPage + 1,
                pageSize: 15,
                addressType: TypeConvertor(others.PersonType)
            }
        })
        const newItem = [...address, ...json.data.items];
        yield putResult(newItem, json, keyword);
    },
    mapAddress: function* (state, others) {
        //记录address
        console.log(others)
        const type = getPersonType(others);
        yield put({
            type: "SET_STATE_Settle",
            data: {
                [type]: others[type]
            }
        })
    },
    fetchSumition: function* (state, others) {
        if (ToastAndroid.showWithGravity) ToastAndroid.showWithGravity('结算中...', ToastAndroid.SHORT, ToastAndroid.CENTER);
        const json = yield fetchApi({
            url: Url + 'cart/ListSummary',
            body: {
                returnWithAddress: true
            }
        })
        const approach = json.data.isValid ? '仓库代发' : '现场打包';
        console.log(json);

        yield put({
            type: "SET_STATE_Settle",
            data: {
                Receiver: modelConvet(json.data.receiver),
                Sender: modelConvet(json.data.sender),
                approach,
                ...json.data
            }
        })
    },
    SwitchCourier: function* (state, others) {
        const json = yield fetchApi({
            url: Url + 'cart/SwitchCourier',
            body: {
                ...others.courier
            }
        });
        yield put({
            type: "SET_STATE_Settle",
            data: {
                ...json.data
            }
        })
    },
    buyInsurance: function* (state) {
        const json = yield fetchApi({
            url: Url + 'cart/SetInsurance',
            body: {
                i: !state.Settle.l
            }
        });
        yield put({
            type: "SET_STATE_Settle",
            data: {
                ...json.data
            }
        })
    },
    approach: function* (state, others) {
        const isPickup = others.approach === '仓库代发' ? false : true;
        const json = yield fetchApi({
            url: Url + 'cart/SwitchDelivery',
            body: {
                i: isPickup
            }
        })
        yield put({
            type: "SET_STATE_Settle",
            data: {
                ...json.data,
                approach: others.approach
            }
        })
    },
    createOrder: function* (state, others) {
        const { instance } = others;
        const json = yield fetchApi({
            url: Url + 'order/create',
            body: {
                r: state.Settle.Receiver,
                s: state.Settle.Sender,
                e: checkValue(others.their_commits),
                m: checkValue(others.mycommits),
                t: state.Settle.t
            }
        })
        if (json.success !== true) {
            Alert.alert('下单失败', json.message)
            return
        }
        instance.props.navigation.goBack()
        instance.props.dispatch({ type: "fetchCart" })
        instance.props.navigation.navigate('GoodState', { id: json.data.i })
        Alert.alert('下单成功！')
    }
}