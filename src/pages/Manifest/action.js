import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from '../../util';
import { ToastAndroid } from 'react-native'


function* fetchSelect({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}


var currentpage = 1;
var posting = false;
var total = -1;
var lastSelect = -1;

function dispath(type, action) {
    if (type === 'page') {
        currentpage = action
    } else if (type === 'post') {
        posting = action
    } else if (type === 'total') {
        total = action
    } else if (type === 'select') {
        lastSelect = action
    }
}
function getState() {
    return {
        currentpage,
        posting,
        total,
        lastSelect
    }
}


const actionStategy = {
    fetchData: function* (state, others) {
        if (getState().posting === true) return
        yield put({
            type: 'Manifest_SET_STATE',
            data: { ...state, spin: true }
        })
        if (ToastAndroid.showWithGravity) {
            ToastAndroid.showWithGravity('加载中...', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }


        if (getState().lastSelect !== others.select) {
            dispath('select', others.select)
            dispath('post', false);
            dispath('page', 1);
            dispath('total', -1);
            dispath('select', -1)
        }
        const json = yield fetchSelect({
            url: Url + 'order/list',
            body: {
                type: others.select,
                keyword: '',
                currentpage: getState().currentpage,
                pagesize: 15
            }
        })
        if (json.success) {
            yield put({
                type: 'Manifest_SET_STATE',
                data: { ...state, list: json.data.items, spin: false }
            })
        } else {
            yield put({
                type: 'Manifest_SET_STATE',
                data: { ...state, list: [], spin: false }
            })
            return
        }

        dispath('total', json.data.totalPages)
        dispath('page', getState().currentpage + 1)

        dispath('post', false);
    },
    appendData: function* (state, others) {
        if (getState().posting === true) return
        if (getState().currentpage === getState().total) return
        const json = yield fetchSelect({
            url: Url + 'order/list',
            body: {
                type: others.select,
                keyword: '',
                currentpage: getState().currentpage,
                pagesize: 15
            }
        })
        if (ToastAndroid.showWithGravity) {
            ToastAndroid.showWithGravity('加载中...', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        dispath('page', getState().currentpage + 1)

        const list = [...state.list, ...json.data.items]
        dispath('total', json.data.totalPages)
        yield put({
            type: 'Manifest_SET_STATE',
            data: { ...state, list: list, spin: false }
        })
        dispath('post', false);

    },
    itemPress: function* (state, others) {
        const id = others.item.i;
        const json = yield fetchSelect({
            url: Url + 'order/get?orderId=' + id,
            body: {}
        })
        console.log(json)

    },
    clearManifest: function* (state, others) {
        dispath('post', false);
        dispath('page', 1);
        dispath('total', -1);
        dispath('select', -1)

    }
}


function convert() {
    return Object.keys(actionStategy)
}

export const watch = function* () {
    const actionList = convert()

    while (true) {
        const { type, ...others } = yield take(actionList);
        try {
            const state = yield select(state => state.Manifest)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}