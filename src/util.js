/**
 * 方正
 * 这个文件是一些工具类，并不是很重要，看不懂可以不理
 */

import { Platform, AsyncStorage, Dimensions } from 'react-native'
import React from 'react'
import { call, put, take, select } from 'redux-saga/effects'

export const { width, height } = Dimensions.get('window') //屏幕的高度和宽度

export const stateBarMargin = number => {
  if (Platform.OS === 'ios') {
    return number + 25
  } else if (Platform.OS === 'android') {
    return number
  }
}
export const EveryChildWidth = children => {
  const childCount = React.Children.count(children)
  return 100 / childCount + '%'
}

//切换开发服务器或者生产服务器
export var hostName = 'test.austgo.com'

if (__DEV__) {
  hostName = 'test.austgo.com'
} else {
  hostName = 'app.niuaomall.com'
}

export const Url = `http://${hostName}/api/app/1.4/`

/**
 * 这个函数用于请求，是一个协程函数
 *
 */
export function* fetchCombind({ url, body }) {
  const res = yield fetch(Url + url, {
    method: 'POST',
    headers: header.get(),
    body: JSON.stringify(body)
  })
  return yield res.json()
}

if (!__DEV__) {
  // eslint-disable-line no-undef
  ;[
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn'
  ].forEach(methodName => {
    console[methodName] = () => {
      /* noop */
    }
  })
}

//发出请求是需要填入请求报文
class Header {
  _token = ''

  set(token) {
    this._token = token
  }

  get() {
    if (Platform.OS === 'ios') {
      return {
        'Content-Type': 'application/json',
        Authorization: 'token ' + this._token
      }
    }
    return {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
      'Content-Type': 'application/json',
      Authorization: 'token ' + this._token
    }
  }
}
/**
 * 将乱七八糟的价格转换成需要的价格
 * @param {*} isAud
 * @param {*} Price
 */
export const priceHelper = (isAud, Price) => {
  const { a, ai, r, ri } = Price.p
  const price = isAud ? a : r
  const price2 = isAud ? ai : ri
  return {
    price: price ? (isAud ? '$' : '¥') + price : '¥' + r,
    price2: price2 ? (isAud ? '$' : '¥') + price2 : '¥' + ri
  }
}

/**
 * 这个函数的作用就是提取props里面的navigation传递过来的参数
 * @param {*} props
 */
export const getNavigationParam = props => {
  try {
    return props.navigation.state.params
  } catch (e) {
    throw new TypeError('props中没有navigation.state参数，请不要传递奇怪的参数')
  }
}
/**
 * 这个函数的作用是提取props中的goback函数.
 * @param {*} props
 */

export const goBack = props => {
  try {
    return props.navigation.goBack
  } catch (e) {
    throw new TypeError('props中没有navigation.state参数，请不要传递奇怪的参数')
  }
}
export const undefinedConvert = string => {
  if (string === void 666) {
    return ''
  }
  return string
}

//实例化请求报文头
export var header = new Header()

//封装请求发送方法
export function* fetchApi({ url, body }) {
  //redux saga或dva风格，使用call函数，实现请求api
  const res = yield call(fetch, url, {
    method: 'POST',
    headers: header.get(),
    body: JSON.stringify(body)
  })
  return yield res.json()
}

export function* setLogin() {
  res = yield AsyncStorage.multiGet(['token', 'name'])
  if (res[0][1] === null) {
  } else {
    header.set(res[0][1])
  }
}

/**
 * 将特定的时间格式化成特定的格式
 * @param {*} time
 */
export function timeSplit(time) {
  if (typeof time === 'string') {
    const splitTime = time.split('T')
    return {
      date: splitTime[0],
      time: splitTime[1].substr(0, 8)
    }
  } else {
    return {
      date: '无',
      time: ''
    }
  }
}

export function* fetchList(url, page) {
  const json = yield fetchApi({
    url: url,
    body: {
      currentpage: page,
      pagesize: 15
    }
  })
  return json
}

/**
 * 底部有一个tabbar的时候
 * 可能会需要到这个函数作为
 * 页面高度的辅助
 */
export const MarginTopIfNeeded = () => {
  return height - 44 - (Platform.OS === 'ios' ? 0 : 24)
}

export function mergeList(Old, New) {
  return [...Old, ...New]
}
/**
 * 给进去一个state，返回当前的currentPage,totalPages
 * @param {*} state
 */
export function getCurrent(state) {
  const totalPages = state.totalPages
  const currentPage = state.currentPage
  if (totalPages === void 666 || totalPages === null) {
    throw Error(`${state}:这个属性中没有totalPages`)
  }
  if (currentPage === void 666 || currentPage === null) {
    throw Error(`${state}:这个属性中没有currentPage`)
  }
  if (currentPage > totalPages) { //这里把>=改成了>要不然报错
    throw Error('MAX')
  }
  return {
    currentPage,
    totalPages
  }
}

export const Eng2Cn = string => {
  return string === 'RMB' ? '人民币' : '澳币'
}
