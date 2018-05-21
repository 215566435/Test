import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PageWithTab } from '../../HOC/PageWithTab'
import { connect } from 'react-redux'
import { FlatListComponent } from '../../HOC/FlatListWithSpecs'

class MyAddress extends React.Component {
  render() {
    const { onDelete, onEdit, onPress } = this.props
    const type = this.props.type === 'Receiver' ? '收件人' : '发件人'
    return (
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: 'white',
          marginBottom: 4,
          borderBottomWidth: 0.5,
          borderBottomColor: '#d9d9d9'
        }}
        onPress={onPress}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ color: '#5a5a5a', backgroundColor: 'transparent' }}>
            {type + '：'}
            {this.props.name}
          </Text>
          <Text style={{ color: '#5a5a5a', backgroundColor: 'transparent' }}>{this.props.phone}</Text>
        </View>
        <Text numberOfLines={4} style={{ color: '#5a5a5a', backgroundColor: 'transparent' }}>
          {this.props.address}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <Text style={{ backgroundColor: 'transparent' }}>{this.props.default ? '默认收件人' : null}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class List extends FlatListComponent {
  componentDidMount() {
    this.props.dispatch({ type: 'fetchAddress' })
  }

  isSender = () => {
    const type = this.props.navigation.state.params.type
    return type === 'sender'
  }

  type = () => {
    return this.props.navigation.state.params.type
  }

  selectAddress = addr => {
    const billAddress = addr.a
    const billPhone = addr.p
    const billName = addr.n
    this.props.dispatch({
      type: 'EditAdressInfo',
      payload: {
        type: this.type(),
        address: {
          billAddress,
          billPhone,
          billName
        }
      }
    })
    this.props.navigation.goBack(null)
  }

  renderItem = (child, index) => {
    const addr = child.item
    if (!addr) return null

    if (this.isSender()) {
      if (addr.t === 'Sender')
        return (
          <MyAddress
            onPress={() => this.selectAddress(addr)}
            type={addr.t}
            name={addr.n}
            phone={addr.p}
            key={addr.id}
            address={addr.a}
            default={addr.d}
          />
        )
    } else {
      if (addr.t === 'Receiver')
        return (
          <MyAddress
            onPress={() => this.selectAddress(addr)}
            type={addr.t}
            name={addr.n}
            phone={addr.p}
            key={addr.id}
            address={addr.a}
            default={addr.d}
          />
        )
    }
    return <View />
  }
  CustomTabBarPress = (e, child, index) => {
    this.props.navigation.goBack(null)
  }

  onEndReached = () => {
    this.props.dispatch({ type: 'appendAddress' })
  }
  dataSource = () => this.props.addresses
  keyExtractor = addr => addr.id
}

const wapprer = PageWithTab(List, ['返回'], ['white'])

const mapState = state => {
  return {
    addresses: state.address.addresses
  }
}
export default connect(mapState)(wapprer)
