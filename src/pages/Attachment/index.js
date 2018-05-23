/**
 * 订单附件的文件
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform,
    Share,
    ActionSheetIOS,
    Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons' // 4.4.2

import * as WeChat from 'react-native-wechat'
import { sharePictures } from 'react-native-share-local'
import { Spin } from '../../components/Spin'
import { Url, header, height, width, MarginTopIfNeeded } from '../../util'

import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { Cells } from '../GoodState/Views/Cells'

const alert = msg => {
    Alert.alert('分享失败', msg, [{ text: '返回', style: 'cancel' }], {
        cancelable: false
    })
}

class Attachment extends Component {
    state = {
        images: [],
        loading: false
    }
    componentWillUnmount() {
        // this.props.clearAttach()
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'fetchAttachment'
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.image) return

        const newImages = nextProps.image.map((img, index) => {
            if (index === 0) {
                img.choose = true
            } else {
                img.choose = false
            }
            return img
        })

        this.setState({
            images: newImages
        })
    }
    onShare = url => {
        let urlArray = []

        try {
            for (let i in this.state.images) {
                if (this.state.images[i].choose) {
                    urlArray.push(
                        'http://cdn2u.com' +
                            this.state.images[i].file +
                            '?width=500&height=500&constrain=true&bgcolor=white'
                    )
                }
            }
        } catch (e) {}

        if (urlArray.length === 0) {
            alert('请选择至少一张图片进行分享')
            return
        }
        this.setState({
            loading: true
        })

        this.props.dispatch({
            type: 'MarkAsSentToBuyer'
        })

        try {
            if (Platform.OS === 'ios') {
                ActionSheetIOS.showShareActionSheetWithOptions(
                    {
                        url: urlArray
                    },
                    () => {},
                    () => {
                        this.setState({
                            loading: false
                        })
                    }
                )
            } else {
                sharePictures({
                    winTitle: '窗口标题',
                    subject: '主题',
                    imagesUrl: urlArray,
                    text: '测试一下朋友圈分享',
                    //component:["com.tencent.mobileqq","com.tencent.mobileqq.activity.JumpActivity"],
                    component: [
                        'com.tencent.mm',
                        'com.tencent.mm.ui.tools.ShareToTimeLineUI',
                        'com.tencent.mm.ui.tools.ShareUI'
                    ],
                    callback: error => {
                        alert('success')
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    CustomTabBarPress = (e, child, index) => {
        const { image } = this.props
        if (index === 0) {
            this.props.navigation.goBack()
        } else {
            if (image[0] === void 666) {
                alert('目前还没有订单')
                return
            }
            this.onShare('http://cdn2u.com' + image[0].file)
        }
    }
    choose = img => {
        const newImages = this.state.images.map(image => {
            if (image.id === img.id) {
                image.choose = !img.choose
            }

            return image
        })
        this.setState({
            images: newImages
        })
    }

    render() {
        const { ReturnAttach, image } = this.props
        const margin = Platform.OS === 'ios' ? 25 : 0
        if (!image) return <Spin />
        return (
            <View style={{ height: '100%' }}>
                <View
                    style={{
                        height: MarginTopIfNeeded(),
                        marginTop: margin,
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <ScrollView>
                        <View
                            style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                        >
                            {this.state.images.map(img => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.choose(img)}
                                        key={img.id}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    'http://cdn2u.com' +
                                                    img.file +
                                                    '?width=500&height=500&constrain=true&bgcolor=white',
                                                headers: header.get()
                                            }}
                                            style={{ width: 150, height: 150 }}
                                            resizeMode="contain"
                                        />
                                        {img.choose ? (
                                            <Ionicons
                                                name="md-checkmark-circle"
                                                size={25}
                                                color="#f56a00"
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0,0,0,0)',
                                                    position: 'absolute'
                                                }}
                                            />
                                        ) : null}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                {this.state.loading ? (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute'
                        }}
                    >
                        <View
                            style={{
                                height: 150,
                                width: 150,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 0.5,
                                borderColor: '#fccca7'
                            }}
                        >
                            <Spin />
                            <Text
                                style={{
                                    color: '#404040',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                {'图片准备中...'}
                            </Text>
                        </View>
                    </View>
                ) : null}
            </View>
        )
    }
}

const Attach = PageWithTab(Attachment, ['返回', '发给客户'])

const mapState = state => {
    return {
        ...state.attachment
    }
}

export default connect(mapState)(Attach)
