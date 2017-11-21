import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';

import { Spin } from '../../../components/Spin'
import { CustomTabBar } from '../../../components/CustomTabBar'

const { height, width } = Dimensions.get("window")


export class Body extends Component {

    componentDidMount() {

    }

    renderItem = (child, index) => {
        const item = child.item;
        return (
            <View style={{ width: width / 2, padding: 10, borderWidth: 0.5, borderColor: '#f7f7f7' }}>
                <TouchableOpacity onPress={() => this.props.onItemPress(item.id, this.props.navigation)}>
                    <AnimatedImage
                        url={'http://cdn2u.com' + item.i + `?width=${180}` + `&height=${180}` + `&bgcolor=white `}
                        resizeMode="contain"
                        Pheight={120}
                        Pwidth={120}
                    />
                    <Text>{item.n}</Text>
                </TouchableOpacity>
            </View>
        )
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
                <Text style={{ fontSize: 20, marginBottom: 10, padding: 10 }}>{title}</Text>
                <Text style={{ fontSize: 15, marginBottom: 10, padding: 10 }}>描述</Text>
                <Text style={{ fontSize: 13, marginBottom: 10, padding: 10 }}>{bref}</Text>
                <Text style={{ marginBottom: 10, padding: 10 }}>相关商品</Text>
            </View>
        )
        return (
            <View>
                <FlatList
                    style={{ zIndex: 10, height: height - 44 }}
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
                    <Text>返回</Text>
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
                    source={{ uri: url }}
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

const bodyState = StyleSheet.create({
    AnimatedImage: { justifyContent: "center", alignItems: "center" },
    insideImage: { height: 200, width: width }

})