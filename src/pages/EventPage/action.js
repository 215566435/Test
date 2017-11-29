import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from '../../util';

function* fetchFunc({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}

function* getEvent(state, page) {
    const json = yield fetchFunc({
        url: Url + 'event/List',
        body: {
            CurrentPage: page,
            PageSize: 3
        }
    });
    return json

}

var CurrentPage = 1;
var post = false;
const actionStategy = {
    fetchEvent: function* (state, others) {

        const json = yield getEvent(state, CurrentPage);
        CurrentPage++;
        yield put({
            type: "EvenPage_SET_STATE",
            data: { ...state, event: json.data.items }
        })

    },
    AppendEvent: function* (state, others) {
        const json = yield getEvent(state, CurrentPage);
        CurrentPage++;
        const newEvent = [...state.event, ...json.data.items]

        yield put({
            type: "EvenPage_SET_STATE",
            data: { ...state, event: newEvent }
        })
    },
    itemPress: function* (state, others) {
        const PriceListState = yield select(allState => allState.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceListState, currentID: others.id }
        })
        others.instance.props.navigation.navigate('EventDetailPage')
    },
    onActivityPress: function* (state, others) {
        others.instance.props.navigation.navigate('Activity', { id: others.id, page: "EventDetailPage" })
    },
    search: function* (state, others) {
        others.instance.props.navigation.navigate('Search')
    },
    EventOnValueChange: function* () {
        const state = yield select(state => state.PriceList)
        const fix = !state.isAud ? 'true' : 'false'
        AsyncStorage.setItem('isAud', fix)
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
            const state = yield select(state => state.EventPage)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            if (post) continue;
            post = true;
            yield call(actionFn, state, others)
            post = false;
        } catch (e) {
            console.log(e)
        }
    }
}