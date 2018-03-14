import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from '../../util';
import { Alert, ToastAndroid } from 'react-native';
import { CartManager } from '../../NetworkManager/CartManager';
import UserManager from '../../NetworkManager/UserManager';

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

const userManager = new UserManager();

export const actionStategy = {
    handleVoucher: function* (state, { payload }) {
        const json = yield CartManager.setVoucher(payload);

        if (json.success) {
            yield put({
                type: "SET_STATE_Settle",
                data: { ...json.data }
            })
        } else {
            Alert.alert('出错', json.message);
        }
    },
    fetchSettleAddress: function* (state, { PersonType }) {
        const json = yield userManager.fetchListAddress(PersonType);
        yield putResult(json.data.items, json);
    },
    addressSettleSearch: function* (state, { keyword, PersonType }) {
        const json = yield userManager.SearchListAddress(keyword, PersonType);
        yield putResult(json.data.items, json, keyword);
    },
    appendSettleAddress: function* (state, { PersonType }) {
        const { keyword, address } = state.Settle;
        const json = yield userManager.appendListAddress(PersonType);
        const newItem = [...address, ...json.data.items];
        yield putResult(newItem, json, keyword);
    },
    mapAddress: function* (state, others) {
        //记录address
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
        const json = yield CartManager.ListSummary();
        const approach = json.data.p ? '现场打包' : '仓库代发';

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
        const json = yield CartManager.SwitchCourier(others.courier);
        yield put({
            type: "SET_STATE_Settle",
            data: {
                ...json.data
            }
        })
    },
    buyInsurance: function* (state) {
        const json = yield CartManager.SetInsurance(state.Settle.l);
        yield put({
            type: "SET_STATE_Settle",
            data: {
                ...json.data
            }
        })
    },
    approach: function* (state, others) {
        const isPickup = others.approach === '仓库代发' ? false : true;
        const json = yield CartManager.SwitchDelivery(isPickup);
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
        console.log(state.Settle)
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