import { call, put, take, select } from 'redux-saga/effects';
import { GoodsManager } from '../../NetworkManager/GoodsManager';

const goodsManager = new GoodsManager();

const actionStategy = {
    setHotKey: function* (state) {
        const homeState = yield select(state => state.Home)
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, hotKey: homeState.hotKey }
        })

    },
    searchPage: function* (state, others) {
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, loading: true }
        })
        // 传入ID和text找到本页显示的Items
        const json = yield goodsManager.SearchGoodsList(others.text, others.currentCateId);
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: json.data.items, loading: false }
        })
    },
    searchAppend: function* (state, others) {
        const json = yield goodsManager.SearchGoodsAppend();
        const newItem = [...state.item, ...json.data.items]
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: newItem }
        })
    },
    clearSearch: function* (state) {
        yield put({
            type: "Search_SET_STATE",
            data: { ...state, item: null, currentKey: null }
        })
    },
    GoodItem: function* (state, others) {
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