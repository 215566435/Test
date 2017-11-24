/**
 * 2017/11/03 方正创建
 * 订单结算页面
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal, Button, Picker, Alert, AsyncStorage } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PageHeader } from '../../components/PageHeader'
import { CustomTabBar } from '../../components/CustomTabBar'
import { Input } from '../../components/Input'
import { stateBarMargin } from '../../util'
import { Popup } from '../../components/Popup'
import { PickerView } from '../../components/Picker'
import { Spin } from '../../components/Spin'

import { AddressSelector } from './Views/addressSelector'

import { header, Url } from '../../util';

const { height, width } = Dimensions.get('window')

const tabColor = ['white', 'white', '#f04134']
export default class Settle extends Component {
    state = {
        deliveryInfo: [],
        defaultDelivery: '',
        Receiver: '',
        Sender: { a: '', d: false, i: '', id: '', n: '', p: '', se: false, t: 'Sender' },
        isKeyboardVisiable: false,
        their_commits: '',
        mycommits: '',
        isSelf: false,
        isSelfString: '仓库代发',
        total: '',
        currency: '',
        origin: '',
        Couriers: '',
        insuranceRate: '',
        deliveryFee: '',
        otherFee: '',
        buyInsurance: false,
        loading: false
    }
    onPress = (e, child, index) => {
        console.log(this.state)
        if (index === 0) {
            if (this.props.navigation.goBack)
                this.props.navigation.goBack()
        } else if (index === 2) {
            createOrder.call(this)
        }
    }
    onFocus = () => {
        this.setState({
            isKeyboardVisiable: true
        })
    }
    onBlur = () => {
        this.setState({
            isKeyboardVisiable: false
        })
    }

    componentDidMount() {
        let that = this;
        const deliveryInfo = this.props.navigation.state.params.deliveryInfo.filter((item) => {
            if (item.a) return item
        });

        let defaultDelivery = deliveryInfo[0].n;

        for (let index in deliveryInfo) {
            let item = deliveryInfo[index]
            if (that.props.navigation.state.params.Couriers === item.i) {
                defaultDelivery = item.n;
                break;
            }
        }

        const origin = (that.props.navigation.state.params.currency === 'RMB' ? '¥' : '$') + this.props.navigation.state.params.origin
        const total = (that.props.navigation.state.params.currency === 'RMB' ? '¥' : '$') + this.props.navigation.state.params.total

        console.log(that.props.navigation.state.params)
        this.setState({
            deliveryInfo: deliveryInfo,
            defaultDelivery: defaultDelivery,
            total: total,
            currency: that.props.navigation.state.params.currency,
            origin: origin,
            Couriers: that.props.navigation.state.params.origin.Couriers,
            Receiver: that.props.navigation.state.params.Receiver,
            Sender: that.props.navigation.state.params.Sender,
            insuranceRate: that.props.navigation.state.params.insuranceRate,
            otherFee: that.props.navigation.state.params.otherFee,
            buyInsurance: that.props.navigation.state.params.buyInsurance,
            insuranceFee: that.props.navigation.state.params.insuranceFee,
            deliveryFee: that.props.navigation.state.params.deliveryFee
        })
    }

    renderTabBar = () => (
        <CustomTabBar childColor={(child, index) => tabColor[index]} onPress={this.onPress} shouldUpdate={true}>
            <View>
                <Text>返回</Text>
            </View>
            <View>
                <Text style={{ fontSize: 12 }}>商品总额:{this.state.origin}</Text>
                <Text style={{ fontSize: 12 }}>订单总额:{this.state.total}</Text>
            </View>
            <View>
                <Text style={{ color: 'white' }}>提交订单</Text>
            </View>
        </CustomTabBar>
    )
    onSelectAddress = ({ item, type }) => {
        if (type === void 233) return;
        AsyncStorage.setItem(type, JSON.stringify(item))
        this.setState({
            [type]: item
        })
    }
    onChangeText = (text, name) => {
        this.setState({
            [name]: text
        })
    }
    OnPackingMethod = (value) => {
        const isSelf = value === '现场打包' ? true : false;
        const string = value === '现场打包' ? '现场打包' : '仓库代发';
        this.setState({
            isSelf: isSelf,
            isSelfString: string
        })
    }
    onCourierChange = (value) => {

        (async (that) => {
            let Courier = null;
            for (let index in that.state.deliveryInfo) {
                if (that.state.deliveryInfo[index].n === value) {
                    Courier = that.state.deliveryInfo[index]
                    break;
                }
            }
            if (Courier) {
                that.setState({
                    loading: true,
                    defaultDelivery: value
                })
                const res = await fetch(Url + 'cart/SwitchCourier', {
                    method: 'POST',
                    headers: header.get(),
                    body: JSON.stringify(Courier)
                })
                const json = await res.json()
                if (!json.success) {
                    Alert.alert(json.message)
                }
                console.log(json)


                const origin = (json.data.cr === 'RMB' ? '¥' : '$') + json.data.o
                const total = (json.data.cr === 'RMB' ? '¥' : '$') + json.data.t
                that.setState({
                    otherFee: json.data.e,
                    total: total,
                    origin: origin,
                    buyInsurance: json.data.l,
                    insuranceRate: json.data.s,
                    insuranceFee: json.data.r,
                    loading: false,
                    defaultDelivery: value,
                    deliveryFee: json.data.dd
                })
            }
        })(this)
    }

    buyInsurance = () => {
        (async (that) => {
            that.setState({
                loading: true
            })
            const res = await fetch(Url + 'cart/SetInsurance', {
                method: 'POST',
                headers: header.get(),
                body: JSON.stringify({
                    i: !that.state.buyInsurance
                })
            })

            const json = await res.json();
            const deliveryInfo = json.data.couriers.filter((item) => {
                if (item.a) return item
            });
            const origin = (json.data.cr === 'RMB' ? '¥' : '$') + json.data.o
            const total = (json.data.cr === 'RMB' ? '¥' : '$') + json.data.t
            that.setState({
                deliveryInfo: deliveryInfo,
                total: total,
                currency: json.data.cr,
                origin: origin,
                Couriers: json.data.couriers,
                insuranceRate: json.data.s,
                insuranceFee: json.data.r,
                buyInsurance: !that.state.buyInsurance,
                deliveryFee: json.data.dd,
                loading: false
            })
        })(this)
    }

    renderForm = () => (
        <View style={{
            transform: [
                { translateY: this.state.isKeyboardVisiable ? -220 : 0 }
            ]
        }}>
            <PickerView addonBefore='物流方式' onValueChange={this.OnPackingMethod} value={this.state.isSelfString}>
                <Picker.Item label="仓库代发" value="仓库代发" />
                <Picker.Item label="现场打包" value="现场打包" />
            </PickerView>
            {this.state.isSelf ?
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, color: '#f46e65' }}>
                    请到仓库现场自己提货
                </Text> :
                (
                    <View>
                        <PickerView addonBefore='选择快递' value={this.state.defaultDelivery} onValueChange={this.onCourierChange}>
                            {this.state.deliveryInfo.map((item) => <Picker.Item key={item.i} label={item.n} value={item.n} />)}
                        </PickerView>
                        {this.state.deliveryFee === 0 ? null :
                            (<View style={{ paddingLeft: 15, height: 40, flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#e9e9e9" }}>
                                <Text>快递费</Text>
                                <Text style={{ marginLeft: 30 }}>{(this.state.currency === 'RMB' ? '¥' : '$') + this.state.deliveryFee}</Text>
                            </View>)
                        }
                        {this.state.otherFee === 0 ? null :
                            (<View style={{ paddingLeft: 15, height: 40, flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#e9e9e9" }}>
                                <Text>代发税费</Text>
                                <Text style={{ marginLeft: 30 }}>{(this.state.currency === 'RMB' ? '¥' : '$') + this.state.otherFee}</Text>
                            </View>)
                        }
                        {this.state.insuranceRate === 0 ? null : (
                            <TouchableOpacity
                                style={{
                                    paddingLeft: 15,
                                    height: 40,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "#e9e9e9"
                                }}
                                onPress={this.buyInsurance}
                            >
                                {this.state.buyInsurance ?
                                    <SimpleLineIcons name="check" size={20} color={this.state.buyInsurance ? '#108EE9' : 'black'} />
                                    :
                                    <View style={{ height: 20, width: 20, borderRadius: 10, borderWidth: 1 }} />
                                }
                                <Text style={{ color: this.state.buyInsurance ? '#108EE9' : 'black' }}>
                                    {this.state.buyInsurance ? `购买保险(已购买:${this.state.insuranceRate}%,${(this.state.currency === 'RMB' ? '¥' : '$') + this.state.insuranceFee})` : `购买保险(费用:${this.state.insuranceRate}%,${(this.state.currency === 'RMB' ? '¥' : '$') + this.state.insuranceFee})`}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <AddressSelector type='Receiver' value={this.state.Receiver || ''} onFinish={this.onSelectAddress} />
                        <AddressSelector type='Sender' value={this.state.Sender || ''} onFinish={this.onSelectAddress} propsHeight={80} />
                        <Input addonBefore='订单留言' placeholder='后台及打包人员可见信息' onFocus={this.onFocus} onBlur={this.onBlur} name='their_commits' onChangeText={this.onChangeText} />
                        <Input addonBefore='我的备注' placeholder='留备信息，仅自己可见' onFocus={this.onFocus} onBlur={this.onBlur} name='mycommits' onChangeText={this.onChangeText} />
                    </View>
                )}
        </View>
    )

    render() {
        console.log('更新')
        return (
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView style={{ height: height - 44 - stateBarMargin(0), marginTop: stateBarMargin(0) }}>
                    {this.renderForm()}
                </ScrollView>
                {this.renderTabBar()}
                {this.state.loading ? (
                    <View style={{ height: '70%', width: "100%", position: 'absolute', alignItems: "center", justifyContent: "center", zIndex: 10 }} >
                        <View style={{
                            height: 150,
                            width: 150,
                            backgroundColor: "white",
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 0.5,
                            borderColor: "#fccca7"
                        }}>
                            <Spin />
                            <Text style={{ color: '#404040' }}>{'请稍后...'}</Text>
                        </View>
                    </View>) : null}
            </View>
        )
    }
}

function updateCourier(value) {
    let Courier = null;
    for (let index in this.state.deliveryInfo) {
        if (this.state.deliveryInfo[index].n === value) {
            Courier = this.state.deliveryInfo[index]
            break;
        }
    }
    if (Courier) {
        fetch(Url + 'cart/SwitchCourier', {
            method: 'POST',
            headers: header.get(),
            body: JSON.stringify(Courier)
        }).
            then((res) => {
                res.json()
                    .then((json) => {
                        if (!json.success) {
                            Alert.alert(json.message)
                        }
                        console.log(json)
                    })
                    .catch((err) => {
                        Alert.alert('出错', err)
                    })
            })
            .catch((e) => {
                Alert.alert('出错', e)
            })
    }
}

function createOrder() {
    let that = this;
    console.log(this.state.total.slice(1))
    fetch(Url + 'order/create', {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify({
            r: this.state.Receiver,
            s: this.state.Sender,
            e: this.state.their_commits,
            m: this.state.mycommits,
            t: this.state.total.slice(1)
        })
    }).
        then((res) => {
            res.json()
                .then((json) => {
                    console.log(json)
                    if (!json.success) {
                        Alert.alert(json.message)
                    } else {
                        that.props.navigation.goBack()
                        that.props.navigation.state.params.Cartinstance.props.FetchCart()
                        that.props.navigation.navigate('GoodState', { id: json.data.i })
                        Alert.alert('下单成功！')
                    }
                })
                .catch((err) => {
                    Alert.alert('出错', err)
                })
        })
        .catch((e) => {
            Alert.alert('出错', e)
        })
}