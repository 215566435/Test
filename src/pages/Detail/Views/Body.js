import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    ImageBackground
} from 'react-native'

import { Spin } from '../../../components/Spin'
import { Stepper } from '../../../components/Stepper'
import { Sku } from './Sku'
import { Pop } from './Popup'
import { PriceText } from './PriceText'
import { Title } from './Title'
import { Bref } from './Bref'
import { Carousel } from '../../../components/Carousel'
import { AutoHeightImage } from '../../../components/AutoHeightImage'

const { height, width } = Dimensions.get('window')

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
    renderImage = item => (
        <ImageBackground
            key={item}
            onLoadEnd={this.onLoad}
            style={{
                height: 300,
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            source={{
                uri: item,
                headers: {
                    Accept:
                        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36'
                }
            }}
            resizeMode="contain"
        >
            {this.state.onLoad ? <Spin /> : null}
        </ImageBackground>
    )

    renderExpiry = () => {
        const { property } = this.props
        if (!property) return

        if (property.length === 1) {
            if (!property[0][0].expiry) return null
            return (
                <View
                    style={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: 'white'
                    }}
                >
                    <Text>保质期：{property[0][0].expiry}</Text>
                </View>
            )
        }
    }

    render() {
        const {
            title,
            price,
            onSkuPress,
            CarouselImage = [],
            contentImg = [],
            content,
            shareText
        } = this.props

        return (
            <ScrollView style={{ height: '100%' }}>
                <Carousel>
                    {CarouselImage.map(item => {
                        return this.renderImage(item)
                    })}
                </Carousel>
                <Title title={title} />
                <PriceText price={price} />
                <Sku onPress={onSkuPress} />
                {this.renderExpiry()}
                <Bref content={content} shareText={shareText} />
                <FlatList
                    style={{ zIndex: -10 }}
                    data={contentImg}
                    renderItem={(item, index) => {
                        return (
                            <AutoHeightImage key={index} uri={item.item.url} />
                        )
                    }}
                    /* refreshing={false} */
                    /* onRefresh={() => { }} */
                    initialNumToRender={2}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
}
