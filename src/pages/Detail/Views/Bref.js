import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

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

    render() {
        const { content } = this.props;
        const length = content.length || 0;
        const bref = (
            <View style={{ backgroundColor: 'white', padding: 10, marginTop: 2 }}>
                <Text>{length > 3 ? '描述\n' : ''}{'\n' + content}</Text>
            </View>
        )
        return length > 3 ? bref : null;
    }
}