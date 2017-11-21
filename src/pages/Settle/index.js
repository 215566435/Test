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
        total: ''
    }
    onPress = (e, child, index) => {
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
        AsyncStorage.multiGet(['Receiver', 'Sender']).then((res) => {
            that.setState({
                Receiver: JSON.parse(res[0][1]) || '',
                Sender: JSON.parse(res[1][1]) || { a: '', d: false, i: '', id: '', n: '', p: '', se: false, t: 'Sender' },
                deliveryInfo: deliveryInfo,
                defaultDelivery: deliveryInfo[0].n,
                total: that.props.navigation.state.params.total
            })
        })
    }

    renderTabBar = () => (
        <CustomTabBar childColor={(child, index) => tabColor[index]} onPress={this.onPress}>
            <View>
                <Text>返回</Text>
            </View>
            <View>
                <Text>商品总额</Text>
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
        const Courier = updateCourier.call(this, value);
        this.setState({
            defaultDelivery: value
        })
    }

    renderForm = () => (
        <View style={{
            transform: [
                { translateY: this.state.isKeyboardVisiable ? -120 : 0 }
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
                        <AddressSelector type='Receiver' value={this.state.Receiver} onFinish={this.onSelectAddress} />
                        <AddressSelector type='Sender' value={this.state.Sender} onFinish={this.onSelectAddress} />
                        <Input addonBefore='订单留言' placeholder='后台及打包人员可见信息' onFocus={this.onFocus} onBlur={this.onBlur} name='their_commits' onChangeText={this.onChangeText} />
                        <Input addonBefore='我的备注' placeholder='留备信息，仅自己可见' onFocus={this.onFocus} onBlur={this.onBlur} name='mycommits' onChangeText={this.onChangeText} />
                    </View>
                )}

        </View>
    )

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <ScrollView style={{ height: height - 44 - stateBarMargin(0), marginTop: stateBarMargin(0) }}>
                    {this.renderForm()}
                </ScrollView>
                {this.renderTabBar()}
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
    fetch(Url + 'order/create', {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify({
            r: this.state.Receiver,
            s: this.state.Sender,
            e: this.state.their_commits,
            m: this.state.mycommits,
            t: this.state.total
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