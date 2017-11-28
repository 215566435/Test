import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker, TouchableOpacity, Image } from 'react-native';
import { hostName } from '../util';

/**
 * sdasda
 */
export class Code extends React.Component {
    state = {
        time: Date.now() + Math.random() * 100,
        show: true
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.time !== this.state.time
    }

    onCodeChange = () => {
        this.setState({
            time: Date.now() + Math.random() * 100
        })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <TouchableOpacity onPress={this.onCodeChange} style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }} >
                    {this.state.show ? (<Image
                        source={{
                            uri: `http://${hostName}/api/verify?t=`
                                + this.state.time
                        }}
                        style={{
                            width: 150,
                            height: 80
                        }}
                        resizeMode='contain'
                    />)
                        : null}
                    <Text style={{ backgroundColor: "transparent" }}>点击刷新</Text>
                </TouchableOpacity>
            </View>
        )
    }
}