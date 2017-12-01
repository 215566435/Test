import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, setLogin } from '../../util';
import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';

function* fetchFunc({ url, body }) {
    yield setLogin()
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}


const actionStategy = {
    fetchHome: function* (state) {
        const json = yield fetchFunc({ url: Url + 'home/index', body: '' });
        yield put({
            type: 'Home_SET_STATE',
            data: { ...state, Carousel: json.data.s, goodNews: json.data.g, event: json.data.e, hotKey: json.data.h }
        })

        const Aud = yield AsyncStorage.getItem('isAud')
        let fix = false;
        if (Aud === 'true') {
            fix = true;
        } else {
            fix = false;
        }
        const PriceList = yield select(p => p.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceList, isAud: fix }
        })

    },
    checkDetail: function* (state, others) {
        const PriceListState = yield select(allState => allState.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceListState, currentID: others.id }
        })
        others.instance.props.navigation.navigate('EventDetailPage')
    },
    EventImagePress: function* (state, others) {
        others.instance.props.navigation.navigate('Activity', { id: others.id, page: 'EventDetailPage' })
    },
    homeSearch: function* (state, others) {
        others.instance.props.navigation.navigate('Search')
    },
    AUDonValueChange: function* () {
        const state = yield select(state => state.PriceList)
        const fix = !state.isAud ? 'true' : 'false'
        AsyncStorage.setItem('isAud', fix)
        yield put({
            type: 'SET_STATE_Currency',
            data: { ...state, isAud: state.isAud !== void 666 ? !state.isAud : true }
        })
    },
    refreshAll: function* () {
        yield put({
            type: 'fetchHome'
        })
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
            const state = yield select(state => state.Home)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}