import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, setLogin } from '../../util';
import { AsyncStorage } from 'react-native';

var posing = false
var currentPage = 1
var currentKeyWord = ''

const fetchPost = (url, body) => {

    return fetch(url, {
        method: "POST",
        headers: header.get(),
        body: JSON.stringify(body)
    })
}

function* FetchList() {
    const body = yield call(fetchPost, Url + 'goods/PriceList', {
        cateid: 0,
        keyword: currentKeyWord,
        currentPage: currentPage,
        pagesize: 15
    })
    currentPage++;//请求成功，标记为下一页
    return yield body.json();

}

const actionStategy = {
    FetchList: function* (state) {
        yield setLogin()
        const json = yield FetchList();
        const FlatList = state.FlatList
        const newData = FlatList ? [...state.FlatList, ...json.data.items] : json.data.items;
        yield put({
            type: 'SET_STATE',
            data: { ...state, FlatList: newData }
        })

    },
    Search: function* (state, others) {
        const keyword = others.inputValue;
        currentKeyWord = keyword;
        currentPage = 1;
        const json = yield FetchList();
        const newData = json.data.items;
        yield put({
            type: 'SET_STATE',
            data: { ...state, FlatList: newData }
        })
    },
    clearList: function* (state) {
        yield put({
            type: 'SET_STATE',
            data: { ...state, FlatList: [] }
        })
    },
    setID: function* (state, others) {
        yield put({
            type: 'SET_STATE',
            data: { ...state, currentID: others.id }
        })
    },
    changeCurrency: function* (state, others) {

        const fix = !state.isAud ? 'true' : 'false'
        AsyncStorage.setItem('isAud', fix)

        yield put({
            type: 'SET_STATE_Currency',
            data: { ...state, isAud: state.isAud !== void 666 ? !state.isAud : true }
        })
    },
    DeliveryFree: function* (state) {
        yield put({
            type: 'SET_STATE',
            data: { ...state, isDeliveryFree: state.isDeliveryFree !== void 666 ? !state.isDeliveryFree : true }
        })
    },
    clearPricelist: function* (state) {
        posing = false
        currentPage = 1
        currentKeyWord = ''
        yield put({
            type: 'SET_STATE',
            data: { ...state, FlatList: [] }
        })
    }
}

function* isPost(bool) {
    const state = yield select(state => state.PriceList)
    posing = bool
    yield put({
        type: 'SET_STATE',
        data: { ...state, onPost: bool }
    })
}

function convert() {
    return Object.keys(actionStategy)
}

export const watch = function* () {
    const actionList = convert()

    while (true) {
        const { type, ...others } = yield take(actionList);
        try {
            const state = yield select(state => state.PriceList)
            const actionFn = actionStategy[type]
            if (posing) continue
            if (!actionFn) continue
            yield isPost(true)
            yield call(actionFn, state, others)
            yield isPost(false)
        } catch (e) {
            console.log(e)
        }
    }
}