import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from '../../util';


function* fetchSelect({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}

var post = false;
var currentpage = 2;

const actionStategy = {
    fetchDeposite: function* (state, others) {
        const json = yield fetchSelect({
            url: Url + 'user/ListDepositLog',
            body: {
                type: 0,
                currentpage: 1,
                pagesize: 15
            }
        })
        console.log('deposite', json);
        yield put({
            type: 'Deposite_SET_STATE',
            data: { ...state, Deposite: json.data.items }
        })
    },
    appendDeposite: function* (state, others) {
        if (post) return;
        const json = yield fetchSelect({
            url: Url + 'user/ListDepositLog',
            body: {
                type: 0,
                currentpage: currentpage,
                pagesize: 15
            }
        })
        post = false;

        currentpage++;

        if (json.data.totalItems <= state.Deposite.length) return
        const newDepoiste = [...state.Deposite, ...json.data.items]


        yield put({
            type: 'Deposite_SET_STATE',
            data: { ...state, Deposite: newDepoiste }
        })
    },
    clearDeposite: function* (state, others) {
        post = false;
        yield put({
            type: 'Deposite_SET_STATE',
            data: { ...state, Deposite: [] }
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
            const state = yield select(state => state.Deposite)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}