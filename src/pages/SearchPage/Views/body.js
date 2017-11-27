import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, Platform, Image, ScrollView } from 'react-native';
import { PageHeader } from '../../../components/PageHeader';
import { SearchBar } from '../../../components/SearchBar'
import { Spin } from '../../../components/Spin';

const { height, width } = Dimensions.get('window')

export class Body extends Component {
    static defaultProps = {
        hotKey: [],
        autoFocus: true
    }
    state = {
        key: null
    }

    componentDidMount() {
    }
    componentWillUnmount() {
        this.props.clearSearch()
    }

    onSubmitEditing = (text) => {
        if (this.props.onEndEditing) {
            this.props.onEndEditing(text)
        }
    }
    renderGoods = (child) => {
        const item = child.item;
        const { isAud } = this.props;
        const price = {
            p: isAud ? '$' + item.p.a : '¥' + item.p.r,
            pi: isAud ? '$' + item.p.ai : '¥' + item.p.ri
        }
        return (
            <TouchableOpacity style={{ height: 200, width: width / 2, margin: 0.5, padding: 10, backgroundColor: "white" }} onPress={() => this.props.GoodItem(item.id)}>
                <View >
                    <Image
                        key={item.i}
                        source={{ uri: 'http://cdn2u.com' + item.i + '?width=200&height=200&constrain=true&bgcolor=white' }}
                        style={{ height: 120, width: 150 }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={2} style={{ fontSize: 12, backgroundColor: "transparent" }}>{item.n}</Text>
                    <Text style={{ color: '#f56a00', backgroundColor: "transparent" }}>{price.p ? price.p : '¥' + itm.ap.p.r}</Text>
                    <Text style={{ fontSize: 10, color: '#919191', backgroundColor: "transparent" }}>包邮价:{price.pi ? price.pi : '¥' + itm.ap.p.ri}</Text>
                </View>
            </TouchableOpacity>

        )
    }
    _keyExtractor = (child) => child.id

    renderSearchList = () => {
        return (
            <FlatList
                style={{ zIndex: -10, height: height - 43 - 30, width: width, backgroundColor: "#f7f7f7" }}
                data={this.props.item}
                renderItem={this.renderGoods}
                initialNumToRender={6}
                keyExtractor={this._keyExtractor}
                onEndReached={this.props.append}
                onEndReachedThreshold={0.1}
                numColumns={2}
                onScrollBeginDrag={this.onScroll}
                onScrollEndDrag={this.onScroll}
            />
        )

    }

    renderItem = () => {
        const { hotKey, loading } = this.props;

        if (loading) {
            return <View style={{ justifyContent: "center", alignItems: "center", height: '100%' }}><Spin /></View>
        }

        if (this.props.item) {
            if (this.props.item.length === 0) {
                return (
                    <View>
                        <Text style={{ fontSize: 20, backgroundColor: "transparent", color: '#919191' }}>暂无商品</Text>
                    </View>
                )
            }
            return this.renderSearchList()
        }


        return <View style={{ flexDirection: "row", marginTop: 10, flexWrap: 'wrap', flex: 3 }}>
            {hotKey.map((item) => {
                return (
                    <TouchableOpacity
                        onPress={() => this.props.PressItem(item)}
                        key={item}
                        style={{
                            margin: 10,
                            borderWidth: 0.5,
                            borderColor: "rgba(120,120,120,0.3)",
                            height: 30,
                            width: 50,
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: 4
                        }}
                    >
                        <Text style={{ color: '#f04134', backgroundColor: "transparent" }}>{item}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    }

    render() {

        return (
            <View style={{ backgroundColor: "white", height: "100%" }}>
                <PageHeader>
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginTop: Platform.OS === 'ios' ? 13 : 0, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={this.props.goback} style={{ width: 40 }}>
                            <View
                                style={{
                                    borderLeftWidth: 2,
                                    borderBottomWidth: 2,
                                    marginLeft: 10,
                                    height: 15,
                                    width: 15,
                                    transform: [
                                        { rotateZ: '45deg' },
                                        { perspective: 1000 }
                                    ]
                                }}
                            />
                        </TouchableOpacity>
                        <SearchBar backgroundColor={'#e9e9e9'} searchColor={'#404040'} onEndEditing={this.onSubmitEditing} placeholder="搜索" autoFocus={this.props.autoFocus} />
                    </View>
                </PageHeader>
                <ScrollView style={{ height: height }}>
                    {this.renderItem()}
                </ScrollView>
            </View>
        )
    }
}
