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
        return this.props.content !== nextProps.content
    }
    copy = () => {
        Clipboard.setString(this.props.shareText)
        Alert.alert('已复制', '已复制到剪切板', [], { cancelable: false })
    }

    render() {
        const { content, shareText } = this.props;
        const length = content.length || 0;
        const bref = (
            <View style={{ backgroundColor: 'white', padding: 10, marginTop: 2 }} onPress={this.copy}>
                {shareText !== '' ? <TouchableOpacity onPress={this.copy}>
                    <Text style={{ color: "#108ee9" }}>分享文案(点击复制到剪切板)：</Text>
                    <Text style={{ marginBottom: 15 }}>{shareText}</Text>
                </TouchableOpacity> : null}

                <Text>{length > 3 ? '描述\n' : ''}{'\n' + content}</Text>
            </View>
        )
        return length > 3 ? bref : <Text style={{ padding: 10, backgroundColor: "white" }}>分享文案：暂无</Text>;
    }
}