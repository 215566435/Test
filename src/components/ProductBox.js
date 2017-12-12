import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ScrollView, FlatList, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { height, width } from 'utils';


export class ProductBox extends Component {

    render() {
        const { isAud, Product } = this.props;
        const price = {
            p: isAud ? convertAud(Product) : '¥' + Product.ap.p.r,
            pi: isAud ? convertAud(Product) : '¥' + Product.ap.p.ri
        }

        return (
            <TouchableOpacity key={Product.i} onPress={this.props.onPress}>
                <View style={{ alignItems: 'center', height: 200, width: width / 2, padding: 10, borderWidth: 0.5, borderColor: "#f7f7f7" }} key={Product.id}>
                    <Image
                        key={Product.i}
                        source={{ uri: 'http://cdn2u.com' + Product.i + '?width=140&height=140&constrain=true&bgcolor=white' }}
                        style={{ height: 120, width: 150 }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={2} style={{ fontSize: 12, backgroundColor: "transparent" }}>{Product.n}</Text>
                    <Text style={{ color: '#f56a00', backgroundColor: "transparent" }}>{price.p ? price.p : '¥' + Product.ap.p.r}</Text>
                    <Text style={{ fontSize: 10, color: '#919191', backgroundColor: "transparent" }}>包邮价:{price.pi ? price.pi : '¥' + Product.ap.p.ri}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const convertAud = (Product) => {
    if (Product.ap.p.a) {
        return '$' + Product.ap.p.a
    } else {
        return '¥' + Product.ap.p.r
    }
}