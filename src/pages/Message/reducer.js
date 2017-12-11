export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATE_Message':
            const newState_Currency = { ...state, ...action.data }
            return newState_Currency
            break;
        default:
            return state
    }
}