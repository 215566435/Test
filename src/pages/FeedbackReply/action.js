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
        const filterNullItems = json.data.items.filter((item) => {
            if (item) {
                return item;
            }
        })

        yield put({
            type: "SET_STATE_FeedbackReply",
            data: {
                FeedbackReply: filterNullItems,
                currentPage: json.data.currentPage,
                totalPages: json.data.totalPages
            }
        })

    },
    mapFeedbackImage: function* (state, others) {
        yield put({
            type: "mapAttachment",
            payload: {
                url: others.url,
                index: others.index
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
                    FeedbackReply: json.data.items,
                    totalPages: json.data.totalPages
                }
            })
        } catch (e) {
            if (e.message !== 'MAX') {
                throw Error(e)
            }
        }


    }
}