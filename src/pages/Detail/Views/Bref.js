import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Clipboard, Alert } from 'react-native';

import { Spin } from '../../../components/Spin';
import { Stepper } from '../../../components/Stepper';
import { Sku } from './Sku';
import { Pop } from './Popup';
import { PriceText } from './PriceText';
import { Title } from './Title';
import { Carousel } from '../../../components/Carousel';

export class Bref extends Component {
    static defaultProps = {
        content: ''
    }
    shouldComponentUpdate(nextProps) {
        return this.props.content !== nextProps.content ||
            this.props.shareText !== nextProps.shareText
    }
    copy = (index) => {
        Clipboard.setString(this.props.shareText[index])
        Alert.alert('已复制', '已复制到剪切板', [
            { text: '返回', style: 'cancel' },
        ], { cancelable: false })
    }

    renderBrefList() {
        const { content, shareText } = this.props;
        const length = content.length || 0;
        const fontSize = 12;
        if (shareText instanceof Array && shareText.length > 0) {
            return (
                <View>
                    {shareText.map((text, index) => {
                        return (
                            <View style={{ backgroundColor: 'white', padding: 10, marginTop: 2 }} >
                                {text !== '' ? <TouchableOpacity onPress={() => this.copy(index)}>
                                    <Text style={{ color: "#108ee9", backgroundColor: "transparent", fontSize: fontSize }}>分享文案{`${index + 1}`}(点击复制到剪切板)：</Text>
                                    <Text style={{ marginBottom: 15, backgroundColor: "transparent", fontSize: fontSize }}>{text}</Text>
                                </TouchableOpacity> : null}
                            </View>
                        )
                    })}
                    <Text style={{ backgroundColor: "transparent", fontSize: fontSize }}>{length > 3 ? '描述\n' : ''}{'\n' + content}</Text>
                </View>
            )
        }
        return <Text style={{ padding: 10, backgroundColor: "white", backgroundColor: "transparent", fontSize: fontSize }}>分享文案：暂无</Text>;
    }

    render() {
        const bref = this.renderBrefList();
        return bref;
    }
}