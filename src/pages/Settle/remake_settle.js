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
    //接收订单信息
    *fetchSubmit({ put }, { payload: keyword }) {
      // 清除本地内存数据
      // AsyncStorage.clear();
      // 测试用删除本地
      // AsyncStorage.removeItem('receiver');
      // AsyncStorage.removeItem('sender');
      const j = yield CartManager.SwitchDelivery(false)

      const json = yield CartManager.ListSummary()
      console.log('listSummary', json);

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

        //如果本地没有数据把接来的数据赋值给receiver
        // const receiver = JSON.parse(r) ? JSON.parse(r) : json.data.receiver.address
        // const sender = JSON.parse(s) ? JSON.parse(s) : json.data.sender

        // const receiver = JSON.parse(r) ? JSON.parse(r) : json.data.receiver.address
        // const sender = JSON.parse(s) ? JSON.parse(s) : json.data.sender.address
        
        const receiver = JSON.parse(r)
        const sender = JSON.parse(s)
        
        //使用直接存到本地内存的方法，有点慢
        const receiverJSON = json.data.receiver;
        const senderJSON = json.data.sender;

        yield AsyncStorage.setItem('receiver', JSON.stringify(receiverJSON))
        yield AsyncStorage.setItem('sender', JSON.stringify(senderJSON))
        
        console.log('后台的存在手机本地的receiver', AsyncStorage.getItem('receiver'));
        console.log('后台的receiverJSON', receiverJSON);
 
        // //Login之后第一次进入，现在4次put合并成两次了
        // yield put({
        //   type: 'receiverJSON',
        //   payload: receiverJSON
        // }) 
        // yield put({
        //   type: 'senderJSON',
        //   payload: senderJSON
        // })

        //本地和在线收集数据选择一个返回receiver或sender
        yield put({
          type: 'receiver',
          payload: receiver ? receiver : receiverJSON
        })
        
        yield put({
          type: 'sender',
          payload: sender ? sender : senderJSON
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

        console.log('下单前收集用户信息', settle)

        // console.log('收集到信息Name', settle.receiver.name);
        // console.log('收集到信息Phone', settle.receiver.phone);
        // console.log('收集到信息address', settle.receiver.address);
        // console.log('收集到信息billName', settle.receiver.billName);
        // console.log('收集到信息billPhone', settle.receiver.billName);
        // console.log('收集到信息billaddress', settle.receiver.billName);
        // console.log('收集到信息sendername', settle.sender.name);
        
        //发送请求
        const body = {
          e: checkValue(payload.their_commits),
          m: checkValue(payload.mycommits),
          t: state.t,
          s: {
            n: settle.sender.billName ? settle.sender.billName : settle.sender.name,
            p: settle.sender.billPhone ? settle.sender.billPhone : settle.sender.phone,
            a: settle.sender.billAddress ? settle.sender.billAddress : settle.sender.address
          },
          r: {
            n: settle.receiver.billName ? settle.receiver.billName : settle.receiver.name,
            p: settle.receiver.billPhone ? settle.receiver.billPhone : settle.receiver.phone,
            a: settle.receiver.billAddress ? settle.receiver.billAddress : settle.receiver.address,
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

        //这个能发到哪去？？？？貌似删了也没事
        // 看完代码明白了，这里是接收新的购物车信息
        instance.props.dispatch({ type: 'fetchCart' })

        //一秒后没有完成，自动跳转到GoodState页面
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
    },

    // #Hank 新加的fetchCart 测试能不能从remake_settle dispatch请求过来 但是好像没有过来
    // *fetchCart({ put }, { payload }) {
    //   console.log('到达fetchCart函数');
    // }
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
    },
    // receiverJSON: (state, { payload }) => {
    //   return { ...state, receiverJSON: payload }
    // },
    // senderJSON: (state, { payload }) => {
    //   return { ...state, senderJSON: payload }
    // }
  }
}
