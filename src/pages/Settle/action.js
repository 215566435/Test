import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from 'utils';
import { Alert } from 'react-native';

export const actionStategy = {
    fetchMessage: function* () {
        const json = yield fetchList(Url + 'user/GetCurrentMessage', 1);
    }
}