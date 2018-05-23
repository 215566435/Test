/**
 * 购物车的逻辑
 * 建议使用 dva 模式封装
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal, Platform } from 'react-native'
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { CustomTabBar } from '../../components/CustomTabBar';

import { Tips } from '../../components/Tips';
import { Stepper } from '../../components/Stepper';
import { stateBarMargin } from '../../util';


import { Header } from './Views/Header';
import { CheckBox } from './Views/CheckBox';
import { CartItem } from './Views/CartItem';

const { height, width } = Dimensions.get('window')

/**
 * 一个函数用于判断是什么币种
 */
const PriceSelector = (price) => {
    return price.itemPrice.currency === 'RMB' ? `¥${price.itemPrice.price}` : `$${price.itemPrice.price}`;
}

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


const tabColor = ['white', '#f04134']

class Cart extends Component {
    state = {
        isPanelShow: false,
        tmp: false,
        settling: false
    }
    componentDidMount() {
        this.props.FetchCart();
    }

    goBack = () => {
        this.props.navigation.goBack()
    }
    option = () => {
        this.setState({
            isPanelShow: !this.state.isPanelShow
        })
    }
    _keyExtractor = (item, index) => {
        return item.id;
    }
    onTouchStart = () => {

    }
    onPress = (e, child, index) => {
        console.log(index)
        if (index === 1) {//结算
            this.props.navigation.navigate('Settle_remake')
            // this.props.checkOut(this);
        }
    }
    renderTabBar = () => {
        const total = this.props.total;
        if (total === void 233) {
            return null;
        }
        return (
            <CustomTabBar childColor={(child, index) => tabColor[index]} onPress={this.onPress} shouldUpdate={true}>
                <View>
                    <Text style={{ backgroundColor: "transparent" }}>商品总额</Text>
                </View>
                <View>
                    <Text style={{ color: 'white', backgroundColor: "transparent" }}>{`结算(${(this.props.isAud ? '$' : "¥") + total})`}</Text>
                </View>
            </CustomTabBar>
        )
    }
    modifyItem = (value, id) => {
        this.props.modifyItem({ value, id })
    }


    renderItem = (child) => {
        const item = child.item;
        const url = 'http://cdn2u.com' + item.image + `?width=${150}` + `&height=${150}` + `&constrain=${true}` + `&bgcolor=white`;
        const Price = PriceSelector(item.price)
        const rowHeight = 160;//每个单元的高度
        return (
            <CartItem item={item} modifyItem={this.modifyItem} deleteItem={this.props.deleteItem} />
        )
    }

    renderFlatList = () => (
        <FlatList
            style={{ zIndex: -10 }}
            data={this.props.items}
            renderItem={this.renderItem}
            refreshing={false}
            initialNumToRender={6}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.1}
        />
    )

    render() {
        const props = this.props;
        return (
            <View>
                <Header {...props} />
                <View style={{ height: height - (43/* 头的宽度*/ + stateBarMargin(0)/* 状态栏高度*/ + 44/* 底部状态栏*/) - (Platform.OS === 'ios' ? 0 : 24) }} >
                    {/* {this.props.message ? <Text style={{ textAlign: "center", color: 'white', backgroundColor: '#ff4d4f' }}>{this.props.message}</Text> : null} */}
                    {this.renderFlatList()}
                </View>
                {this.renderTabBar()}
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        items: state.Cart.items,
        total: state.Cart.total,
        isAud: state.PriceList.isAud,
        ...state.Cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        FetchCart: () => dispatch({ type: 'fetchCart' }),
        modifyItem: (item) => { dispatch({ type: 'modify', item: item }) },
        deleteItem: (item) => { dispatch({ type: 'delete', item: item }) },
        checkOut: (instance) => { dispatch({ type: 'checkOut', instance: instance }) },
        onValueChange: () => dispatch({ type: 'CartChangeCurrency' })
    }
}

export default connect(mapState, mapDispatch)(Cart)


