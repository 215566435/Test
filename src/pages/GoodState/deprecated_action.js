// import { call, put, take, select } from 'redux-saga/effects'
// import { Url, header } from '../../util'
// import { Alert } from 'react-native'

// function* fetchSelect({ url, body }) {
//     const res = yield call(fetch, url, {
//         method: 'POST',
//         headers: header.get(),
//         body: JSON.stringify(body)
//     })
//     return yield res.json()
// }

// const actionStategy = {
//     fetchGoodState: function*(state, others) {
//         const id = others.id
//         const messageId = others.messageId
//         const memberId = others.memberId
//         const json = yield fetchSelect({
//             url: Url + 'order/get',
//             body: {
//                 messageId: messageId,
//                 orderId: id,
//                 memberId: memberId
//             }
//         })

//         const c = yield fetchSelect({
//             url: Url + 'payment/PayOrderBySupay',
//             body: {
//                 orderId: json.data.oi,
//                 PaymentMethodId: 58
//             }
//         })
//         console.log(c)
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, model: json.data }
//         })
//     },
//     GetLog: function*(state) {
//         const id = state.model.i
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, log: true }
//         })
//         const json = yield fetchSelect({
//             url: Url + 'order/getlog?packId=' + id,
//             body: {}
//         })
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, LogData: json.data, log: true }
//         })
//     },
//     GetAttach: function*(state) {
//         const id = state.model.i
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, attach: true }
//         })
//         const json = yield fetchSelect({
//             url: Url + 'order/GetAttach?packId=' + id,
//             body: {}
//         })

//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, image: json.data, attach: true }
//         })
//     },
//     ReturnAttach: function*(state) {
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, image: null, attach: false }
//         })
//     },
//     LogReturn: function*(state) {
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, log: false, LogData: null }
//         })
//     },
//     onGoodPress: function*(state, others) {
//         const PriceListState = yield select(allState => allState.PriceList)
//         yield put({
//             type: 'SET_STATE',
//             data: { ...PriceListState, currentID: others.id }
//         })
//         others.instance.props.navigation.navigate('ManifestDetail')
//     },
//     Pay: function*(state, others) {
//         console.log(others)
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, Payment: true }
//         })
//         const json = yield fetchSelect({
//             url: Url + 'Payment/PayOrderByDeposit',
//             body: {
//                 i: others.OrderId,
//                 pi: others.Id
//             }
//         })

//         if (json.success) {
//             yield put({
//                 type: 'GoodState_SET_STATE',
//                 data: { ...state, model: json.data, Payment: false }
//             })
//         } else {
//             Alert.alert('支付失败', json.message, [{ text: '确定' }], {
//                 cancelable: false
//             })
//             yield put({
//                 type: 'GoodState_SET_STATE',
//                 data: { ...state, Payment: false }
//             })
//         }

//         yield put({
//             type: 'fetchData'
//         })
//     },
//     clearGoodState: function*(state) {
//         yield put({
//             type: 'GoodState_SET_STATE',
//             data: { ...state, model: {} }
//         })
//     }
// }

// function convert() {
//     return Object.keys(actionStategy)
// }

// export const watch = function*() {
//     const actionList = convert()

//     while (true) {
//         const { type, ...others } = yield take(actionList)
//         try {
//             const state = yield select(state => state.GoodState)
//             const actionFn = actionStategy[type]
//             if (!actionFn) continue
//             yield call(actionFn, state, others)
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }
