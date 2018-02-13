/**
 * 2017/12/14 方正创建
 * 订单结算页面
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal, Picker, Alert, AsyncStorage, Platform } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PageHeader } from 'component/PageHeader'
import { CustomTabBar } from 'component/CustomTabBar'
import { Input } from 'component/Input'
import { Popup } from 'component/Popup'
import { PickerView } from 'component/Picker'
import { Spin } from 'component/Spin'
import { Button } from 'component/Button'

import { AddressSelector } from './Views/addressSelector'

import { header, Url, stateBarMargin, height, width, undefinedConvert } from 'utils';
import { PageWithTab } from 'HOC/PageWithTab';
import { connect } from 'react-redux';
import { ListItem } from 'component/ListItem';

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
    return null;
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
            this.props.navigation.goBack(null);
        }
        if (index === 1) {
            this.props.dispatch({ type: 'createOrder', their_commits: this.their_commits, mycommits: this.mycommits, instance: this })
        }
    }
    onSelectAddress = ({ item, type }) => {
        if (type === void 233) return;
        AsyncStorage.setItem(type, JSON.stringify(item))
        this.props.dispatch({ type: 'mapAddress', [type]: item })
    }
    componentDidMount() {
        this.props.dispatch({ type: "fetchSumition" })
    }
    onCourierChange = (name) => {
        const { couriers } = this.props;
        let courier;
        for (let i in couriers) {
            if (couriers[i].n === name) {
                courier = couriers[i];
                break;
            }
        }
        if (courier) {
            this.props.dispatch({ type: "SwitchCourier", courier });
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
        const { couriers, u } = this.props;
        if (couriers) {
            const avalibles = couriers.filter((courier) => {
                if (courier.a) {
                    return courier
                }
            })
            const avalible = getCourier(avalibles, u);
            return (
                <PickerView addonBefore='选择快递' value={avalible ? avalible.n : ''}
                    onValueChange={(avalible) => this.onCourierChange(avalible)}
                >
                    {avalibles.map((avalible, index) => {
                        return <Picker.Item key={index} label={avalible.n} value={avalible.n} />
                    })}
                </PickerView>
            )
        }
        return null;
    }
    renderInsurance = () => {
        const { s, l, cr, r } = this.props;
        if (s) {
            return (
                <TouchableOpacity
                    style={{
                        paddingLeft: 15,
                        height: 40,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#e9e9e9",
                        backgroundColor: 'white'
                    }}
                    onPress={() => this.props.dispatch({ type: "buyInsurance" })}
                >
                    {l ?
                        <SimpleLineIcons name="check" size={20} color={l ? '#108EE9' : 'black'} />
                        :
                        <View style={{ height: 20, width: 20, borderRadius: 10, borderWidth: 1 }} />
                    }
                    <Text style={{ color: l ? '#108EE9' : 'black', backgroundColor: "transparent" }}>
                        {l ? `购买保险(已购买:${s}%,${(cr === 'RMB' ? '¥' : '$') + undefinedConvert(r)})` : `购买保险(费用:${s}%,${(cr === 'RMB' ? '¥' : '$') + undefinedConvert(r)})`}
                    </Text>
                </TouchableOpacity>
            )
        }
        return null;
    }
    onChangeText = (text, name) => {
        if (this[name] !== void 666) {
            this[name] = text;
        } else {
            this[name] = '';
            this[name] = text;
        }
    }
    handleVoucher = () => {
        this.props.dispatch({
            type: 'handleVoucher',
            payload: this.voucher
        })
    }
    handleClearVoucher = () => {
        this.props.dispatch({
            type: 'handleVoucher',
            payload: ''
        })
    }

    renderVoucher = () => {
        const { voucher } = this.props;
        console.log(this.props)
        const renderAmount = () => {
            return voucher ? (
                <ListItem
                    content={
                        <View>
                            <Text style={{ paddingLeft: 10 }}>{`输入的代金券:${voucher.vouchersCode}     减免金额:${voucher.amount}`}</Text>
                        </View>
                    }
                    ArrowColor={'transparent'}
                />
            ) : null;
        }
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: width - 120 }}>
                        <Input addonBefore='代金券' placeholder='请输入代金券'
                            defaultValue={voucher ? voucher.vouchersCode : ''}
                            onFocus={this.onFocus} onBlur={this.onBlur} onChangeText={this.onChangeText} name='voucher' />
                    </View>
                    <TouchableOpacity
                        onPress={this.handleVoucher}
                        style={{ width: 60, justifyContent: "center", alignItems: "center", backgroundColor: '#ff7a45' }}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: 10 }}>使用代金券</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleClearVoucher}
                        style={{ width: 60, justifyContent: "center", alignItems: "center", backgroundColor: '#40a9ff' }}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: 10 }}>清除代金券</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {renderAmount()}
            </View>
        )
    }

    renderApproach = () => {
        const { e, dd, cr, approach } = this.props;

        if (approach === '现场打包')
            return (
                <View style={{ height: '100%', alignItems: "center", justifyContent: "center" }}>
                    <Text>请到仓库现场打包</Text>
                </View>
            );
        return (
            <View>
                {this.renderCouriers()}
                {e === 0 ? null : <ListItem extra={`  代发税费:       ${convertCurrency(cr, e)}`} ArrowColor={'transparent'} />}
                {dd === 0 ? null : <ListItem extra={`  代发邮费:       ${convertCurrency(cr, dd)}`} ArrowColor={'transparent'} />}
                {this.renderInsurance()}
                <AddressSelector type='Receiver' value={this.props.Receiver || ''} onFinish={this.onSelectAddress} {...this.props} />
                <AddressSelector type='Sender' value={this.props.Sender || ''} propsHeight={80} onFinish={this.onSelectAddress} {...this.props} />
                <Input addonBefore='订单留言' placeholder='后台及打包人员可见信息' onFocus={this.onFocus} onBlur={this.onBlur} name='their_commits' onChangeText={this.onChangeText} />
                <Input addonBefore='我的备注' placeholder='留备信息，仅自己可见' onFocus={this.onFocus} onBlur={this.onBlur} name='mycommits' onChangeText={this.onChangeText} />
                {this.renderVoucher()}
                <ListItem title={`  总价格：${convertCurrency(cr, this.props.t)}`} extra={`   商品价格：${convertCurrency(cr, this.props.o)}`} ArrowColor={'transparent'} />
            </View>
        )
    }

    render() {
        const { e, dd, cr, approach } = this.props;

        return (
            <View style={{
                height: '100%',
                transform: [
                    { translateY: this.state.isKeyboardShow ? -220 : 0 }
                ]
            }}>
                <ScrollView style={{ marginTop: 24 }}>
                    <PickerView addonBefore='物流方式' value={approach ? approach : '仓库代发'} onValueChange={(appr) => this.props.dispatch({ type: "approach", approach: appr })} >
                        <Picker.Item label="仓库代发" value="仓库代发" />
                        <Picker.Item label="现场打包" value="现场打包" />
                    </PickerView>
                    {this.renderApproach()}
                </ScrollView>
            </View>
        )
    }
}


const mapState = (state) => {
    return {
        ...state.Settle
    }
}
const wapprer = PageWithTab(Settle, ['返回', '提交订单'], ['white', '#f5222d']);
export default connect(mapState)(wapprer);
