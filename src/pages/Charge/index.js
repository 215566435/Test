/**
 *  支付宝充值页面
 * 使用上了 webview
 */
import React, { Component } from 'react'
import { View, Text, AppState } from 'react-native'
import { connect } from 'react-redux'

import { PageWithTab } from '../../HOC/PageWithTab'
import { height, Eng2Cn } from '../../util'
import { Loadings } from '../../components/loading'
import { RoundButton, Button } from '../../components/Button'
import { centralization } from '../../style-util'
import { ChargeButton } from './charge-button'
import { Input, InputSelfControl } from '../../components/Input'
import { PaymenWebView } from '../../HOC/PaymentWebView'

class PaymentComponent extends Component {
  componentDidMount() {
    this.justMount()
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount() {
    this.willUnmount && this.willUnmount()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _leave() {}
  _back() {}

  _handleAppStateChange = e => {
    if (e === 'active') {
      this._back()
    } else {
      //回来
      this._leave()
    }
  }
}

class Charge extends PaymentComponent {
  getCurrency = () => {
    return this.props.navigation.state.params.currency
  }

  justMount() {
    const currency = this.getCurrency()
    this.props.dispatch({ type: 'chargePaymentMethod', payload: currency })
  }
  CustomTabBarPress(e, child, index) {
    this.props.navigation.goBack()
  }
  _back = () => {
    console.log('从外面回来了')
    this.props.dispatch({
      type: 'RechargeBack',
      payload: this
    })
  }

  onChangeText = text => {
    this.text = text
  }

  onPress = () => {
    this.props.dispatch({
      type: 'recharge',
      payload: {
        money: this.text,
        currency: this.getCurrency()
      }
    })
  }

  render() {
    const { paymentMethod, rechargeData } = this.props
    const currency = this.getCurrency()
    console.log('charge', this.props)
    return (
      <View style={centralization({ height: height - 44, backgroundColor: 'white' })}>
        <Text style={{ fontSize: 25, marginBottom: 10, marginTop: 100 }}>{Eng2Cn(currency)}充值</Text>
        {paymentMethod.map((i, idx) => {
          return (
            <ChargeButton currency={currency} title={i.name} key={currency} onPress={this.onPress}>
              <Input addonBefore="金额" onChangeText={this.onChangeText} keyboardType="numeric" autoFocus={true} />
            </ChargeButton>
          )
        })}
        <PaymenWebView url={rechargeData.payUrl} />
        <Loadings />
      </View>
    )
  }
}

{
  /* <Button title={i.name} key={idx} backgroundColor="#1890ff" /> */
}

const ListWtihTab = PageWithTab(Charge, ['返回'])
const mapState = state => {
  return {
    ...state.loading,
    ...state.charge
  }
}

export default connect(mapState)(ListWtihTab)
