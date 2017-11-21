import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, Platform, Share, ActionSheetIOS } from 'react-native';
import fs from 'react-native-fs';
import { Cells } from './Cells'
import * as WeChat from 'react-native-wechat';


import { CustomTabBar } from '../../../components/CustomTabBar'
import { Spin } from '../../../components/Spin';

const { height } = Dimensions.get('window')
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

    componentWillUnmount() {
        this.props.clearAttach()
    }
    onShare(url) {
        try {
            ActionSheetIOS.showShareActionSheetWithOptions({
                url: [url]
            }, () => {

            }, () => {
                console.log('分享成功')
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

    render() {
        const { ReturnAttach, image } = this.props;
        const margin = Platform.OS === 'ios' ? 25 : 0;
        if (!image) return <Spin />

        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: height - 44 - margin, marginTop: margin, backgroundColor: '#f5f5f5' }}>
                    <ScrollView>
                        {image.map((img) => {
                            console.log(img)
                            return (
                                <Image
                                    key={img.id}
                                    source={{ uri: 'http://cdn2u.com' + img.file + '?width=500&height=500&constrain=true&bgcolor=white' }}
                                    style={{ width: '100%', height: 500 }}
                                    resizeMode="contain"
                                />
                            )
                        })}
                    </ScrollView>
                </View>
                <CustomTabBar onPress={this.onTabBarPress}>
                    <Text>返回</Text>
                    <Text>发给客户</Text>
                </CustomTabBar>
            </View>
        )
    }
}
