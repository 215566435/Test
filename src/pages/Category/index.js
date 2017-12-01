/**
 *  2017/10/31 方正 创建
 * 商品分类
 */

import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { CustomTabBar } from '../../components/CustomTabBar'

import { Body } from './Views/body'

class Category extends Component {
    state = {
        headActivateIndex: 0
    }
    componentDidMount() {
        this.props.fetchCategory()
    }

    onheadPress = (e, child, index) => {
    }
    navigationTabBarPress = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        return (
            <View style={{ marginTop: Platform.OS === 'ios' ? 22 : 0, backgroundColor: "white" }}>
                <Body
                    tabList={this.props.tabList}
                    catePress={(text) => this.props.catePress(text, this)}
                    onHeadPress={this.props.onHeadPress}
                    headerCateID={this.props.headerCateID}
                />
                <CustomTabBar onPress={this.navigationTabBarPress}>
                    <Text>返回</Text>
                </CustomTabBar>
            </View>
        )
    }
}

function mapState(state) {
    return {
        tabList: state.Category.tabList,
        headerCateID: state.Category.headerCateID
    }
}

function mapProps(dispatch) {
    return {
        fetchCategory: () => dispatch({ type: "fetchCategory" }),
        catePress: (text, that) => dispatch({ type: 'catePress', text: text, instance: that }),
        onHeadPress: (e, child, index) => dispatch({ type: 'ChangeHeader', id: index })
    }
}

export default connect(mapState, mapProps)(Category)


