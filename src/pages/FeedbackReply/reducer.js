
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATE_FeedbackReply':
            const newState = { ...state, ...action.data }
            return newState
            break;
        default:
            return state
    }
}