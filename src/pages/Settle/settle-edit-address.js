import React from 'react'
import { View } from 'react-native'
import { PageWithTab } from '../../HOC/PageWithTab'
import { Page } from '../../components/page'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { connect } from 'react-redux'

class SettleEditAddress extends React.Component {
  state = {
    billName: '',
    billPhone: '',
    idNumber: '',
    billAddress: ''
  }

  CustomTabBarPress = (e, child, index) => {
    if (index === 1) {
      const type = this.props.navigation.state.params.type
      this.props.dispatch({ type: 'EditAdressInfo', payload: { type: type, address: this.state } })

      this.props.navigation.goBack(null)
    } else {
      this.props.navigation.goBack(null)
    }
  }

  componentDidMount() {
    const { receiver, sender } = this.props

    if (!receiver) return

    if (this.isSender()) {
      if (sender)
        this.setState({
          billName: sender.billName,
          billPhone: sender.billPhone,
          idNumber: sender.idNumber,
          billAddress: sender.billAddress
        })
    } else {
      if (receiver)
        this.setState({
          billName: receiver.billName,
          billPhone: receiver.billPhone,
          idNumber: receiver.idNumber,
          billAddress: receiver.billAddress
        })
    }
  }

  onChangeText = (value, key) => {
    this.setState({
      [key]: value
    })
  }

  renderReceiver = () => {
    const address = this.state
    return (
      <View>
        <Input addonBefore="收件人姓名" name="billName" onChangeText={this.onChangeText} value={address.billName} />
        <Input
          addonBefore="收件人手机号码"
          name="billPhone"
          onChangeText={this.onChangeText}
          value={address.billPhone}
        />
        <Input addonBefore="收件人身份证" name="idNumber" onChangeText={this.onChangeText} value={address.idNumber} />
        <Input
          addonBefore="收件人地址"
          name="billAddress"
          onChangeText={this.onChangeText}
          value={address.billAddress}
        />
      </View>
    )
  }

  renderSender = () => {
    const address = this.state
    return (
      <View>
        <Input addonBefore="发件人姓名" name="billName" onChangeText={this.onChangeText} value={address.senderName} />
        <Input
          addonBefore="发件人手机号码"
          name="billPhone"
          onChangeText={this.onChangeText}
          value={address.senderPhone}
        />
        <Input
          addonBefore="发件人地址"
          name="billAddress"
          onChangeText={this.onChangeText}
          value={address.senderAddress}
        />
      </View>
    )
  }

  isSender = () => {
    const type = this.props.navigation.state.params.type
    return type === 'sender'
  }

  render() {
    const inputs = this.isSender() ? this.renderSender() : this.renderReceiver()

    return (
      <Page>
        <View style={{ marginTop: 100 }}>{inputs}</View>
      </Page>
    )
  }
}

const wapprer = PageWithTab(SettleEditAddress, ['返回', '确定修改'], ['white', '#f5222d'])

const mapState = state => {
  return {
    ...state.settle.data,
    receiver: state.settle.receiver,
    sender: state.settle.sender
  }
}
export default connect(mapState)(wapprer)
