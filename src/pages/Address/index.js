/**
 * 方正
 * 地址选择页面
 * 个人中心里的页面
 */
import React, { Component } from 'react'
import { View, ScrollView, Text, Platform, Picker, Modal, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { PickerView } from '../../components/Picker'
import { CustomTabBar } from '../../components/CustomTabBar'
import { SearchBar } from '../../components/SearchBar'

import { MyAddress } from './Views/address'
import { Modyfiy } from './Views/modal'

import { Url, header } from '../../util'
import { FlatListComponent } from '../../HOC/FlatListWithSpecs'
import { PageWithTab } from '../../HOC/PageWithTab'

const { height } = Dimensions.get('window')
class List extends FlatListComponent {
  onEdit = addr => {
    this.props.navigation.navigate('AddressEditPage', {
      isAdd: true,
      type: addr.t,
      name: addr.n,
      id: addr.i,
      address: addr.a,
      defalut: addr.d,
      serverID: addr.id,
      phone: addr.p
    })
  }
  onDelete = addr => {
    this.props.dispatch({
      type: 'deleteAddress',
      payload: {
        address: addr,
        instance: this
      }
    })
  }

  renderItem = (child, index) => {
    const addr = child.item
    if (!addr) return null
    return (
      <MyAddress
        type={addr.t}
        name={addr.n}
        phone={addr.p}
        key={addr.id}
        address={addr.a}
        onEdit={() => this.onEdit(addr)}
        onDelete={() => this.onDelete(addr)}
        default={addr.d}
      />
    )
  }
  onEndReached = () => {
    this.props.dispatch({ type: 'appendAddress' })
  }
  dataSource = () => this.props.addresses
  keyExtractor = addr => addr.id
}

class Address extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'fetchAddress' })
  }
  CustomTabBarPress(e, child, index) {
    if (index === 0) {
      this.props.navigation.goBack()
    } else {
      console.log('点击');
      this.props.navigation.navigate('AddressEditPage', {
        isAdd: true,
        type: 'Receiver'
      })
    }
  }
  onEndEditing = text => {
    this.props.dispatch({ type: 'searchAddress', payload: text })
  }
  render() {
    return (
      <View style={{ height: height - 44, backgroundColor: 'white' }}>
        <View style={{ marginTop: 24, backgroundColor: 'white' }}>
          <SearchBar
            backgroundColor="#bfbfbf"
            onEndEditing={this.onEndEditing}
            searchColor="white"
            onChangeInput={this.onChangeInput}
          />
        </View>
        <View
          style={{
            height: height - 44 - 44 - 10 - (Platform.OS === 'ios' ? 0 : 24)
          }}
        >
          <List {...this.props} />
        </View>
      </View>
    )
  }
}

const ListWtihTab = PageWithTab(Address, ['返回', '新增地址'], ['white', '#f46e65'])
const mapState = state => {
  return {
    addresses: state.address.addresses
  }
}
export default connect(mapState)(ListWtihTab)
