/**
* 2017/10/30 方正 创建
* 用于页面的自定义头部
* @param {*} leftBtnPress:左边按钮点击
* @param title:标题
*/
import { stateBarMargin } from '../util'
import React from 'react'
import { View, StyleSheet } from 'react-native';

export class PageHeader extends React.Component {

    render() {
        const { style } = this.props
        const rawStyle = { height: stateBarMargin(43), borderBottomWidth: 0.5, borderBottomColor: 'rgba(120,120,120,0.3)', justifyContent: 'center' }
        const merge = StyleSheet.create({ merge: { ...rawStyle, ...style } })
        return (
            <View style={merge.merge}>
                {this.props.children}
            </View>
        )
    }
}