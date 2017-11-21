/**
 * 2017/10/30 方正 创建
 * 用于商品展示页面
 */
import React, { Component, PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Platform, Switch, Animated, TouchableOpacity, FlatList, Modal, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14

import { Spin } from '../../components/Spin'
import { Stepper } from '../../components/Stepper'
import { CustomTabBar } from '../../components/CustomTabBar'
import { Popup } from '../../components/Popup'
import { Button } from '../../components/Button'


import { Pop } from './Views/Popup';

import { Body } from './Views/Body';

import { stateBarMargin } from '../../util'

const { height, width } = Dimensions.get('window')



class DetailPage extends Component {
    state = {
        isSkuSelectShow: false,
        property: null,
        share: false
    }
    static defaultProps = {
        price: '',
        price2: '',
        addCart: false
    }
    componentDidMount() {
        this.props.fetchGoods();
    }
    /**
     * 下方TabBar按钮的点击
     */
    tabOnPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack();
            this.props.clear();
        }
        if (index === 1) {
            console.log(this.props.contentImg)
            this.setState({
                share: true
            })
            // ActionSheetIOS.showShareActionSheetWithOptions({
            //     url: [this.props.contentImg[0].url]
            // }, () => {

            // }, () => {
            //     console.log('分享成功')
            // })
        }
        if (index === 2) {
            this.props.navigation.navigate('Cart');
        }
        if (index === 3) {
            this.onSkuPress();
        }
    }

    onSkuPress = () => {
        this.setState({
            isSkuSelectShow: true
        })
    }

    childColor = (child, index) => {
        const color = ["white", "#f04134"];
        return color[index];
    }
    PopupTabBarPress = (e, child, index) => {
        if (index === 0) {//返回
            this.setState({
                isSkuSelectShow: false
            })
        } else if (index === 1) {//加入购物车
            if (!this.property) return;
            const postObject = {
                id: this.property.id,
                qty: this.currentQty || 1,
                selected: true,
                DetailPageInstance: this
            };
            this.props.addCartItem(postObject);
            this.setState({
                isSkuSelectShow: false
            })
        }
    }
    onPopChange = (property) => {
        if (typeof property === 'number') {
            this.currentQty = property
        } else {
            this.property = property
        }
    }

    renderPopup = () => {
        const PopupTabBar = () => (
            <View>
                <CustomTabBar disable={true} childColor={() => ('white')} onPress={this.PopupTabBarPress}>
                    <View><Text>购买数量</Text></View>
                    <Stepper onChange={this.onPopChange} />
                </CustomTabBar>
                <CustomTabBar childColor={this.childColor} onPress={this.PopupTabBarPress}>
                    <View><Text>返回</Text></View>
                    <View><Text style={{ color: 'white' }}>加入购物车</Text></View>
                </CustomTabBar>
            </View>
        )
        return (
            <Popup
                isPop={this.state.isSkuSelectShow}
                size={400}
                close={this.onSkuClose}
                TabBar={PopupTabBar()}
            >
                <Pop
                    title={this.props.title}
                    uri={this.props.CarouselImage[0]}
                    property={this.props.property}
                    pt={this.props.pt}
                    onChange={this.onPopChange}
                />
            </Popup>
        )
    }

    render() {
        const color = ['white', '#00a854', '#f56a00', '#f04134']
        const btns = ['一键分享', '购物车', '加入购物车']
        const stateBar = Platform.OS === 'ios' ? 22 : 0
        const actualHeight = height - 44 - stateBar
        const { price, price2, addCartState } = this.props;
        return (
            <View>
                {this.renderPopup()}
                <Modal
                    visible={this.state.share}
                    animationType="slide"
                >
                    <ScrollView style={{ height: height - 44 }}>
                        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                            {this.props.contentImg.map((item) => {
                                return (
                                    <TouchableOpacity>
                                        <Image
                                            key={item.url}
                                            source={{ uri: item.url }}
                                            style={{
                                                height: 150,
                                                width: width / 3
                                            }}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <CustomTabBar >
                        <Text>返回</Text>
                        <Text style={{ color: 'white' }}>分享</Text>
                    </CustomTabBar>
                </Modal>
                <View
                    style={{
                        height: height - 44,
                        backgroundColor: "#eee",
                    }}
                >
                    <Body
                        title={this.props.title}
                        price={{
                            aud: [price.a, price.ai],
                            rmb: [price.r, price.ri]
                        }}
                        onSkuPress={this.onSkuPress}
                        CarouselImage={this.props.CarouselImage}
                        contentImg={this.props.contentImg}
                        content={this.props.content}
                    />
                </View>
                <CustomTabBar
                    childColor={(child, index) => color[index]}
                    onPress={this.tabOnPress}
                >
                    <Ionicons name='ios-arrow-dropleft-outline' size={34} />
                    {btns.map((btn, index) => <Text key={index} style={{ color: 'white' }}>{btn}</Text>)}
                </CustomTabBar>
            </View>
        )
    }
}

const wrapperSpinner = () => (
    <View style={{ height: actualHeight, alignItems: 'center', justifyContent: 'center', flex: 1 }} ><Spin size={26} /></View>
)

const ImageHelper = ({ Url, width, height, mode, bgcolor }) => {
    return 'http://cdn2u.com' + Url + `?width=${width}` + `&height=${height}` + `&mode=${mode}` + `&bgcolor=${bgcolor}`
}

const contentSelector = (textContent) => {

    let newContent = '';
    textContent.split('\n').forEach((text, index) => {
        if (index === 0) return;
        if (text === '【广告文案】：点击【一键分享】，广告文案已自动复制，粘贴即可分享：') return;
        newContent += (text + '\n');
    })
    return newContent;
}

const mapState = (state) => {
    const detail = state.Detail;
    if (!detail.page) return {
        title: null,
        CarouselImage: [],
        contentImg: []
    }
    const ImgList = detail.page.is.map((Url) => {
        return ImageHelper({
            Url: Url,
            width: 300,
            height: 300,
            mode: 'crop',
            bgcolor: 'white'
        })
    })
    const contentImgList = detail.contentImg.map((item) => {
        return {
            url: 'http://cdn2u.com' + item.url + `?width=${750}` + `&constrain=${true}` + `&bgcolor=white`,
            height: item.height
        }
    })
    return {
        title: detail.page.n,
        CarouselImage: ImgList,
        contentImg: contentImgList,
        property: detail.page.ss,
        pt: detail.page.pt,
        content: contentSelector(detail.page.c),
        price: detail.page.ap.p,
        price2: detail.page.ap.p2
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchGoods: () => dispatch({ type: 'fetchGoods' }),
        clear: () => { dispatch({ type: 'clearDetail' }) },
        addCartItem: (item) => { dispatch({ type: 'addCartItem', item: item }) }
    }
}

export default connect(mapState, mapDispatch)(DetailPage)