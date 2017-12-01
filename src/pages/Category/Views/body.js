/**
 *  2017/10/31 方正 创建
 * 商品分类
 */

import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Tab, TabHead } from '../../../components/Tab';
import { Spin } from '../../../components/Spin';

const { height, width } = Dimensions.get('window')
export class Body extends Component {

    tabList = () => {
        if (!this.props.tabList) return [];
        return this.props.tabList.map((child) => {
            return child.n
        })

    }
    renderTabItem = () => {

        if (!this.props.tabList) return <Spin />;

        return this.props.tabList.map((tab, idx) => {
            if (!tab.s) {
                return (
                    <View key={idx} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <CateItem name='全部分类' key={idx} onPress={() => { this.props.catePress(tab.i) }} />
                    </View>
                )
            } else {
                return (
                    <View key={idx} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <CateItem name='全部分类' onPress={() => { this.props.catePress(tab.i) }} />
                        {tab.s.map((item, index) => {
                            return <CateItem name={item.n} key={index} onPress={() => { this.props.catePress(item.i) }} />
                        })}
                    </View>
                )
            }
        })
    }

    render() {
        const pheight = Platform.OS === 'ios' ? height - 66 : height - 66
        return (
            <View style={{ backgroundColor: "white", height: pheight }}>
                <TabHead
                    ActivateIndex={this.props.headerCateID}
                    tabItem={['澳购网', 'UGG']}
                    border={true}
                    activateColor='#f04134'
                    activateBackground='white'
                    activateSize={18}
                    onPress={this.props.onHeadPress}
                />
                <Tab
                    tabList={this.tabList()}
                    left={true}
                    border={true}
                    height={height - 44 - 44 - (Platform.OS === 'ios' ? 25 : 0)}
                    scrollHead={true}
                    radio='60%'
                    headFontSize={12}
                    activateSize={12}
                    activateColor='#f04134'
                    activateBackground='white'
                >
                    {this.renderTabItem()}
                </Tab>
            </View>
        )
    }
}

class CateItem extends Component {

    render() {
        const { name, onPress } = this.props;
        return (
            <TouchableOpacity
                style={{
                    padding: 8,
                    borderColor: 'rgba(120,120,120,0.3)',
                    borderWidth: 0.5,
                    margin: 5
                }}
                onPress={onPress}
            >
                <Text style={{ fontSize: 12, backgroundColor: "transparent" }}>{name}</Text>
            </TouchableOpacity>
        )
    }
}
