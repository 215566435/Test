import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, fetchApi } from '../../util';
import { Alert } from 'react-native';

export const actionStategy = {
    submitFeedback: function* (state, others) {
        const { title, content, priority, FeedbackFormInstance } = others;
        const prioritys = {
            '低': 0,
            '普通': 1,
            '高': 2
        }
        const json = yield fetchApi({
            url: Url + 'user/create',
            body: {
                SupportTicketType: 0,
                title: title,
                context: content,
                priority: prioritys[priority]
            }
        })
        FeedbackFormInstance.props.navigation.goBack();
        FeedbackFormInstance.props.dispatch({ type: 'fetchFeedback' })
    }
}