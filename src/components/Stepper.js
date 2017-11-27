/**
 * 2017/11/01 方正 创建
 * 自定义stepper
 */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; // 4.4.2

export class Stepper extends Component {
    state = {
        value: 1
    }
    static defaultProps = {
        limit: [1, 10]
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }
    plus = () => {
        this.setState({
            value: Math.min(this.state.value + 1, this.props.limit[1])
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.value)
        })
    }
    minus = () => {
        this.setState({
            value: Math.max(this.state.value - 1, this.props.limit[0])
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.value)
        })
    }
    componentDidMount() {
        if (this.props.value !== void 666) {
            this.setState({
                value: this.props.value
            })
        }
    }

    render() {
        const tintColor = this.props.tintColor || '#f5f5f5';
        return (
            <View style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={this.minus}
                    style={{
                        marginRight: 0.5,
                        width: 40,
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5'
                    }}>
                    <Entypo
                        name="minus"
                        color='#919191'
                        size={27}
                        style={{ backgroundColor: "transparent" }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        width: 40,
                        padding: 5,
                        backgroundColor: tintColor,
                        textAlign: "center",
                        backgroundColor: "transparent"
                    }}
                >
                    {this.state.value + ''}
                </Text>
                <TouchableOpacity
                    onPress={this.plus}
                    style={{
                        marginLeft: 0.5,
                        width: 40,
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5'
                    }}>
                    <Entypo name="plus" color='#919191' size={27} style={{ backgroundColor: "transparent" }} />
                </TouchableOpacity>
            </View>
        )
    }
}

