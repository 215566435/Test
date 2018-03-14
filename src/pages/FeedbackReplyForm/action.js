import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi } from '../../util';
import { Alert } from 'react-native';

export const actionStategy = {
    submitFeedbackReply: function* (state, others) {
        const { content, priority, FeedbackReplyForm, id } = others;
        const prioritys = {
            '低': 0,
            '普通': 1,
            '高': 2
        }
        console.log(others)
        const json = yield fetchApi({
            url: Url + 'user/CreateSupportTicketReply',
            body: {
                supportTicketId: id,
                context: content,
                priority: prioritys[priority === void 666 ? 0 : priority],
                Attachment: ''
            }
        })
        console.log(json)
        FeedbackReplyForm.props.navigation.goBack();
        // FeedbackFormInstance.props.dispatch({ type: 'fetchFeedback' })
        FeedbackReplyForm.props.dispatch({ type: 'fetchReply', id: id })
    }
}