import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ScrollView, FlatList, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { height, width, header } from '../util';


export const BoxCore = (props) => {
    const { children, uri, name, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'white' }}>
            <View style={{
                alignItems: 'center',
                height: 200,
                width: width / 2,
                padding: 10,
                borderWidth: 0.5,
                borderColor: "#f7f7f7"
            }}
            >
                <Image
                    source={{ uri: 'http://cdn2u.com' + uri + '?width=140&height=140&constrain=true&bgcolor=white' }}
                    style={{ height: 120, width: 150 }}
                    resizeMode="contain"
                />
                <Text numberOfLines={2} style={{ fontSize: 12, backgroundColor: "transparent" }}>{name}</Text>
                {children}
            </View>
        </TouchableOpacity>
    )
}


export class ProductBox extends Component {

    render() {
        const { price, price2, uri, name, onPress } = this.props;
        return (
            <BoxCore uri={uri} name={name} onPress={onPress} >
                <Text style={{ color: '#f56a00', backgroundColor: "transparent" }}>{price}</Text>
                <Text style={{ fontSize: 10, color: '#919191', backgroundColor: "transparent" }}>包邮价:{price2}</Text>
            </BoxCore>
        )
    }
}