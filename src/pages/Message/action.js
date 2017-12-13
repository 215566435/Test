import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from 'utils';
import { Alert } from 'react-native';

export const actionStategy = {
    fetchMessage: function* () {
        const json = yield fetchList(Url + 'user/GetCurrentMessage', 1);
        yield put({
            type: 'SET_STATE_Message',
            data: {
                messages: json.data.message.items,
                currentPage: json.data.message.currentPage,
                totalPages: json.data.message.totalPages
            }
        })
    },
    updateMessage: function* () {
        const info = yield fetchApi({ url: Url + 'user/GetCurrentUserinfo', body: '' });
        yield put({
            type: 'Home_SET_STATE',
            data: { noteCount: info.data.messageCount }
        })
    },
    appendMessage: function* (state) {
        try {
            const { currentPage, totalPages } = getCurrent(state.Message);
            const json = yield fetchList(Url + 'user/GetCurrentMessage', currentPage + 1);
            const messages = state.Message.messages;
            yield put({
                type: 'SET_STATE_Message',
                data: {
                    messages: mergeList(messages, json.data.message.items),
                    currentPage: json.data.message.currentPage
                }
            })
        } catch (e) {
            if (e.message !== 'MAX') {
                throw Error(e)
            }
        }

    },
    MarkAsRead: function* (state, others) {
        const messages = state.Message.messages;
        const newMessages = messages.map((message) => {
            if (messages.id === others.id) {
                return { ...message, isRead: true }
            }
            return message
        })
        yield put({
            type: 'SET_STATE_Message',
            data: {
                messages: newMessages
            }
        })
    }
}