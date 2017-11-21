import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Spin } from '../../../components/Spin';
import { Stepper } from '../../../components/Stepper';


export class Title extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.title !== nextProps.title
    }
    render() {
        const { title } = this.props
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 10
                }}
            >
                <Text
                    style={{
                        fontSize: 16
                    }}
                >
                    {title}
                </Text>
            </View>
        )
    }
}
