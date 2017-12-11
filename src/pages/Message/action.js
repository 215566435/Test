import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi } from 'utils';
import { Alert } from 'react-native';

export const actionStategy = {
    fetchMessage: function* () {
        const json = yield fetchApi({
            url: Url + 'user/GetCurrentMessage',
            body: {
                currentpage: 1,
                pagesize: 15
            }
        })
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
        const currentPage = state.Message.currentPage;
        const messages = state.Message.messages;
        const totalPages = state.Message.totalPages;
        if (currentPage >= totalPages) return;
        const json = yield fetchApi({
            url: Url + 'user/GetCurrentMessage',
            body: {
                currentpage: currentPage + 1,
                pagesize: 15
            }
        })
        yield put({
            type: 'SET_STATE_Message',
            data: {
                messages: [...messages, ...json.data.message.items],
                currentPage: json.data.message.currentPage
            }
        })
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