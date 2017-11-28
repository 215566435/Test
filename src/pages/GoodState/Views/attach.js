import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, Platform, Share, ActionSheetIOS, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import { Cells } from './Cells'
import * as WeChat from 'react-native-wechat';


import { CustomTabBar } from '../../../components/CustomTabBar'
import { Spin } from '../../../components/Spin';
import { Url } from '../../../util';

const { height, width } = Dimensions.get('window')
// export interface ShareActionSheetIOSOptions {
//     message?: string
//     url?: string
//     subject?: string
//     /** The activities to exclude from the ActionSheet.
//      * For example: ['com.apple.UIKit.activity.PostToTwitter']
//      */
//     excludedActivityTypes?: string[]
// }


export class Attach extends Component {
    state = {
        images: [],
        loading: false
    }
    componentWillUnmount() {
        this.props.clearAttach()
    }
    componentWillReceiveProps(nextProps) {

        if (!nextProps.image) return;

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
    onShare(url) {
        let urlArray = []
        for (let i in this.state.images) {
            if (this.state.images[i].choose) {
                console.log(this.state.images[i])
                urlArray.push('http://cdn2u.com' + this.state.images[i].file + '?width=500&height=500&constrain=true&bgcolor=white')
            }
        }
        if (urlArray.length === 0) {
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
        this.setState({
            loading: true
        })

        this.props.MarkAsSentToBuyer();

        try {
            ActionSheetIOS.showShareActionSheetWithOptions({
                url: urlArray
            }, () => {

            }, () => {
                this.setState({
                    loading: false
                })
            })
        } catch (e) {
            console.log(e)
        }

    }
    onTabBarPress = (e, child, index) => {
        const { image } = this.props;
        if (index === 0) {
            this.props.ReturnAttach()
        } else {
            this.onShare('http://cdn2u.com' + image[0].file)
        }
    }
    choose = (img) => {
        const newImages = this.state.images.map((image) => {
            if (image.url === img.url) {
                image.choose = !image.choose;
            }
            return image
        })
        this.setState({
            images: newImages
        })
    }

    render() {
        const { ReturnAttach, image } = this.props;
        const margin = Platform.OS === 'ios' ? 25 : 0;
        if (!image) return <Spin />
        console.log('草泥马')
        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: height - 44 - margin, marginTop: margin, backgroundColor: '#f5f5f5' }}>
                    <ScrollView >
                        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                            {this.state.images.map((img) => {
                                return (
                                    <TouchableOpacity onPress={() => this.choose(img)} key={img.id}>
                                        <Image
                                            source={{ uri: 'http://cdn2u.com' + img.file + '?width=500&height=500&constrain=true&bgcolor=white' }}
                                            style={{ width: 150, height: 150 }}
                                            resizeMode="contain"
                                        />
                                        {img.choose ?
                                            <Ionicons name='md-checkmark-circle'
                                                size={25} color='#f56a00'
                                                style={{ backgroundColor: "rgba(0,0,0,0)", position: "absolute" }} /> : null
                                        }
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
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
                        <Text style={{ color: '#404040', backgroundColor: "transparent" }}>{'图片准备中...'}</Text>
                    </View>
                </View> : null}
                <CustomTabBar onPress={this.onTabBarPress}>
                    <Text style={{ backgroundColor: "transparent" }}>返回</Text>
                    <Text style={{ backgroundColor: "transparent" }}>发给客户</Text>
                </CustomTabBar>
            </View>
        )
    }
}
