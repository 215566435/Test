import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

/**
 * color 数组第一个的颜色是第一个字的
 *
 */
const Block = ({ itemTop, itemBottom, color = ['black', 'black'] }) => (
  <View>
    <Text style={{ marginLeft: 10, color: color[0] }}>${itemTop}</Text>
    <Text style={{ marginTop: 20, marginLeft: 10, color: color[1] }}>{itemBottom}</Text>
  </View>
)

const Orderstate = {
  Cancelled:'已取消',
  NotConfirmed:'待确认',
  Nopaid:'待支付',
  Paid:'已支付',
  Finished:'已完成',
}

const PackStatus = {
  Cancelled : '已取消',
  Default : '未生效',
  WaitingForReview : '待审核',
  WaitingForProcess : '待处理',
  WaitingStock : '备货中',
  Pending  : '配货中',
  ReadyToShip : '待发走',
  ReadyToPickup : '待提货',
  Shipped : '已发货',
  Picked : '已提走'
}

const HeadList = ({ orderId, dateTime, childOrder, orderShipment, orderShipmentCn, payment }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 40, padding: 5 }}>
    <View>
      <Text>{orderId}</Text>
      <Text style={{ fontSize: 9 }}>{dateTime}</Text>
    </View>
    <View>
      <Text style={{ marginLeft: -15 }}>{childOrder}</Text>
    </View>
    <View>
      <Text>{orderShipment}</Text>
      <Text style={{ fontSize: 9 }}>{orderShipmentCn}</Text>
    </View>
    <View>
      <Text>{payment}</Text>
    </View>
  </View>
)

/**
 * item 是数据源
 * onPress是点击回调
 */
export default ({ item, onPress }) => (
  <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }} onPress={onPress}>
    <HeadList
      orderId={item.i}
      dateTime={item.t}
      childOrder={item.si}
      orderShipment={item.u}
      orderShipmentCn={item.io}
      payment={Orderstate[item.o]}
    />
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} style={{ width: 60, height: 60 }} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '75%' }}>
        <Block itemTop={item.po} itemBottom={PackStatus[item.ps]} color={['#fa541c', '#fa541c']} />
        <Block itemTop={item.pq > 0 ? '有货':'缺货'} itemBottom={item.pq} />
      </View>
    </View>
  </TouchableOpacity>
)


