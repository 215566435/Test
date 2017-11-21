import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, ImageBackground } from 'react-native';

import { Spin } from '../../../components/Spin';
import { Stepper } from '../../../components/Stepper';
import { Sku } from './Sku';
import { Pop } from './Popup';
import { PriceText } from './PriceText';
import { Title } from './Title';
import { Bref } from './Bref';
import { Carousel } from '../../../components/Carousel';
import { AutoHeightImage } from '../../../components/AutoHeightImage'


const { height, width } = Dimensions.get('window');



export class Body extends Component {
    static defaultProps = {
        CarouselImage: [],
        contentImg: []
    }
    state = {
        onLoad: true
    }

    onLoad = () => {
        this.setState({
            onLoad: false
        })
    }
    renderImage = (item) => (
        <ImageBackground
            key={item}
            onLoadEnd={this.onLoad}
            style={{
                height: 300,
                width: width,
                justifyContent: "center",
                alignItems: "center"
            }}
            source={{
                uri: item,
                cache: 'force-cache'
            }}
            resizeMode='contain'
        >
            {this.state.onLoad ? <Spin /> : null}
        </ImageBackground>
    )

    render() {
        const { title, price, onSkuPress, CarouselImage = [], contentImg = [], content } = this.props;
        return (
            <ScrollView style={{ height: '100%' }}>
                <Carousel>
                    {CarouselImage.map((item) => {
                        return this.renderImage(item)
                    })}
                </Carousel>
                <Title title={title} />
                <PriceText price={price} />
                <Sku onPress={onSkuPress} />
                <Bref content={content} />
                <FlatList
                    style={{ zIndex: -10 }}
                    data={contentImg}
                    renderItem={(item, index) => {
                        return <AutoHeightImage key={index} uri={item.item.url} />
                    }}
                    /* refreshing={false} */
                    /* onRefresh={() => { }} */
                    initialNumToRender={2}
                    keyExtractor={(item, index) => (index)}
                />
            </ScrollView>
        )
    }
}