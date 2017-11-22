import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, setLogin } from '../../util';


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
        yield put({
            type: 'SET_STATE',
            data: { ...state, isAud: state.isAud !== void 666 ? !state.isAud : true }
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