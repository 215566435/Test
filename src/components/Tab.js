/**
 * 2017/10/30 方正 创建
 * Tab封装
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { EveryChildWidth } from '../util'

export class Tab extends Component {
    state = {
        activateTab: 0
    }

    onPress = (e, child, index) => {
        this.setState({
            activateTab: index
        })
        if (this.props.onTabChange) {
            this.props.onTabChange(index)
        }
    }
    static defalutProps = {
        height: null,
        scrollHead: false,
        radio: '100%'
    }

    render() {
        const { left, border, height, scrollHead, radio, headFontSize, activateSize, activateBackground, activateColor } = this.props;
        const TabHeadFlow = left ? 'column' : 'row';
        const BodyFlow = left ? 'row' : 'column';
        return (
            <View style={{ flexDirection: BodyFlow, height: height }}>
                <TabHead
                    tabItem={this.props.tabList}
                    onPress={this.onPress}
                    ActivateIndex={this.state.activateTab}
                    flexDirection={TabHeadFlow}
                    border={border}
                    scrollHead={scrollHead}
                    headFontSize={headFontSize}
                    activateSize={activateSize}
                    activateBackground={activateBackground}
                    activateColor={activateColor}
                />
                <ScrollView style={{ width: radio, height: '100%' }}>
                    {React.Children.map(
                        this.props.children,
                        (child, index) => {
                            if (this.state.activateTab === index) {
                                return child
                            }
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

Tab.propTypes = {
    tabList: PropTypes.array.isRequired,
    left: PropTypes.bool,
    border: PropTypes.bool
}



const borderHelper = {
    'column': { borderRightWidth: 0.5, borderRightColor: 'rgba(120,120,120,0.2)' },
    'row': { borderBottomWidth: 0.5, borderBottomColor: 'rgba(120,120,120,0.2)' }
}
export const TabHead = ({ tabItem, ActivateIndex = 0, onPress = () => { }, flexDirection = 'row', border, scrollHead, headFontSize, activateBackground, activateColor, activateSize }) => {
    const width = flexDirection === 'column' ? '100%' : EveryChildWidth(tabItem);
    const borderStyle = border ? borderHelper[flexDirection] : {};

    const baseStyle = { flexDirection: flexDirection, backgroundColor: "white" };
    const merge = StyleSheet.create({
        head: { ...baseStyle, ...borderStyle }
    })

    const child = React.Children.map(
        tabItem,
        (child, index) => {
            const activate = index === ActivateIndex ? true : false
            return <Item
                style={{ width: width }}
                activate={activate}
                title={child}
                onPress={(e) => onPress(e, child, index)}
                headFontSize={headFontSize}
                activateBackground={activateBackground}
                activateColor={activateColor}
                activateSize={activateSize}
            />
        }
    )
    if (scrollHead) {
        return (
            <ScrollView style={merge.head} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {child}
            </ScrollView>
        )
    }
    return (
        <View style={merge.head}>
            {child}
        </View>
    )
}



const Item = ({ style, title, activate, onPress, headFontSize = 15, activateBackground = '#f56a00', activateColor = 'white', activateSize = 15 }) => (
    <TouchableOpacity style={{ ...style }} onPress={onPress}>
        <Text
            style={{
                textAlign: 'center',
                fontSize: activate ? activateSize : headFontSize,
                padding: 8,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: activate ? activateBackground : 'white',
                color: activate ? activateColor : 'black',
            }}
        >
            {title}
        </Text>
    </TouchableOpacity>
)
