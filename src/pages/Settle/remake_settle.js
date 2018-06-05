import { CartManager } from '../../NetworkManager/CartManager'
import { Alert, AsyncStorage } from 'react-native'

//验证值是否为undefined, 不是就返回值
const checkValue = value => {
  if (value === void 666) return ''
  return value
}

export default {
  namespace: 'settle',
  state: {
    data: [],
    receiver: {},
    sender: {}
  },
  effects: {
    //接收订单信息，目前不懂为什么能接收到登录客户的信息？？？
    *fetchSubmit({ put }, { payload: keyword }) {
      const j = yield CartManager.SwitchDelivery(false)

      const json = yield CartManager.ListSummary()
      // console.log('listSummary', json);

      const approach = json.data.p ? '现场打包' : '仓库代发'
      yield put({
        type: 'mapSettle',
        payload: {
          approach,
          ...json.data
        }
      })

      try {
        //从本地找数据
        const r = yield AsyncStorage.getItem('receiver')
        const s = yield AsyncStorage.getItem('sender')
        //原来的代码
        // const receiver = JSON.parse(r)
        // const sender = JSON.parse(s)

        // console.log('后台的receiver', json.data.receiver.address);

        //如果本地没有数据把接来的数据赋值给receiver
        // const receiver = JSON.parse(r) ? JSON.parse(r) : json.data.receiver.address
        // const sender = JSON.parse(s) ? JSON.parse(s) : json.data.sender

        const receiver = JSON.parse(r)
        const sender = JSON.parse(s)

        const receiverJSON = json.data.receiver.address ? json.data.receiver.address : '没有记录，点击编辑';
        const senderJSON = json.data.receiver.sender ? json.data.receiver.sender : '没有记录，点击编辑';

        yield AsyncStorage.setItem('receiver', JSON.stringify(receiverJSON))
        yield AsyncStorage.setItem('sender', JSON.stringify(senderJSON))
        

        // console.log('后台的recevier', receiver);
        
        yield put({
          type: 'receiver',
          payload: receiver
        })
        yield put({
          type: 'sender',
          payload: sender
        })
      } catch (e) {
        console.log(e)
      }
    },
    *SetPackPickingMethod({ put }, { payload }) {
      const j = yield CartManager.SetPackPickingMethod(payload.index, !payload.isPickup)
      yield put({
        type: 'mapSettle',
        payload: {
          ...j.data
        }
      })
    },
    *EditAdressInfo({ put }, { payload }) {
      yield AsyncStorage.setItem(payload.type, JSON.stringify(payload.address))
      yield put({
        type: payload.type,
        payload: {
          ...payload.address
        }
      })
    },
    *MoveAdressInfo({ put }, { payload }) {
      const j = yield CartManager.fetchApi({ url: CartManager.Url + 'cart/newaddress', body: { ...payload } })
      yield put({
        type: 'mapSettle',
        payload: {
          ...j.data
        }
      })
    },
    *changeCourier({ put, select }, { payload }) {
      const j = yield CartManager.SwitchCourier(payload)
      yield put({
        type: 'mapSettle',
        payload: {
          ...j.data
        }
      })
    },
    createOrder: function*({ put, select }, { payload }) {
      try {
        const { instance } = payload

        const state = yield select(state => state.settle.data)
        const settle = yield select(state => state.settle)

        console.log('---_>>>>>', settle)

        const body = {
          e: checkValue(payload.their_commits),
          m: checkValue(payload.mycommits),
          t: state.t,
          s: {
            n: settle.sender.billName,
            p: settle.sender.billPhone,
            a: settle.sender.billAddress
          },
          r: {
            n: settle.receiver.billName,
            p: settle.receiver.billPhone,
            a: settle.receiver.billAddress,
            i: settle.receiver.idNumber
          }
        }

        const json = yield CartManager.fetchApi({
          url: CartManager.Url + 'order/create',
          body: body
        })

        if (json.success !== true) {
          Alert.alert('下单失败', json.message)
          return
        }

        instance.props.dispatch({ type: 'fetchCart' })

        setTimeout(() => {
          instance.props.navigation.navigate('GoodState', { id: json.data.i })
        }, 1000)

        instance.props.navigation.goBack()
        Alert.alert('下单成功！')
      } catch (e) {
        Alert.alert('下单失败', '收件人或者发件人没有填写完毕，请确保收件人或者发件人填写完毕')
      }
    },
    handleVoucher: function*(state, { payload }) {
      const json = yield CartManager.setVoucher(payload)

      if (json.success) {
        yield put({
          type: 'mapSettle',
          payload: { ...json.data }
        })
      } else {
        Alert.alert('出错', json.message)
      }
    }
  },
  reducers: {
    mapSettle: (state, { payload }) => {
      return { ...state, data: payload }
    },
    receiver: (state, { payload }) => {
      return { ...state, receiver: payload }
    },
    sender: (state, { payload }) => {
      return { ...state, sender: payload }
    }
  }
}
