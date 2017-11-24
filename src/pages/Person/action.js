import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from '../../util';
import { Alert } from 'react-native';

function* fetchSelect({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}


const actionStategy = {
    fetchPerson: function* (state) {
        const json = yield fetchSelect({
            url: Url + 'user/Current',
            body: {}
        });
        console.log(json)
        const added = {
            email: json.data.email,
            id: json.data.id,
            name: json.data.userName,
            phone: json.data.phone,
            wechat: json.data.wechat,
            country: json.data.country
        }

        yield put({
            type: 'Person_SET_STATE',
            data: { ...state, ...added }
        })
    },
    personChangeText: function* (state, others) {
        yield put({
            type: 'Person_SET_STATE',
            data: { ...state, [others.name]: others.text }
        })
    },
    personSubmit: function* (state, others) {

        const json = yield fetchSelect({
            url: Url + 'user/update',
            body: {
                realemail: state.email,
                name: state.name,
                phone: state.phone,
                country: state.country,
                wechat: state.wechat
            }
        });

        Alert.alert(
            json.message,
            '',
            [
                { text: '完成' },
            ],
            { cancelable: false }
        )
        others.instance.props.navigation.goBack();
        console.log(json)
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
            const state = yield select(state => state.Person)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}