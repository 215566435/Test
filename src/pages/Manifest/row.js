import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

/**
 * color 数组第一个的颜色是第一个字的
 *
 */
const Block = ({ itemTop, itemBottom, color = ['black', 'black'] }) => (
  <View>
    <Text style={{ marginLeft: 10, color: color[0] }}>{itemTop}</Text>
    <Text style={{ marginTop: 20, marginLeft: 10, color: color[1] }}>{itemBottom}</Text>
  </View>
)

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
      orderId={12378123}
      dateTime={'2018-5-7 12:18'}
      childOrder={'子订单 1\\3'}
      orderShipment={'dsdasda'}
      orderShipmentCn={'仓库代发'}
      payment={'待支付'}
    />
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} style={{ width: 60, height: 60 }} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '75%' }}>
        <Block itemTop={'$86'} itemBottom={'未生效'} color={['#fa541c', '#fa541c']} />
        <Block itemTop={'有货'} itemBottom={'数量1'} />
      </View>
    </View>
  </TouchableOpacity>
)
