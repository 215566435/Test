import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, Platform, Image, ScrollView } from 'react-native';
import { PageHeader } from '../../../components/PageHeader';
import { SearchBar } from '../../../components/SearchBar'
import { Spin } from '../../../components/Spin';
import { ProductBox } from 'component/ProductBox';
import { height, width, priceHelper } from 'utils';

export class Body extends Component {
    static defaultProps = {
        hotKey: [],
        autoFocus: true
    }
    state = {
        key: null
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
        const { price, price2 } = priceHelper(isAud, item);

        return <ProductBox
            onPress={() => this.props.GoodItem(item.id)}
            isAud={isAud}
            price={price}
            price2={price2}
            name={item.n}
            uri={item.i}
        />
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
