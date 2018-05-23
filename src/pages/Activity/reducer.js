/**
 * 方正
 * 这是老代码，建议使用 dva 模式进行重构
 */
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'Activity_SET_STATE':
            const newState = { ...state, ...action.data }
            return newState
            break;
        default:
            return state
    }
}