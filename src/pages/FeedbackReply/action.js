import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi, fetchList, getCurrent, mergeList } from 'utils';
import { Alert } from 'react-native';



export const actionStategy = {
    fetchReply: function* (state, others) {
        const id = others.id;
        const json = yield fetchApi({
            url: Url + 'user/GetSupportTicketReply',
            body: {
                currentPage: 1,
                pagesize: 15,
                SupportTicketId: id
            }
        })
        yield put({
            type: "SET_STATE_FeedbackReply",
            data: {
                FeedbackReply: json.data.supportTicketReply.items,
                currentPage: json.data.supportTicketReply.currentPage,
                totalPages: json.data.supportTicketReply.totalPages
            }
        })
    },
    appendFeedbackReply: function* (state) {
        try {
            const { currentPage, totalPages } = getCurrent(state.FeedbackReply);
            const json = yield fetchApi({
                url: Url + 'user/GetSupportTicketReply',
                body: {
                    currentPage: currentPage + 1,
                    pagesize: 15,
                    SupportTicketId: id
                }
            })
            yield put({
                type: "SET_STATE_FeedbackReply",
                data: {
                    FeedbackReply: json.data.supportTicketReply.items,
                    totalPages: json.data.supportTicketReply.totalPages
                }
            })
        } catch (e) {
            if (e.message !== 'MAX') {
                throw Error(e)
            }
        }


    }
}