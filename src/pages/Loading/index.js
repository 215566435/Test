import { put } from 'redux-saga/effects'

export default {
    namespace: 'loading',
    state: {
        isLoading: false,
        message: ''
    },
    effects: {},
    reducers: {
        mapLoading: (state, { payload }) => {
            const { is, msg } = payload
            return { ...state, isLoading: is, message: msg }
        }
    }
}

export function* showLoading(message = '') {
    yield put({
        type: 'mapLoading',
        payload: {
            is: true,
            msg: message
        }
    })
}

export function* hideLoading(message = '') {
    yield put({
        type: 'mapLoading',
        payload: {
            is: false,
            msg: message
        }
    })
}
