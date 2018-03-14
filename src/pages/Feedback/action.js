import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from '../../util';
import { Alert } from 'react-native';



export const actionStategy = {
    fetchFeedback: function* () {
        const json = yield fetchList(Url + 'user/GetSupportTicket', 1);
        yield put({
            type: 'SET_STATE_Feedback',
            data: {
                feedbacks: json.data.supportTicket.items,
                totalPages: json.data.supportTicket.totalPages,
                currentPage: json.data.supportTicket.currentPage
            }
        })
    },
    appendFeedback: function* (state) {
        try {
            const { totalPages, currentPage } = getCurrent(state.Feedback);
            const json = yield fetchList(Url + 'user/GetSupportTicket', currentPage + 1);
            const oldItems = state.Feedback.feedbacks;
            const newItems = mergeList(oldItems, json.data.supportTicket.items);
            yield put({
                type: 'SET_STATE_Feedback',
                data: {
                    feedbacks: newItems,
                    currentPage: json.data.supportTicket.currentPage
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}