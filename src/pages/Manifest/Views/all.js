/**
 * 2017/11/13 方正 创建
 * 我的订单
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native'
import { height, width } from '../../../util'

const stockState = {
  NotForSale: '已下架',
  OutStock: '无货',
  ByStock: '按库存',
  ByBook: '可预订',
  InStock: '有货'
}

const itemState = {
  Cancelled: '已取消',
  Ready: '已配货',
  OutStock: '缺货',
  WaitForBooking: '等待预订',
  WaitingForProcess: '待处理',
  Default: '未生效',
  Booked: '已预订'
}

const orderState = {
  Cancelled: '已取消',
  NotConfirmed: '待确认',
  NotPaid: '待支付',
  Paid: '已支付',
  Finished: '已完成'
}

const orderColor = {
  Cancelled: '#919191',
  NotConfirmed: '#e09a00',
  NotPaid: '#f46e65',
  Paid: '#108ee9',
  Finished: '#00a854'
}
const itemStateColor = {
  Cancelled: '#919191',
  Ready: '#49a9ee',
  OutStock: '#f5317f',
  WaitForBooking: '#f56a00',
  WaitingForProcess: '#948aec',
  Default: '#f46e65',
  Booked: '#00a854'
}

export class All extends Component {
  static navigationOptions = {
    title: '我的订单'
  }
  componentWillReceiveProps(next) {}

  _keyExtractor = (child, index) => index
  renderItem = (child, index) => (
    <OrderItem child={child} onPress={() => this.props.onPress(child.item)} />
  )
  render() {
    if (this.props.list && this.props.list.length === 0) {
      return (
        <View
          style={{
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 20,
              backgroundColor: 'transparent',
              color: '#919191'
            }}
          >
            暂无
          </Text>
        </View>
      )
    }
    return (
      <FlatList
        style={{
          height: height - 104 - (Platform.OS === 'ios' ? 0 : 24),
          backgroundColor: 'white'
        }}
        data={this.props.list}
        renderItem={this.renderItem}
        onEndReached={() => this.props.append()}
        initialNumToRender={6}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.1}
      />
    )
  }
}

const CancellColorMaker = (defaultColor, status) => {
  if (status === 'Cancelled') {
    return '#919191'
  }
  return defaultColor
}

class OrderItem extends Component {
  getGoods = status => {
    const goods = this.props.child.item.go.map((item, index) => {
      const url =
        'http://cdn2u.com' +
        item.im +
        `?width=${250}` +
        `&height=${250}` +
        `&constrain=${true}` +
        `&bgcolor=white`

      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 5,
            alignItems: 'center',
            padding: 5
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#bfbfbf',
              backgroundColor: 'transparent'
            }}
          >
            <Image
              source={{ uri: url }}
              style={{
                height: 90,
                width: 90,
                opacity: status === 'Cancelled' ? 0.5 : 1
              }}
            />
          </View>
          <View style={{ width: '70%', padding: 10 }}>
            <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 12,
                color: CancellColorMaker('black', status)
              }}
            >
              {item.sn}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
              }}
            >
              <Text
                style={{
                  color: CancellColorMaker('#f56a00', status),
                  fontSize: 18,
                  backgroundColor: 'transparent'
                }}
              >
                {item.c === 'RMB' ? '¥' : '$'}
                {item.i}
              </Text>
              <Text
                style={{
                  color: CancellColorMaker('#bfbfbf', status),
                  backgroundColor: 'transparent',
                  fontSize: 12
                }}
              >
                {stockState[item.ss]}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  color: CancellColorMaker(itemStateColor[item.s], status),
                  backgroundColor: 'transparent',
                  fontSize: 12
                }}
              >
                {itemState[item.s]}
              </Text>
              <Text
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  color: CancellColorMaker('black', status)
                }}
              >
                数量:{item.q}
              </Text>
            </View>
          </View>
        </View>
      )
    })
    return goods
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.child.item.i != this.props.child.item.i
  }

  render() {
    const { child, onPress } = this.props
    const item = child.item
    const time = item.t.split('T')

    const CancellColorMaker = defaultColor => {
      if (item.o === 'Cancelled') {
        return '#919191'
      }
      return defaultColor
    }
    return (
      <View style={{ borderBottomWidth: 5, borderBottomColor: '#e8e8e8' }}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: CancellColorMaker('#d9d9d9')
            }}
          >
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      color: CancellColorMaker('black')
                    }}
                  >
                    {item.i}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 12,
                      backgroundColor: 'transparent'
                    }}
                  >
                    {item.pc > 1 ? `子订单:${item.si + 1}/${item.pc}` : null}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: CancellColorMaker('#bfbfbf'),
                    backgroundColor: 'transparent'
                  }}
                >
                  {time[0]} {time[1].substring(0, 5)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    backgroundColor: 'transparent',
                    color: CancellColorMaker('black')
                  }}
                >
                  {item.r}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: CancellColorMaker('#5a5a5a'),
                    backgroundColor: 'transparent'
                  }}
                >
                  {item.u ? '现场打包' : '仓库代发'}
                </Text>
              </View>
              <Text
                style={{
                  color: orderColor[item.o],
                  backgroundColor: 'transparent'
                }}
              >
                {orderState[item.o]}
              </Text>
            </View>
          </View>
          <View>
            {child.item.pro.map((i, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10
                  }}
                >
                  <Text style={{ color: '#fa541c' }}>{i.promotionsName}</Text>
                  <Text style={{ color: '#fa541c' }}>
                    -{(item.c === 'RMB' ? '¥' : '$') + i.promotionsPrice}
                  </Text>
                </View>
              )
            })}
          </View>
          {this.getGoods(item.o)}
        </TouchableOpacity>
      </View>
    )
  }
}
