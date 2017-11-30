import { call, put, take, select } from 'redux-saga/effects';
import { fetchApi, Url } from '../../util';
import { ToastAndroid } from 'react-native'


var posing = false;
var currentpage = 1;
var total = -1;

const actionStategy = {
    fetchActivity: function* (state, others) {
        const json = yield fetchApi({
            url: Url + 'event/Get?id=' + others.id,
            body: {}
        })
        if (ToastAndroid.showWithGravity) {
            ToastAndroid.showWithGravity('加载中...', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }

        posing = true;
        const json2 = yield fetchApi({
            url: Url + 'goods/search',
            body: {
                EventId: others.id,
                pagesize: 16,
                currentpage: 1
            }
        })
        yield put({
            type: "Activity_SET_STATE",
            data: {
                ...state,
                item: json2.data.items,
                title: json.data.c,
                bref: json.data.n,
                url: json.data.i,
                id: others.id
            }
        })
        posing = false;
        currentpage++;
        total = json.data.totalItems;
    },
    appendActivity: function* (state, others) {
        if (posing) return;
        if (state.item.length >= total) return;
        const json = yield fetchApi({
            url: Url + 'goods/search',
            body: {
                EventId: state.id,
                pagesize: 16,
                currentpage: currentpage
            }
        })
        if (ToastAndroid.showWithGravity) {
            ToastAndroid.showWithGravity('加载中...', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        currentpage++;
        total = json.data.totalItems
        yield put({
            type: "Activity_SET_STATE",
            data: {
                ...state,
                item: [...state.item, ...json.data.items],
            }
        })

        posing = false;
    },
    clearActivity: function* (state, others) {
        posing = false;
        currentpage = 1;
        total = -1;
        yield put({
            type: "Activity_SET_STATE",
            data: {
                ...state,
                item: [],
                title: null,
                bref: null,
                url: null
            }
        })
    },
    onItemPress: function* (state, others) {
        const PriceListState = yield select(allState => allState.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceListState, currentID: others.id }
        })
        others.navigation.navigate(others.page)
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
            const state = yield select(state => state.Activity);
            const actionFn = actionStategy[type];
            yield call(actionFn, state, others);
        } catch (e) {
            console.log(e)
        }
    }

}