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

export var hostName = 'test.austgo.com'

if (__DEV__) {
    hostName = 'test.austgo.com'
} else {
    hostName = 'www.austgo.com'
}

export const Url = `http://${hostName}/api/app/1.2/`;


/**
 * 这个函数用于请求，是一个协程函数
 * 
 */
export function* fetchCombind({ url, body }) {
    const res = yield fetch(Url + url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}

if (!__DEV__) {
    // eslint-disable-line no-undef
    [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn',
    ].forEach(methodName => {
        console[methodName] = () => {
            /* noop */
        };
    });
}


class Header {
    _token = '';

    set(token) {
        this._token = token;
    }

    get() {
        if (Platform.OS === 'ios') {
            return {
                'Content-Type': 'application/json',
                'Authorization': 'token ' + this._token
            }
        }
        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
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