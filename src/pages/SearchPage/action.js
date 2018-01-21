import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from 'utils';


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
        if (!action) {
            currentpage++
        }
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
    setHotKey: function* (state) {
        const homeState = yield select(state => state.Home)
        console.log(state)
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, hotKey: homeState.hotKey }
        })

    },
    searchPage: function* (state, others) {
        dispath('post', true)
        dispath("page", 1)
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, loading: true }
        })

        const json = yield fetchSelect({
            url: Url + 'goods/PriceList',
            body: {
                cateid: others.currentCateId || 0,
                keyword: others.text,
                currentPage: currentpage,
                pagesize: 16
            }
        })
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: json.data.items, currentKey: others.text, currentCateId: others.currentCateId || 0, loading: false }
        })
        dispath('post', false)
    },
    searchAppend: function* (state, others) {
        dispath('post', true)
        const json = yield fetchSelect({
            url: Url + 'goods/PriceList',
            body: {
                cateid: state.currentCateId || 0,
                keyword: state.currentKey,
                currentPage: currentpage,
                pagesize: 16
            }
        })


        const newItem = [...state.item, ...json.data.items]
        console.log(newItem)
        if (json.data.totalItems < newItem.length) return
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: newItem }
        })
        dispath('post', false)
    },
    clearSearch: function* (state) {
        console.log('推出')
        dispath('page', 1)
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: null, currentKey: null }
        })
    },
    GoodItem: function* (state, others) {
        console.log(others)
        const PriceListState = yield select(allState => allState.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceListState, currentID: others.id }
        })
        others.instance.props.navigation.navigate('EventDetailPage')
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

            const state = yield select(state => state.SearchPage)
            const actionFn = actionStategy[type]
            if (!actionFn) continue

            yield call(actionFn, state, others)

        } catch (e) {
            console.log(e)
        }
    }
}