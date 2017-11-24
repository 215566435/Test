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
    PasswordSubmit: function* (state, others) {

        const json = yield fetchSelect({
            url: Url + 'user/UpdatePassword',
            body: {
                Password: state.info.oldpsw,
                NewPassword: state.info.newpsw,
                NewPassword2: state.info.newpsw2,
                Verify: state.info.code
            }
        })

        let newInfo = state.info;
        if (json.success === false) {
            newInfo = { ...state.info, code: '' }
            others.instance.ins.setState({
                time: Date.now() + Math.random() * 100
            })
        }

        yield put({
            type: 'Password_SET_STATE',
            data: { ...state, info: newInfo, success: json.success }
        })
        if (json.success) {
            others.instance.navigation.goBack();
            yield actionStategy.clearPassword(state)
        }

        Alert.alert(
            json.message,
            '',
            [
                { text: '返回' },
            ],
            { cancelable: false }
        )

    },
    PasswordChangeText: function* (state, others) {
        const info = state.info;
        const newInfo = { ...info, [others.name]: others.text }

        yield put({
            type: 'Password_SET_STATE',
            data: { ...state, info: newInfo }
        })
    },
    clearPassword: function* (state) {
        yield put({
            type: 'Password_SET_STATE',
            data: { ...state, info: {}, success: null }
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
            const state = yield select(state => state.Password)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}