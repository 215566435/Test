import { call, put, take, select } from 'redux-saga/effects';
import { Url, header } from 'utils';
import { Alert } from 'react-native';

function* fetchSelect({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}


export const actionStategy = {
    // fetchMessage: function* () {
    //     const json = yield fetchSelect({
    //         url: Url + 'user/GetCurrentMessage',
    //         body: {
    //             currentpage: 1,
    //             pagesize: 15
    //         }
    //     })
    //     console.log(json)
    //     yield put({
    //         type: 'SET_STATE_Profile',
    //         data: {
    //             messages: json.data.items
    //         }
    //     })
    // }
}