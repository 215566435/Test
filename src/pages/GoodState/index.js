import React, { Component } from 'react'
import {
    View,
    Alert,
    Text,
    WebView,
    Linking,
    AppState,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import { connect } from 'react-redux'

import { Content } from './Views/Content'
import {
    Model,
    PackStatus,
    PackStatusColor,
    stockState,
    itemStateColor,
    itemState
} from './model'
import { CustomTabBar } from '../../components/CustomTabBar'
import { PageWithTab } from '../../HOC/PageWithTab'
import { MarginTopIfNeeded, timeSplit } from '../../util'

import { centralization } from '../../style-util'
import { JsonCell, TextFormater, StyledText } from './json-cell'
import { ModalWrapper } from '../../HOC/ModalWrapper'

import { Log } from './Views/log'
import { Attach } from './Views/attach'
import { Cells, NewCell } from './Views/Cells'
import { Price } from './price'
import { GoodState } from './good-state'
import { Loadings } from '../../components/loading'

const LogHistory = ModalWrapper(Log)
const Attachment = ModalWrapper(Attach)

class ProductDetail extends Component {
    componentDidMount() {
        const id = this.props.navigation.state.params.id
        const messageId = this.props.navigation.state.params.messageId
        const memberId = this.props.navigation.state.params.memberId

        this.props.dispatch({
            type: 'fetchProductDetail',
            payload: { id, messageId, memberId }
        })
    }
    componentWillUnmount() {
        // this.props.clearGoodState()
    }

    handlePayment = () => {
        this.props.navigation.navigate('Payment')
    }

    _handleAppStateChange = nextAppState => {
        console.log('nextState', nextAppState)
    }

    CustomTabBarPress = () => {
        this.props.navigation.goBack(null)
    }

    handleHistoryLog = () => {
        this.props.navigation.navigate('ProductHistory')
    }

    handleAttachment = () => {
        this.props.navigation.navigate('Attachment')
    }

    getGoods = () => {
        const { go } = this.props
        if (!go) return
        const goods = go.map((item, index) => {
            const url =
                'http://cdn2u.com' +
                item.im +
                `?width=${250}` +
                `&height=${250}` +
                `&constrain=${true}` +
                `&bgcolor=white`
            return (
                <TouchableOpacity key={index}>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 5,
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            backgroundColor: 'white',
                            padding: 5
                        }}
                    >
                        <View
                            style={centralization({
                                height: 100,
                                width: 100,
                                borderWidth: 0.5,
                                borderColor: '#bfbfbf'
                            })}
                        >
                            <Image
                                source={{ uri: url }}
                                style={{ height: 90, width: 90 }}
                            />
                        </View>
                        <View style={{ width: '70%', padding: 10 }}>
                            <StyledText content={item.sn} color="black" />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 10
                                }}
                            >
                                <StyledText
                                    content={
                                        (item.c === 'RMB' ? '¥' : '$') + item.i
                                    }
                                    color="#f56a00"
                                    fontSize="large"
                                />
                                <StyledText
                                    color="#bfbfbf"
                                    content={stockState[item.ss]}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <StyledText
                                    color={itemStateColor[item.s]}
                                    content={itemState[item.s]}
                                />
                                <StyledText
                                    color={itemStateColor[item.s]}
                                    content={`数量:${item.q}`}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return goods
    }

    /**
     * 子订单点击
     */
    onChildPress = id => {
        this.props.dispatch({
            type: 'fetchProductDetail',
            payload: { id, messageId: void 666, memberId: void 666 }
        })
    }

    Packs = () => {
        const { pks, i } = this.props
        if (pks)
            return (
                <Cells style={{ flexDirection: 'row' }}>
                    {pks.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ marginLeft: index > 0 ? 10 : 0 }}
                                onPress={() => this.onChildPress(item.i)}
                            >
                                <StyledText
                                    color={item.i === i ? '#f56a00' : 'black'}
                                    content={`子订单${1 + index}`}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </Cells>
            )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.paymentState === 'done') {
            setTimeout(() => {
                const id = this.props.navigation.state.params.id
                this.props.dispatch({
                    type: 'fetchProductDetail',
                    payload: { id, messageId: void 666, memberId: void 666 }
                })
            }, 500)
        }
    }

    render() {
        const { i, t, o, ps, c, p, po, pd, pi, pt, u, r, pro, at } = this.props

        const { date, time } = timeSplit(t)
        const Currency = c === 'RMB' ? '¥' : '$'

        return (
            <View style={{ height: '100%' }}>
                <ScrollView
                    style={{
                        height: MarginTopIfNeeded(),
                        backgroundColor: '#e9e9e9'
                    }}
                >
                    <GoodState {...this.props} onPress={this.handlePayment} />
                    <Price {...this.props} />
                    <JsonCell
                        left={[
                            //物流方式
                            TextFormater(
                                `物流方式：${u ? '现场提货' : '仓库代发'}`,
                                'black'
                            )
                        ]}
                    />
                    {r ? ( //收件人
                        <JsonCell
                            left={[
                                TextFormater('收件人：' + r.n, 'black'),
                                TextFormater('地址：' + r.a, 'black'),
                                TextFormater(r.p, 'black')
                            ]}
                        />
                    ) : null}
                    {this.Packs()}
                    <NewCell
                        renderProps="订单历史记录"
                        onPress={this.handleHistoryLog}
                    />
                    <NewCell
                        onPress={this.handleAttachment}
                        renderProps={`订单附件(${at})`}
                    />
                    {pro
                        ? pro.map((item, index) => {
                              const $$$ = Currency
                              return (
                                  <JsonCell
                                      key={index}
                                      left={[
                                          TextFormater(item.name, '#fa541c')
                                      ]}
                                      right={[
                                          TextFormater(
                                              $$$ + item.price,
                                              '#fa541c'
                                          )
                                      ]}
                                  />
                              )
                          })
                        : null}
                    {this.getGoods()}
                    <Loadings />
                </ScrollView>
            </View>
        )
    }
}

function mapState(state) {
    return {
        ...state.productDetail.data,
        paymentState: state.payment.paymentState
    }
}

const wrapper = PageWithTab(ProductDetail, '返回')

export default connect(mapState)(wrapper)
