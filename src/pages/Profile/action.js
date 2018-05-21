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
