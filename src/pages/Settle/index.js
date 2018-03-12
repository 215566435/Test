/**
 * 2017/12/14 方正创建
 * 订单结算页面
 */
import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    Modal,
    Picker,
    Alert,
    AsyncStorage,
    Platform
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { PageHeader } from '../../components/PageHeader'
import { CustomTabBar } from '../../components/CustomTabBar'
import { Input, InputSelfControl } from '../../components/Input'
import { Popup } from '../../components/Popup'
import { PickerView } from '../../components/Picker'
import { Spin } from '../../components/Spin'
import { Button } from '../../components/Button'

import { AddressSelector } from './Views/addressSelector'

import {
    header,
    Url,
    stateBarMargin,
    height,
    width,
    undefinedConvert
} from '../../util'
import { PageWithTab } from '../../HOC/PageWithTab'
import { connect } from 'react-redux'
import { ListItem } from '../../components/ListItem'
import { ImageHelper } from '../PriceList/Views/PriceItem'

/**
 * 给进来一个快递数组，选择与id对应的快递
 * @param {array} Courier 快递
 * @param {number} id 选择的快递id
 */
const getCourier = (Courier, id) => {
    for (let i in Courier) {
        if (Courier[i].i === id) {
            return Courier[i]
        }
    }
    return null
}

/**
 * 根据currency切换币种
 * @param {*} cr
 * @param {*} money
 */
const convertCurrency = (cr, money) => {
    const string = `${cr === 'RMB' ? '¥' : '$'}${money}`
    return string
}
class Settle extends Component {
    state = {
        isKeyboardShow: false
    }
    CustomTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack(null)
        }
        if (index === 1) {
            const { promotionsSum, freeItems } = this.props
            if (promotionsSum.length === 0) {
                var hasOpptunity = false
                Object.keys(freeItems).forEach(() => {
                    hasOpptunity = true
                })
                if (hasOpptunity) {
                    Alert.alert(
                        '赠品提示',
                        '根据你选择的商品，你有赠品可以选择，你确定不选赠品直接下单吗？',
                        [
                            {
                                text: '不选赠品直接下单',
                                onPress: () => {
                                    this.props.dispatch({
                                        type: 'createOrder',
                                        their_commits: this.their_commits,
                                        mycommits: this.mycommits,
                                        instance: this
                                    })
                                }
                            },
                            { text: '返回选择赠品' }
                        ],
                        { cancelable: false }
                    )
                } else {
                    this.props.dispatch({
                        type: 'createOrder',
                        their_commits: this.their_commits,
                        mycommits: this.mycommits,
                        instance: this
                    })
                }
            }
        }
    }
    onSelectAddress = ({ item, type }) => {
        if (type === void 233) return
        AsyncStorage.setItem(type, JSON.stringify(item))
        this.props.dispatch({ type: 'mapAddress', [type]: item })
    }
    componentDidMount() {
        this.props.dispatch({ type: 'fetchSumition' })
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.voucher) {
            this.handleChangeText(nextprops.voucher.vouchersCode)
        }
    }

    onCourierChange = name => {
        const { couriers } = this.props
        let courier
        for (let i in couriers) {
            if (couriers[i].n === name) {
                courier = couriers[i]
                break
            }
        }
        if (courier) {
            this.props.dispatch({ type: 'SwitchCourier', courier })
        }
    }
    onFocus = () => {
        this.setState({
            isKeyboardShow: true
        })
    }
    onBlur = () => {
        this.setState({
            isKeyboardShow: false
        })
    }
    renderCouriers = () => {
        const { couriers, u } = this.props
        if (couriers) {
            const avalibles = couriers.filter(courier => {
                if (courier.a) {
                    return courier
                }
            })
            const avalible = getCourier(avalibles, u)
            return (
                <PickerView
                    addonBefore="选择快递"
                    value={avalible ? avalible.n : ''}
                    onValueChange={avalible => this.onCourierChange(avalible)}
                >
                    {avalibles.map((avalible, index) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={avalible.n}
                                value={avalible.n}
                            />
                        )
                    })}
                </PickerView>
            )
        }
        return null
    }
    renderInsurance = () => {
        const { s, l, cr, r } = this.props
        if (s) {
            return (
                <TouchableOpacity
                    style={{
                        paddingLeft: 15,
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#e9e9e9',
                        backgroundColor: 'white'
                    }}
                    onPress={() =>
                        this.props.dispatch({ type: 'buyInsurance' })
                    }
                >
                    {l ? (
                        <SimpleLineIcons
                            name="check"
                            size={20}
                            color={l ? '#108EE9' : 'black'}
                        />
                    ) : (
                        <View
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                borderWidth: 1
                            }}
                        />
                    )}
                    <Text
                        style={{
                            color: l ? '#108EE9' : 'black',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {l
                            ? `购买保险(已购买:${s}%,${(cr === 'RMB'
                                  ? '¥'
                                  : '$') + undefinedConvert(r)})`
                            : `购买保险(费用:${s}%,${(cr === 'RMB'
                                  ? '¥'
                                  : '$') + undefinedConvert(r)})`}
                    </Text>
                </TouchableOpacity>
            )
        }
        return null
    }
    onChangeText = (text, name) => {
        if (this[name] !== void 666) {
            this[name] = text
        } else {
            this[name] = ''
            this[name] = text
        }
    }
    onVoucherBlur = () => {
        this.props.dispatch({
            type: 'handleVoucher',
            payload: this.voucherComponent.getText()
        })
        this.setState({
            isKeyboardShow: false
        })
    }
    handleClearVoucher = () => {
        this.voucherComponent.clear()
        this.props.dispatch({
            type: 'handleVoucher',
            payload: ''
        })
    }
    handleChangeText = text => {
        this.voucherComponent.setText(text)
    }

    renderVoucher = () => {
        const { voucher } = this.props
        const renderAmount = () => {
            return voucher ? (
                <ListItem
                    content={
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: width - 150 }} />
                            <Text
                                style={{
                                    width: 150,
                                    fontSize: 12,
                                    color: '#ff7875',
                                    paddingLeft: 10,
                                    fontWeight: 'bold'
                                }}
                            >{`代金券减免金额:-${voucher.amount}元`}</Text>
                        </View>
                    }
                    ArrowColor={'transparent'}
                />
            ) : null
        }
        const button = ({ onPress, color, title }) => (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color
                }}
            >
                <View>
                    <Text style={{ color: 'white', fontSize: 10 }}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: width - 60 }}>
                        <InputSelfControl
                            addonBefore="代金券"
                            placeholder="请输入代金券"
                            ref={node => (this.voucherComponent = node)}
                            defaultValue={voucher ? voucher.vouchersCode : ''}
                            onFocus={this.onFocus}
                            onBlur={this.onVoucherBlur}
                            onChangeText={this.handleChangeText}
                            name="voucher"
                        />
                    </View>
                    {button({
                        onPress: this.handleClearVoucher,
                        color: '#40a9ff',
                        title: '清除代金券'
                    })}
                </View>
                {renderAmount()}
            </View>
        )
    }

    handleGetFreeItem = key => {
        this.props.navigation.navigate('FreeItem', { key })
    }

    renderFreeItems = () => {
        const { freeItems } = this.props
        var item = {}
        var button = []
        for (const key in freeItems) {
            item = freeItems[key]
            button.push(freeItems[key])
        }

        console.log(this.props)
        return button.map((i, index) => {
            return (
                <ListItem
                    key={i.key}
                    content={
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    width: 60,
                                    fontSize: 12,
                                    color: '#ff7875',
                                    paddingLeft: 10
                                }}
                            >
                                赠品{index + 1}
                            </Text>
                            <Text style={{ width: width - 160, fontSize: 12 }}>
                                {i.name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.handleGetFreeItem(i.key)}
                                style={{
                                    width: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#ff7a45',
                                    minHeight: 30
                                }}
                            >
                                <View>
                                    <Text
                                        style={{ color: 'white', fontSize: 10 }}
                                    >
                                        选择赠品
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    ArrowColor={'transparent'}
                />
            )
        })
    }

    renderPromotionsSum = () => {
        if (this.props.promotionsSum === void 666) return

        return (
            <ListItem
                content={
                    <View style={{ alignItems: 'center' }}>
                        {this.props.promotionsSum.map((item, index) => {
                            return (
                                <View
                                    style={{ flexDirection: 'row' }}
                                    key={index}
                                >
                                    <View style={{ width: width - 150 }} />
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#ff7875',
                                            paddingLeft: 10,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item.promotionsName}: -{item.price}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                }
                ArrowColor={'transparent'}
            />
        )
    }

    renderSheet = () => {
        const { e, dd, cr, approach } = this.props

        if (approach === '现场打包')
            return (
                <View
                    style={{
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text>请到仓库现场打包</Text>
                </View>
            )
        return (
            <View>
                {this.renderCouriers()}
                {e === 0 ? null : (
                    <ListItem
                        extra={`  代发税费:       ${convertCurrency(cr, e)}`}
                        ArrowColor={'transparent'}
                    />
                )}
                {dd === 0 ? null : (
                    <ListItem
                        extra={`  代发邮费:       ${convertCurrency(cr, dd)}`}
                        ArrowColor={'transparent'}
                    />
                )}
                {this.renderInsurance()}
                <AddressSelector
                    type="Receiver"
                    value={this.props.Receiver || ''}
                    onFinish={this.onSelectAddress}
                    {...this.props}
                />
                <AddressSelector
                    type="Sender"
                    value={this.props.Sender || ''}
                    propsHeight={80}
                    onFinish={this.onSelectAddress}
                    {...this.props}
                />
                <Input
                    addonBefore="订单留言"
                    placeholder="后台及打包人员可见信息"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="their_commits"
                    onChangeText={this.onChangeText}
                />
                <Input
                    addonBefore="我的备注"
                    placeholder="留备信息，仅自己可见"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    name="mycommits"
                    onChangeText={this.onChangeText}
                />
                {this.renderFreeItems()}
                {this.renderVoucher()}
                {this.renderPromotionsSum()}
                <ListItem
                    content={
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: width - 150 }} />
                                <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                                    商品价格：{convertCurrency(
                                        cr,
                                        this.props.o
                                    )}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: width - 150 }} />
                                <Text style={{ fontSize: 13, paddingLeft: 10 }}>
                                    总价格：{convertCurrency(cr, this.props.t)}
                                </Text>
                            </View>
                        </View>
                    }
                    ArrowColor={'transparent'}
                />
            </View>
        )
    }

    render() {
        const { e, dd, cr, approach } = this.props

        return (
            <View
                style={{
                    height: '100%',
                    transform: [
                        { translateY: this.state.isKeyboardShow ? -220 : 0 }
                    ]
                }}
            >
                <ScrollView style={{ marginTop: 24 }}>
                    <PickerView
                        addonBefore="物流方式"
                        value={approach ? approach : '仓库代发'}
                        onValueChange={appr =>
                            this.props.dispatch({
                                type: 'approach',
                                approach: appr
                            })
                        }
                    >
                        <Picker.Item label="仓库代发" value="仓库代发" />
                        <Picker.Item label="现场打包" value="现场打包" />
                    </PickerView>
                    {this.renderSheet()}
                </ScrollView>
            </View>
        )
    }
}

const mapState = state => {
    return {
        ...state.Settle
    }
}
const wapprer = PageWithTab(Settle, ['返回', '提交订单'], ['white', '#f5222d'])
export default connect(mapState)(wapprer)
