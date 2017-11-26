/**
 * 2017/10/30 方正 创建
 * 搜索栏封装
 */
import React, { Component } from 'react';
import { Animated, View, Text, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2

export class Spin extends Component {
    state = {
        rotate: new Animated.Value(0)
    }

    componentDidMount() {
        this.Spinning()
    }

    Spinning = () => {
        const speed = this.props.speed || 500
        this.state.rotate.setValue(0);
        Animated.timing(this.state.rotate, {
            toValue: 1,
            duration: speed,
            useNativeDriver: true
        }).start(this.Spinning);
    }

    render() {
        const spinSize = this.props.size || 20;
        return <Animated.View
            style={{
                height: spinSize,
                width: spinSize,
                borderLeftWidth: 2,
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderRightWidth: 2,
                borderRightColor: '#f04134',
                borderRadius: spinSize / 2,
                borderColor: this.props.color || '#fcdbd9',
                transform: [
                    {
                        rotate: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    },
                    { perspective: 1000 }
                ]
            }}
        />
    }
}

/**
 * 一个全屏的Spin
 * @param {string} text
 */
export const SpinScreen = ({ text = 'loading...' }) => {
    return (
        <View style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center", position: 'absolute' }}>
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
                <Text style={{ color: '#404040' }}>{text}</Text>
            </View>
        </View>
    )
}