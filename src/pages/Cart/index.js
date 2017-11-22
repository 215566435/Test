/**
 * 2017/11/02 方正创建
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal } from 'react-native'
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { CustomTabBar } from '../../components/CustomTabBar';

import { Tips } from '../../components/Tips';
import { Stepper } from '../../components/Stepper';
import { stateBarMargin } from '../../util';

import SettlePage from '../Settle'

import { Header } from './Views/Header';
import { CheckBox } from './Views/CheckBox';


const { height, width } = Dimensions.get('window')

const PriceSelector = (price) => {
    return price.itemPrice.currency === 'RMB' ? `¥${price.itemPrice.price}` : `$${price.itemPrice.price}`;
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
            // this.props.navigation.navigate('Settle')
            this.props.checkOut(this);
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
                    <Text>商品总额</Text>
                </View>
                <View>
                    <Text style={{ color: 'white' }}>{`结算(${(this.props.isAud ? '$' : "¥") + total})`}</Text>
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

        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled bounces={false} >
                <View
                    style={{
                        backgroundColor: 'white',
                        marginTop: 0.5,
                        height: 120,
                        width: width,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <Image
                        source={{ uri: url }}
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
                        <Text style={{ padding: 10 }} adjustsFontSizeToFit numberOfLines={4}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center' }}>
                            <Text style={{ marginRight: 10, fontSize: 13, color: '#f78e3d' }}>{Price}</Text>
                            <Stepper tintColor="#f46e65" value={item.qty} onChange={(value) => this.modifyItem(value, item.id)} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ height: 120, width: 100, backgroundColor: '#f04134', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        this.props.deleteItem({
                            qty: item.qty,
                            id: item.id
                        })
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff3cf'
                        }}
                    >
                        删除
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
                <View style={{ height: height - (43/* 头的宽度*/ + stateBarMargin(0)/* 状态栏高度*/ + 44/* 底部状态栏*/) }} >
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
        isAud: state.PriceList.isAud
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


