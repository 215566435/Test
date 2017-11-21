/**
 * 2017/11/02 方正 创建
 * tips 组件
 */
import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class Tips extends Component {
    state = {
        Scale: new Animated.Value(0),
        transformTop: new Animated.Value(0),
        transformRight: new Animated.Value(-40),
        translateY: new Animated.Value(-20)
    }
    componentDidMount() {
        Animated.timing(this.state.Scale, {
            toValue: 1,
            duration: 100
        }).start();
        Animated.timing(this.state.transformTop, {
            toValue: 48,
            duration: 100
        }).start();
        Animated.timing(this.state.transformRight, {
            toValue: 8,
            duration: 100
        }).start();
        Animated.timing(this.state.translateY, {
            toValue: 0,
            duration: 100
        }).start();
    }

    render() {
        const PannelWidth = 158
        return (
            <Animated.View style={{
                position: 'absolute',
                zIndex: 10,
                right: this.state.transformRight,
                top: this.state.transformTop,
                transform: [
                    { translateY: this.state.translateY },
                    { scale: this.state.Scale },
                    { perspective: 1000 },
                ]
            }}
            >
                <View style={{
                    width: 0,
                    height: 0,
                    borderWidth: 10,
                    left: PannelWidth - 30,
                    borderStyle: 'solid',
                    borderBottomColor: '#333',
                    borderLeftColor: 'rgba(0,0,0,0)',
                    borderRightColor: 'rgba(0,0,0,0)',
                    borderTopColor: 'rgba(0,0,0,0)'
                }}></View>
                <View
                    style={{
                        width: PannelWidth,
                        height: 128,
                        backgroundColor: '#333',
                        flexDirection: 'column',
                        borderRadius: 5
                    }}>
                    {React.Children.map(this.props.children, (child, index) => (
                        <View style={{ padding: 4, marginTop: 4 }} key={index}>{child}</View>
                    ))}
                </View>
            </Animated.View>
        )
    }
}
