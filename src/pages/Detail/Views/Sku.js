import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export class Sku extends Component {
    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        console.log('sku渲染')
        const { onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#f04134', backgroundColor: "transparent" }}>查看库存和型号</Text>
                    <View
                        style={{
                            borderRightWidth: 2,
                            borderBottomWidth: 2,
                            height: 10,
                            width: 10,
                            borderColor: '#f04134',
                            transform: [
                                { rotateZ: '-45deg' }
                            ]
                        }}>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}