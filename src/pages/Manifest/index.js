/**
 * 2017/10/30 方正 创建
 * 我的订单
 */
import React, { Component } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { TabHead } from '../../components/Tab'
import { Spin } from '../../components/Spin'

import { All } from './Views/all'
import { PageHeader } from '../../components/PageHeader'
import { width } from '../../util'

import { Tabs, WhiteSpace, Badge, Button } from 'antd-mobile'
import Row from './row'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
  }
]
const NUM_ROWS = 20
let pageIndex = 0

const tabs = [{ title: '全部' }, { title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '已收货' }]

class ManifestPage extends Component {
  constructor(props) {
    super(props)

    const dataSource = data

    this.state = {
      dataSource,
      isLoading: true
    }
  }
  static defaultProps = {
    orderList: [],
    spin: false
  }

  goBack = () => this.props.navigation.goBack(null)

  handleChange = (tab, index) => {
    console.log(tab)
  }

  handleOnPress = () => {
    this.props.dispatch({
      type: 'increase',
      payload: Date.now()
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'fetchOrderList'
    })
  }

  render() {
    let index = data.length - 1
    const row = ({ item, index }) => {
      console.log(item)
      return <Row item={item} onPress={this.handleOnPress} />
    }
    return (
      <View style={{ height: '100%', backgroundColor: 'white', marginTop: 24 }}>
        <Tabs
          onChange={this.handleChange}
          tabs={tabs}
          initialPage={1}
          animated={true}
          useOnPan={false}
          swipeable={true}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 40, padding: 5 }}
          >
            <Text>{this.props.count}</Text>
          </View>
          <View>
            <Text>{this.props.count}</Text>
            <FlatList
              data={this.props.orderList || []}
              renderItem={row}
              keyExtractor={i => {
                return i.i
              }}
              pageSize={4}
            />
          </View>
        </Tabs>
      </View>
    )
  }
}

const mapState = wholeState => {
  return {
    ...wholeState.manifest
  }
}

export default connect(mapState)(ManifestPage)
