/**
 * 2017/12/14 方正创建
 * 订单结算页面
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal, Button, Picker, Alert, AsyncStorage, Platform } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PageHeader } from 'component/PageHeader'
import { CustomTabBar } from 'component/CustomTabBar'
import { Input } from 'component/Input'
import { Popup } from 'component/Popup'
import { PickerView } from 'component/Picker'
import { Spin } from 'component/Spin'

import { AddressSelector } from './Views/addressSelector'

import { header, Url, stateBarMargin, height, width } from 'utils';
import { PageWithTab } from 'HOC/PageWithTab';


class Settle extends Component {
    CustomTabBarPress = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <ScrollView style={{ marginTop: 24 }}>
                    <PickerView addonBefore='物流方式' >
                        <Picker.Item label="仓库代发" value="仓库代发" />
                        <Picker.Item label="现场打包" value="现场打包" />
                    </PickerView>
                    <AddressSelector type='Receiver' value={''} />
                    <AddressSelector type='Sender' value={''} propsHeight={80} />
                    <Input addonBefore='订单留言' placeholder='后台及打包人员可见信息' onFocus={this.onFocus} onBlur={this.onBlur} name='their_commits' onChangeText={this.onChangeText} />
                    <Input addonBefore='我的备注' placeholder='留备信息，仅自己可见' onFocus={this.onFocus} onBlur={this.onBlur} name='mycommits' onChangeText={this.onChangeText} />
                </ScrollView>
            </View>
        )
    }
}

export default PageWithTab(Settle, ['返回', '价格', '提交订单']);
