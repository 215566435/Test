/**
 * 2017/10/30 方正 创建
 * 用于展示价格表
 */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView, FlatList, Dimensions, Image, Button, Platform, Switch, Animated, TouchableOpacity, InteractionManager, reque } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Spin } from 'component/Spin'
import { PageHeader } from 'component/PageHeader'
import { SearchBar } from 'component/SearchBar'
import { CustomTabBar } from 'component/CustomTabBar'
import { stateBarMargin, width } from 'utils'
import { PriceItem } from './Views/PriceItem';
import { PageWithTab } from 'HOC/PageWithTab';



class PriceList extends React.Component {
    static defaultProps = {
        item: []
    }
    state = {
        item: [],
        currentPage: 1,
        isPanelVisiable: false,
        isShowPicture: true,
        isAud: false
    }
    onShowPicture = () => {
        this.setState({
            isShowPicture: !this.state.isShowPicture
        })
    }
    onHeaderPress = () => {
        this.setState({
            isPanelVisiable: !this.state.isPanelVisiable
        })
    }
    onCartPress = () => {
        this.setState({
            isPanelVisiable: !this.state.isPanelVisiable
        })
        this.props.navigation.navigate('Cart');
    }
    componentDidMount() {
        this.props.FetchList();
    }
    componentWillUnmount() {
        this.props.clearPricelist()
    }

    itemClick = (item, index) => {
        this.props.currentID(item.id);
        this.props.navigation.navigate('DetailPage');
    }
    onSearch = (text) => {
        this.props.clearList && this.props.clearList();
        this.props.onEndEditing && this.props.onEndEditing(text);
    }

    renderItem = ({ item, index }) => {
        return (
            <PriceItem
                itemClick={this.itemClick}
                item={item}
                index={index}
                isShowPicture={this.state.isShowPicture}
                isAud={this.props.isAud}
                isDeliveryFree={this.props.isDeliveryFree}
            />
        )
    };

    renderSpin = () => <View
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            top: 0
        }} ><Spin />
    </View>

    _onload() {
        this.props.FetchList();
    }

    _keyExtractor = (item, index) => {
        return item.id;
    }
    renderFlatList = () => <FlatList
        style={{ zIndex: -10 }}
        data={this.props.item}
        renderItem={this.renderItem}
        onEndReached={
            () => this._onload()
        }
        initialNumToRender={6}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.1}
    />

    CustomTabBarPress = (e, child, index) => {
        this.props.navigation.goBack(null)
    }
    render() {
        return (
            <View style={{ height: '100%' }} >
                {this.state.isPanelVisiable ?
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }}
                        onPress={this.onHeaderPress}
                    >
                        <View></View>
                    </TouchableOpacity> :
                    null
                }
                <PriceListHeader title='澳购网'
                    onPress={this.onHeaderPress}
                    isPanelVisiable={this.state.isPanelVisiable}
                    onValueChange={this.props.onValueChange}
                    isShowPicture={this.state.isShowPicture}
                    onShowPicture={this.onShowPicture}
                    onEndEditing={this.onSearch}
                    isAud={this.props.isAud}
                    onCurrencyChange={this.props.changeCurrency}
                    isDeliveryFree={this.props.isDeliveryFree}
                    onDeliveryFree={this.props.onDeliveryFree}
                    onCartPress={this.onCartPress}
                />
                {this.renderFlatList()}
                {this.props.onPost ? this.renderSpin() : null}
            </View>
        )
    }
}

const wrapper = PageWithTab(PriceList, '返回')


/**
 * 
 * @param {*} leftBtnPress:左边按钮点击
 * @param title:标题
 */

class PriceListHeader extends React.Component {


    render() {
        const {
            isPanelVisiable,
            onPress,
            onCurrencyChange,
            isShowPicture,
            onShowPicture,
            isAud,
            onDeliveryFree,
            isDeliveryFree,
            onCartPress
        } = this.props

        return (
            <View >
                <PageHeader style={{ backgroundColor: '#f46e65' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", top: Platform.OS === 'ios' ? 10 : 0 }}>
                        <SearchBar placeholder='搜索报价' onEndEditing={this.props.onEndEditing} />
                        <TouchableOpacity style={{ right: 4, width: 40 }} onPress={onPress}>
                            <SimpleLineIcons name='options' size={26} color='#fcdbd9' style={{ backgroundColor: "transparent" }} />
                        </TouchableOpacity>
                    </View>
                </PageHeader>
                {isPanelVisiable ?
                    (<SmallPanel >
                        <SwitchWithTitle value={isShowPicture} title='显示图片' onValueChange={onShowPicture} />
                        <SwitchWithTitle title='显示澳币' onValueChange={onCurrencyChange} value={isAud} />
                        <SwitchWithTitle title='显示包邮参考价' onValueChange={onDeliveryFree} value={isDeliveryFree} />
                        <TouchableOpacity onPress={onCartPress}>
                            <Text style={{ textAlign: "center", color: 'white', fontSize: 14, backgroundColor: "transparent" }}>购物车</Text>
                        </TouchableOpacity>
                    </SmallPanel>) :
                    null
                }
            </View>
        )
    }
}


const SwitchWithTitle = ({ title, tintColor = 'white', ...otherProps }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: tintColor, backgroundColor: "transparent" }}>{title}</Text>
            <Switch {...otherProps} onTintColor='#f46e65' />
        </View>
    )
}

class SmallPanel extends React.Component {
    state = {
        Scale: new Animated.Value(0),
        transformTop: new Animated.Value(0),
        transformRight: new Animated.Value(-40),
        translateY: new Animated.Value(-20)
    }
    componentDidMount() {
        Animated.timing(this.state.Scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();
        Animated.timing(this.state.translateY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    render() {
        const PannelWidth = 158
        return (
            <Animated.View style={{
                position: 'absolute',
                zIndex: 10,
                right: 8,
                top: 48,
                transform: [
                    { translateY: this.state.translateY },
                    { scale: this.state.Scale },
                    { perspective: 1000 },
                ]
            }}
            >
                <View style={{
                    width: 0,
                    height: 0,
                    borderWidth: 10,
                    left: PannelWidth - 30,
                    borderStyle: 'solid',
                    borderBottomColor: '#333',
                    borderLeftColor: 'rgba(0,0,0,0)',
                    borderRightColor: 'rgba(0,0,0,0)',
                    borderTopColor: 'rgba(0,0,0,0)'
                }}></View>
                <View
                    style={{
                        width: PannelWidth,
                        height: 170,
                        backgroundColor: '#333',
                        flexDirection: 'column',
                        borderRadius: 5
                    }}>
                    {React.Children.map(this.props.children, (child, index) => (
                        <View style={{ padding: 4, marginTop: 4 }} key={index}>{child}</View>
                    ))}
                </View>
            </Animated.View>
        )
    }
}


const mapProps = (state) => {
    return {
        item: state.PriceList.FlatList,
        onPost: state.PriceList.onPost,
        isAud: state.PriceList.isAud,
        isDeliveryFree: state.PriceList.isDeliveryFree
    }
}

const mapDispatch = (dispatch) => {
    return {
        FetchList: () => dispatch({ type: 'FetchList' }),
        onEndEditing: (inputValue) => { dispatch({ type: "Search", inputValue: inputValue }) },
        clearList: () => dispatch({ type: 'clearList' }),
        currentID: (id) => dispatch({ type: 'setID', id: id }),
        changeCurrency: () => dispatch({ type: 'changeCurrency' }),
        onDeliveryFree: () => dispatch({ type: 'DeliveryFree' }),
        clearPricelist: () => dispatch({ type: 'clearPricelist' })
    }
}


export default connect(mapProps, mapDispatch)(wrapper)