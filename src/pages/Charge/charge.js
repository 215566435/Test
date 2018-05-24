

import { showLoading, hideLoading } from '../Loading'
import { ChargeManager } from '../../NetworkManager/ChargeManager'
import { Alert } from 'react-native'

const chargeManger = new ChargeManager()
export default {
  namespace: 'charge',
  state: {
    paymentMethod: [],
    rechargeData: {}
  },
  effects: {
    *chargePaymentMethod({ put }, { payload }) {
      yield showLoading('准备中')
      const json = yield chargeManger.PaymentMethod()
      yield put({
        type: 'paymentMethod',
        payload: json.data.find(i => i.currency === payload).payMethods
      })
      yield hideLoading()
    },
    *recharge({ put }, { payload }) {
      yield showLoading('准备充值...')
      const { money, currency } = payload
      const json = yield chargeManger.recharge(money, currency)
      yield put({
        type: 'rechargeUrl',
        payload: json.data
      })
    },
    *RechargeBack({ put, select }, { payload }) {
      yield hideLoading()
      payload.props.navigation.goBack()
      yield put({
        type: 'clearRechargeMethod'
      })
      Alert.alert('充值完毕', '充值完毕', [{ text: '返回' }], { cancelable: false })

      const i = yield select(state => state.charge.ProfileInstance)
      i.fetchBalance()
    }
  },
  reducers: {
    paymentMethod(state, { payload }) {
      return { ...state, paymentMethod: payload }
    },
    rechargeUrl(state, { payload }) {
      return { ...state, rechargeData: payload }
    },
    clearRechargeMethod(state) {
      return { ...state, rechargeData: {} }
    },
    mapProfileInstance(state, { payload }) {
      console.log('mapProfileInstance')
      return { ...state, ProfileInstance: payload }
    }
  }
}
