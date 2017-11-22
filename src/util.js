import { Platform, AsyncStorage } from 'react-native';
import React from 'react';
import { call, put, take, select } from 'redux-saga/effects';

export const stateBarMargin = (number) => {
    if (Platform.OS === 'ios') {
        return number + 25
    } else if (Platform.OS === 'android') {
        return number
    }

}
export const EveryChildWidth = (children) => {
    const childCount = React.Children.count(children)
    return 100 / childCount + '%'
}

export const hostName = 'test.austgo.com'
export const Url = `http://${hostName}/api/app/1.2/`;



class Header {
    _token = '';

    set(token) {
        this._token = token;
    }

    get() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + this._token
        }
    }
}





export var header = new Header()

export function* fetchApi({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}

export function* setLogin() {
    res = yield AsyncStorage.multiGet(['token', 'name'])
    if (res[0][1] === null) {

    } else {
        header.set(res[0][1])

    }
}