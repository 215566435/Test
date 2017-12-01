import React, { Component } from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';

import { Stepper } from '../../../components/Stepper'
import { header } from '../../../util';
const { height, width } = Dimensions.get('window')

const stockStatus = {
    NotForSale: '已下架',
    OutStock: '无货',
    ByStock: '按库存',
    ByBook: '需预订',
    InStock: '有货'
}
const stockStatusColor = {
    NotForSale: "#919191",
    OutStock: "#f04134",
    ByStock: '#7265e6',
    ByBook: '#f7629e',
    InStock: '#108ee9'
}

/**
 * 一个函数用于判断是什么币种
 */
const PriceSelector = (price) => {
    return price.itemPrice.currency === 'RMB' ? `¥${price.itemPrice.price}` : `$${price.itemPrice.price}`;
}
/**
 * 每个单元的高度
 */
const rowHeight = 160;

/**
 * caritem的核心
 */
class CartItemCore extends Component {
    modifyItem = (value) => {
        const { item } = this.props;
        this.props.modifyItem(value, item.id);
    }

    render() {
        const { item, render } = this.props;
        const url = 'http://cdn2u.com' + item.image + `?width=${150}` + `&height=${150}` + `&constrain=${true}` + `&bgcolor=white`;
        const Price = PriceSelector(item.price)
        return (
            <View>
                <View
                    style={{
                        backgroundColor: 'white',
                        marginTop: 0.5,
                        height: rowHeight,
                        width: width,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <Image
                        source={{
                            uri: url,
                            headers: header.get()
                        }}
                        style={{
                            width: 100,
                            height: 100,
                            borderWidth: 0.5,
                            borderColor: 'rgba(120,120,120,0.3)',
                            resizeMode: 'contain',
                            marginLeft: 10,
                        }}
                    />
                    <View style={{ width: '65%' }}>
                        <Text style={{ padding: 10, backgroundColor: "transparent" }} adjustsFontSizeToFit numberOfLines={4}>{item.name}</Text>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{ paddingLeft: 10, backgroundColor: "transparent", color: stockStatusColor[item.status] }} adjustsFontSizeToFit numberOfLines={4}>
                                {stockStatus[item.status]}
                            </Text>
                            {render ? render() : null}
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
                            <Text style={{ marginRight: 10, fontSize: 13, color: '#f78e3d', backgroundColor: "transparent" }}>
                                {Price}
                            </Text>
                            <Stepper tintColor="#f46e65" value={item.qty} onChange={this.modifyItem} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
/**
 * 安卓版本
 */
class CartItemAndroid extends Component {
    deleteItem = () => {
        const { item } = this.props;
        this.props.deleteItem({
            qty: item.qty,
            id: item.id
        })
    }

    render() {
        const { item } = this.props;
        return (
            <View>
                <CartItemCore {...this.props} render={
                    () => {
                        return (
                            <TouchableOpacity onPress={this.deleteItem}>
                                <Text style={{ paddingLeft: 10, backgroundColor: "transparent", color: "#f04134" }}>删除</Text>
                            </TouchableOpacity>
                        )
                    }
                } />
            </View>

        )
    }
}
/**
 * ios版本
 */
class CartItemIOS extends Component {
    render() {
        const { item } = this.props;
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
            >
                <CartItemCore {...this.props} />
                <TouchableOpacity
                    style={{ height: rowHeight, width: 100, backgroundColor: '#f04134', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.props.deleteItem({
                        qty: item.qty,
                        id: item.id
                    })}
                >
                    <Text style={{ fontSize: 18, color: '#fff3cf', backgroundColor: "transparent" }}>
                        删除
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export const CartItem = Platform.OS === 'ios' ? CartItemIOS : CartItemAndroid;