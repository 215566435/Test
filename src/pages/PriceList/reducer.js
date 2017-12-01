import { AsyncStorage } from 'react-native'

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATE_Currency':
            const fix = action.data.isAud ? 'true' : 'false'
            AsyncStorage.setItem('isAud', fix)
            const newState_Currency = { ...state, ...action.data }
            return newState_Currency
            break;
        case 'SET_STATE':
            const newState = { ...state, ...action.data }
            return newState
            break;
        default:
            return state
    }
}