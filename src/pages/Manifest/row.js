import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { CDN_URL } from '../../NetworkManager/CdnManager';

/**
 * color 数组第一个的颜色是第一个字的
 *
 */
const Block = ({ itemTop, itemBottom, color = ['black', 'black'] }) => (
  <View>
    <Text style={{ marginLeft: 10, color: color[0] }}>${itemTop}</Text>
    <Text style={{ marginTop: 5, marginLeft: 10, color: color[1] }}>{itemBottom}</Text>
  </View>
)

const PaymentStatus = {
  Cancelled: '已取消',
  NotConfirmed: '待确认',
  NotPaid: '待付款',
  Paid: '待发货',
  Finished: '已完成'
}

const PackStatus = {
  Cancelled: '已取消',
  Default: '未生效',
  WaitingForReview: '待审核',
  WaitingForProcess: '待处理',
  WaitingStock: '备货中',
  Pending: '配货中',
  ReadyToShip: '待发走',
  ReadyToPickup: '待提货',
  Shipped: '已发货',
  Picked: '已提走'
}

function getTime(timeString) {
  const timeArray = timeString.split("T");
  date = timeArray[0];
  time = timeArray[1].substr('0', '5');
  return date + ' ' + time;
}

const HeadList = ({ orderId, dateTime, childOrder, customerName, isPickup, payment }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 40, padding: 5,borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }}>
    <View>
      <Text>{orderId}</Text>
      <Text style={{ fontSize: 9 }}>{dateTime}</Text>
    </View>
    <View>
      <Text style={{ marginLeft: -15 }}>{childOrder}</Text>
    </View>
      <View>
        <Text >{customerName}</Text>
        <Text style={{ fontSize: 9 }}>{isPickup}</Text>
      </View>
    <View>
      <Text style={{color:'#fa541c'}}>{payment}</Text>
    </View>
  </View>
)

/**
 * item 是数据源
 * onPress是点击回调
 */
export default ({ item, onPress }) => {
  // console.log('go',item.go)
  // console.log('img',item.go[0].im) //商品图片
  // console.log('name',item.go[0].sn) //商品名
  console.log('paymentstatus', item.o);//通过枚举显示中文
  // console.log('paymentstatus', PaymentStatus[item.o]);
  return (
    <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#d9d9d9' }} onPress={onPress}>
      <HeadList
        orderId={item.i}
        dateTime={getTime(item.t)}
        // childOrder={item.si}
        customerName={item.r}
        // isPickup={item.u}
        payment={PaymentStatus[item.u]}
      />
      <View style={{ flexDirection: 'row', paddingTop:10}}>
        <View>
          <Image source={{ uri: CDN_URL + item.go[0].im }} style={{ width: 60, height: 60 }} />
        </View>
        <View style={{width:'130%'}}>
          <Text style={{ textAlign: 'left', paddingHorizontal: 10, width: '60%', fontSize: 11 }} >{item.go[0].sn}</Text>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '60%' }}>
            <Block itemTop={item.po} itemBottom={PackStatus[item.ps]} color={['#fa541c', '#fa541c']} />
            <Block itemTop={item.pq > 0 ? '有货' : '缺货'} itemBottom={item.pq} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
