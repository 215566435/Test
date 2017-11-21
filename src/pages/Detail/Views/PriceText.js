import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Spin } from '../../../components/Spin';
import { Stepper } from '../../../components/Stepper';


export class PriceText extends Component {
    render() {
        const { price } = this.props;
        return (
            <View style={{ backgroundColor: 'white', padding: 10, marginTop: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, color: '#f56a00' }}>$ {price.aud[0]}</Text>
                    <Text style={{ fontSize: 14, color: '#919191' }}>包邮参考价$ {price.aud[1]}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, color: '#f56a00' }}>¥ {price.rmb[0]}</Text>
                    <Text style={{ fontSize: 14, color: '#919191' }}>包邮参考价¥ {price.rmb[1]}</Text>
                </View>
            </View>
        )
    }
}