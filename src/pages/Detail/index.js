/**
 * 2017/10/30 方正 创建
 * 用于商品展示页面
 */
import React, { Component, PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Platform, Switch, Animated, TouchableOpacity, FlatList, Modal, ActionSheetIOS, ImageBackground, Clipboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { sharePictures } from 'react-native-share-local'

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
        share: false,
        contentImg: [],
        loading: false
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
            const newImage = this.props.contentImg.map((item) => {
                item.choose = false;
                return item
            })
            this.setState({
                share: true,
                contentImg: newImage
            })
        }
        if (index === 2) {
            this.props.navigation.navigate('Cart');
        }
        if (index === 3) {
            this.onSkuPress();
        }
    }

    shareTabPress = (e, child, index) => {
        if (index === 0) {
            this.setState({
                share: false
            })
        } else if (index === 1) {
            const filtered = this.state.contentImg.filter((item) => {
                if (item.choose) {
                    return item
                }
            })
            const urlMap = filtered.map((item) => {
                return item.url
            })

            if (urlMap.length === 0) {
                Alert.alert(
                    '分享失败',
                    '请选择至少一张图片进行分享',
                    [
                        { text: '返回', style: 'cancel' },
                    ],
                    { cancelable: false }
                )
                return;
            }

            Clipboard.setString(this.props.shareText)
            if (Platform.OS === 'ios') {
                this.setState({
                    loading: true
                })
                ActionSheetIOS.showShareActionSheetWithOptions({
                    url: urlMap
                }, () => {
                    this.setState({
                        loading: false
                    })
                }, () => {
                    this.setState({
                        loading: false
                    })
                })
            } else {
                sharePictures({
                    winTitle: "窗口标题",
                    subject: "主题",
                    imagesUrl: urlMap,
                    text: "测试一下朋友圈分享",
                    //component:["com.tencent.mobileqq","com.tencent.mobileqq.activity.JumpActivity"],
                    component: ["com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI", "com.tencent.mm.ui.tools.ShareImgUI"],
                    callback: (error) => {
                        alert("success")
                    }
                })
            }
        }
    }

    chooseImage = (item) => {
        this.setState({
            contentImg: this.state.contentImg.map((i) => {
                if (i.url === item.url) {
                    i.choose = !i.choose
                }
                return i
            })
        })
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
                    <View><Text style={{ backgroundColor: "transparent" }}>购买数量</Text></View>
                    <Stepper onChange={this.onPopChange} />
                </CustomTabBar>
                <CustomTabBar childColor={this.childColor} onPress={this.PopupTabBarPress}>
                    <View><Text style={{ backgroundColor: "transparent" }}>返回</Text></View>
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
                            {this.state.contentImg.map((item) => {
                                return (
                                    <TouchableOpacity key={item.url} onPress={() => this.chooseImage(item)}>
                                        <ImageBackground
                                            style={{ justifyContent: "center", alignItems: "center" }}
                                            key={item.url}
                                            source={{ uri: item.url }}
                                            style={{
                                                height: 150,
                                                width: width / 3
                                            }}
                                        >
                                            {item.choose ? <Ionicons name='md-checkmark-circle' size={25} color='#f56a00' style={{ backgroundColor: "rgba(0,0,0,0)", position: "absolute" }} /> : null}
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        {this.props.shareText === '' ? null : (<View style={{ padding: 10, marginTop: 10 }}>
                            <Text style={{ color: '#108ee9', backgroundColor: "transparent" }}>分享图片后，以下文案将自动复制到手机剪切板中</Text>
                            <Text style={{ backgroundColor: "transparent" }}>{this.props.shareText}</Text>
                        </View>)}
                        {this.state.loading ? <View style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center", position: 'absolute' }}>
                            <View style={{
                                height: 150,
                                width: 150,
                                backgroundColor: "white",
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 0.5,
                                borderColor: "#fccca7"
                            }}>
                                <Spin />
                                <Text style={{ color: '#404040' }}>{'分享准备中...'}</Text>
                            </View>
                        </View> : null}
                    </ScrollView>
                    <CustomTabBar
                        onPress={this.shareTabPress}
                        childColor={(child, index) => {
                            const color = ['white', '#f56a00']
                            return color[index]
                        }}
                        shouldUpdate={true}
                    >
                        <Text style={{ backgroundColor: "transparent" }}>返回</Text>
                        <Text style={{ color: "white", backgroundColor: "transparent" }}>分享</Text>

                    </CustomTabBar>
                </Modal>
                <View
                    style={{
                        height: height - 44 - (Platform.OS === 'ios' ? 0 : 24),
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
                        shareText={this.props.shareText}
                    />
                </View>
                <CustomTabBar
                    childColor={(child, index) => color[index]}
                    onPress={this.tabOnPress}
                >
                    <Ionicons name='ios-arrow-dropleft-outline' size={34} style={{ backgroundColor: "transparent" }} />
                    {btns.map((btn, index) => <Text key={index} style={{ color: 'white', backgroundColor: "transparent" }}>{btn}</Text>)}
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
        price2: detail.page.ap.p2,
        shareText: detail.page.st
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