import { AsyncStorage } from 'react-native'

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATE':
            // if (state.isAud !== action.data.isAud) {
            //     const fix = action.data.isAud ? 'true' : 'false'
            //     AsyncStorage.setItem('isAud', fix)
            // }
            const newState = { ...state, ...action.data }
            return newState
            break;
        default:
            return state
    }
}