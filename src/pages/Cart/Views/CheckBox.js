

import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native'
export class CheckBox extends Component {
    state = {
        scale: new Animated.Value(0)
    }
    static defalutProps = {
        isChecked: true
    }
    componentWillReceiveProps(nextProps) {
        const scalling = nextProps.isChecked ? 1 : 0;
        Animated.timing(this.state.scale, {
            toValue: scalling,
            duration: 200
        }).start()
    }
    render() {
        const size = this.props.size / 30 || 30
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    borderRadius: size / 2,
                    height: size,
                    width: size,
                    borderWidth: 0.5,
                    marginLeft: 10,
                    backgroundColor: this.props.isChecked ? '#f46e65' : 'white',
                    borderColor: 'rgba(120,120,120,0.3)'
                }}
            >
                <Animated.View
                    style={{
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        height: 10,
                        width: 15,
                        left: 7.5,
                        top: 7.5,
                        borderColor: 'white',
                        transform: [
                            { scale: this.state.scale },
                            { rotateZ: '-45deg' }
                        ]
                    }}
                ></Animated.View>
            </TouchableOpacity>
        )
    }
}
