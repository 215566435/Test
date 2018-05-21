import React from 'react'
import { View, WebView, Linking, Text, AppState } from 'react-native'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { Button } from '../../components/Button'
import { centralization } from '../../style-util'
import { height } from '../../util'
import { Spin } from '../../components/Spin'
import { Loadings } from '../../components/loading'
import { StyledText } from '../GoodState/json-cell'

class payment extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'getPaymentMethods'
    })
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  _goToPayment = bool => {
    this.props.dispatch({
      type: 'goToPayment',
      payload: {
        instance: this,
        isGoing: bool
      }
    })
  }

  _handleAppStateChange = e => {
    if (this.props.url) {
      if (e === 'active') {
        this._goToPayment(false)
      } else {
        //回来
        this._goToPayment(true)
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'clearPayment'
    })
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  CustomTabBarPress = (e, child, index) => {
    this.props.navigation.goBack(null)
  }

  pay = m => {
    this.props.dispatch({ type: 'pay', payload: m })
  }

  HandleShouldStartLoadWithRequest = e => {
    if (e.url.indexOf('alipay://alipayclient/') >= 0) {
      Linking.openURL(e.url)
      return false
    }
    return true
  }
  renderPayment = () => {
    return this.props.url ? (
      <WebView
        style={{ zIndex: -1, width: 0, height: 0 }}
        onShouldStartLoadWithRequest={this.HandleShouldStartLoadWithRequest}
        source={{ uri: this.props.url }}
      />
    ) : null
  }

  handleCheckPaymentState = () => {
    this._goToPayment(true)
  }

  goBack = () => {
    this.props.navigation.goBack(null)
  }

  payByDeposite = () => {
    this.props.dispatch({ type: 'payByDeposite', payload: this })
  }

  renderButton = () => {
    const middle = { style: { marginTop: height / 5 } }

    const isPrepay = () => {
      return this.props.isPrepay ? <Button title={'预存款支付'} onPress={this.payByDeposite} /> : null
    }
    const textStyle = {
      color: '#fa541c'
    }
    const currency = this.props.c === 'RMB' ? '¥' : '$'

    //根据不同情况出现不同的按钮
    const state = {
      notPay: (
        <View {...middle}>
          <View style={{ ...centralization(), marginBottom: 150 }}>
            <StyledText color="black" fontSize="large" content={`订单支付`} />
            <StyledText {...textStyle} content={`订单号：${this.props.oi}`} />
            <StyledText {...textStyle} content={`支付金额：${currency + this.props.p}`} />
          </View>
          {isPrepay() /*ji */}
          {this.props.methods.map((m, index) => {
            const AmountInButton = this.props.p === m.money ? '' : `(${currency + m.money})`
            return (
              <View key={index}>
                <Button backgroundColor="#1890ff" title={`${m.name}${AmountInButton}`} onPress={() => this.pay(m)} />
              </View>
            )
          })}
        </View>
      ),
      fail: (
        <View {...middle}>
          <Button backgroundColor="#1890ff" title={'我已完成支付，刷新结果'} onPress={this.handleCheckPaymentState} />
        </View>
      )
    }
    return state[this.props.paymentState]
  }

  render() {
    const { paymentState } = this.props
    return (
      <View style={{ height: '100%' }}>
        {this.renderButton()}
        {this.renderPayment()}
        <Loadings />
      </View>
    )
  }
}

const paymentContainer = PageWithTab(payment, ['返回'])

const mapState = state => {
  return {
    ...state.payment,
    oi: state.productDetail.data.oi,
    p: state.productDetail.data.p,
    c: state.productDetail.data.c
  }
}

export default connect(mapState)(paymentContainer)
