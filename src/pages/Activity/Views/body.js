import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ScrollView, FlatList, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { Spin } from '../../../components/Spin';
import { CustomTabBar } from '../../../components/CustomTabBar';
import { height, width, priceHelper } from '../../../util';
import { ProductBox } from '../../../components/ProductBox'


export class Body extends Component {

    renderItem = (child, index) => {
        const item = child.item;
        const { price, price2 } = priceHelper(this.props.isAud, item.ap);

        return <ProductBox
            uri={item.i}
            name={item.n}
            price={price}
            price2={price2}
            onPress={() => this.props.onItemPress(item.id, this.props.navigation)}
        />
    }
    _keyExtractor = (child) => child.id

    CustomTabBarPress = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { title, item, bref, url, append } = this.props;
        const listHeader = (
            <View>
                <AnimatedImage url={'http://cdn2u.com' + url + `?width=${500}` + `&height=${500}` + `&bgcolor=white `} />
                <Text style={{ fontSize: 20, marginBottom: 10, padding: 10, backgroundColor: "transparent" }}>{title}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, padding: 10, backgroundColor: "transparent" }}>描述</Text>
                <Text style={{ fontSize: 13, marginBottom: 10, padding: 10, backgroundColor: "transparent" }}>{bref}</Text>
                <Text style={{ marginBottom: 10, padding: 10, backgroundColor: "transparent" }}>相关商品</Text>
            </View>
        )
        return (
            <View>
                <FlatList
                    style={{ zIndex: 10, height: height - 44 - (Platform.OS === 'ios' ? 0 : 24) }}
                    data={item}
                    renderItem={this.renderItem}
                    numColumns={2}
                    initialNumToRender={6}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => append()}
                    ListHeaderComponent={listHeader}
                />
                <CustomTabBar onPress={this.CustomTabBarPress}>
                    <Text style={{ backgroundColor: "transparent" }}>返回</Text>
                </CustomTabBar>
            </View>
        )
    }
}


class AnimatedImage extends Component {
    static defaultProps = {
        resizeMode: null,
        Pheight: 200,
        Pwidth: width
    }
    state = {
        loaded: false
    }
    onLoadStart = () => {
        this.setState({
            loaded: true
        })
    }
    onLoadEnd = () => {
        this.setState({
            loaded: false
        })
    }

    render() {
        const { url, Pheight, Pwidth } = this.props;
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ImageBackground
                    style={{ height: Pheight, width: Pwidth, justifyContent: "center", alignItems: "center" }}
                    source={{
                        uri: url,
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
                        }
                    }}
                    onLoadStart={this.onLoadStart}
                    onLoadEnd={this.onLoadEnd}
                    resizeMode={this.props.resizeMode}
                >
                    {this.state.loaded ? <Spin /> : null}
                </ImageBackground>
            </View>
        )
    }
}