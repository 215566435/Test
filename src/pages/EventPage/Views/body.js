import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Text, TouchableOpacity, Platform, FlatList, Modal } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Carousel } from '../../../components/Carousel';
import { Grid } from '../../../components/Grid'
import { Spin } from '../../../components/Spin'
import { PageHeader } from '../../../components/PageHeader'




const { width, height } = Dimensions.get('window')

export class Body extends Component {
    static defaultProps = {
        Carousel: []
    }


    componentWillReceiveProps(e) {
    }
    renderEvent = (child) => {
        const item = child.item;
        const { onActivityPress } = this.props;
        return (
            <View style={{ alignItems: 'center', marginTop: 1, backgroundColor: "white" }} >
                <Text style={{ fontSize: 20, padding: 10, color: '#f56a00' }}>🌟{item.n}🌟</Text>
                <TouchableOpacity onPress={() => onActivityPress(item.id)}>
                    <Image
                        source={{ uri: 'http://cdn2u.com' + item.i + '?width=750&constrain=true&bgcolor=white' }}
                        style={{ height: 200, width: width }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#e9e9e9' }}>
                    {item.g.map((itm, index) => {
                        const { isAud } = this.props;
                        const price = {
                            p: isAud ? '$' + itm.ap.p.a : '¥' + itm.ap.p.r,
                            pi: isAud ? '$' + itm.ap.p.ai : '¥' + itm.ap.p.ri
                        }
                        return (
                            <TouchableOpacity key={itm.id} style={{ marginLeft: index > 0 ? 1 : 0, marginTop: 1, backgroundColor: "white", padding: 5 }} onPress={() => this.props.onItemPress(itm.id)}>
                                <View style={{ height: 150, width: 100 }}>
                                    <Image
                                        source={{ uri: 'http://cdn2u.com' + itm.i + '?width=140&height=140&constrain=true&bgcolor=white' }}
                                        style={{ height: 100, width: 100 }}
                                        resizeMode='contain'
                                    />
                                    <Text numberOfLines={2} style={{ fontSize: 12 }}>{itm.n}</Text>
                                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#f56a00' }}>{price.p ? price.p : '¥' + itm.ap.p.r}</Text>
                                    <Text numberOfLines={2} style={{ fontSize: 10, color: '#919191' }}>包邮价:{price.pi ? price.pi : '¥' + itm.ap.p.ri}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
    _keyExtractor = (child, index) => {
        return index
    }

    render() {
        if (!this.props.event) return <View style={{ height: '100%', justifyContent: "center", alignItems: "center" }}><Spin /></View>
        const { event, search } = this.props;
        return (
            <View>
                <PriceListHeader search={search} />
                <View style={{ backgroundColor: "#e9e9e9", height: height - 43 - 44 - (Platform.OS === 'ios' ? 25 : 0) }}>
                    <FlatList
                        data={event}
                        renderItem={this.renderEvent}
                        onEndReached={
                            () => this.props.onAppend()
                        }
                        initialNumToRender={2}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        )
    }
}

class PriceListHeader extends React.Component {
    onFocus = () => {
        this.props.search()
    }


    render() {
        const {
            isPanelVisiable,
            onPress,
            onValueChange,
            isShowPicture,
            onShowPicture
            } = this.props

        return (
            <View >
                <PageHeader style={{ backgroundColor: '#f46e65' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", top: Platform.OS === 'ios' ? 10 : 0 }}>
                        <FakeSearchBar placeholder='秒杀 ' onFocus={this.onFocus} />
                        <TouchableOpacity style={{ right: 4, width: 40 }} onPress={onPress}><SimpleLineIcons name='options' size={26} color='#fcdbd9' /></TouchableOpacity>
                    </View>
                </PageHeader>
            </View>
        )
    }
}

class FakeSearchBar extends Component {

    render() {
        const { placeholder } = this.props;
        return (
            <View style={{ marginLeft: 8, borderRadius: 5, flexDirection: 'row', backgroundColor: '#f79992', height: 30, width: '70%', alignItems: 'center' }}>
                <View style={{ marginLeft: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <Ionicons name='ios-search-outline' size={18} color='#fcdbd9' />
                    <TouchableOpacity
                        style={{ width: '80%', marginLeft: 8 }}
                        onPress={this.props.onFocus}
                    >
                        <Text>{placeholder}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}