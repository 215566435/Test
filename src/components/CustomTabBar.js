/**
 * 2017/10/30 方正 创建
 * 自定义tabbar
 * 高度44
 */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { EveryChildWidth } from '../util'

export class CustomTabBar extends Component {
    static defaultProps = {
        shouldUpdate: false
    }

    shouldComponentUpdate() {
        let shouldUpdate = this.props.shouldUpdate === void 666 ? false : this.props.shouldUpdate;
        return false || shouldUpdate;
    }
    static defaultProps = {
        disable: false
    }

    renderChild = (child, index) => {
        const { onPress, disable } = this.props
        const everyChildWidth = EveryChildWidth(this.props.children)
        let backgroundColor = this.props.childColor ? (this.props.childColor(child, index) || '') : 'white'

        return (
            <TouchableOpacity
                disabled={disable}
                onPress={(e) => { onPress && onPress(e, child, index) }}
                activeOpacity={0.4}
                style={{ justifyContent: 'center', alignItems: 'center', width: `${everyChildWidth}`, backgroundColor: backgroundColor }}
            >
                <View >
                    {child}
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{ height: 44, borderTopWidth: 0.5, borderTopColor: 'rgba(120,120,120,0.4)', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                {React.Children.map(this.props.children, this.renderChild)}
            </View>
        );
    };
}