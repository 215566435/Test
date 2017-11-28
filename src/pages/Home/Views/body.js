import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Text, TouchableOpacity, Platform, Modal, Switch } from 'react-native';

import { Carousel } from '../../../components/Carousel';
import { Grid } from '../../../components/Grid'
import { Spin } from '../../../components/Spin'
import { PageHeader } from '../../../components/PageHeader'

import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const { width, height } = Dimensions.get('window')

export class Body extends Component {
    static defaultProps = {
        Carousel: []
    }

    onCartPress = () => {
        this.props.navigate('Cart')
    }

    renderLayout = () => {

        return (
            <View>
                {
                    this.props.goodNews.map((itm, index) => {
                        return (
                            <View key={index} style={{ alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: '#f46e65', backgroundColor: "transparent" }}>🌟{itm.n}🌟</Text>
                                <Grid onPress={this.props.onLayoutPress} cols={2} wMargin={5} hMargin={5} itemHeight={190} borderWidth={0.5} borderColor={'rgba(120,120,120,0.3)'}>
                                    {itm.g.map((item) => {
                                        const { isAud } = this.props;
                                        const price = {
                                            p: isAud ? '$' + item.ap.p.a : '¥' + item.ap.p.r,
                                            pi: isAud ? '$' + item.ap.p.ai : '¥' + item.ap.p.ri
                                        }
                                        return (
                                            <View style={{ alignItems: 'center' }} key={item.id}>
                                                <Image
                                                    key={item.i}
                                                    source={{ uri: 'http://cdn2u.com' + item.i + '?width=140&height=140&constrain=true&bgcolor=white' }}
                                                    style={{ height: 120, width: 150 }}
                                                    resizeMode="contain"
                                                />
                                                <Text numberOfLines={2} style={{ fontSize: 12, backgroundColor: "transparent" }}>{item.n}</Text>
                                                <Text style={{ color: '#f56a00', backgroundColor: "transparent" }}>{price.p ? price.p : '¥' + itm.ap.p.r}</Text>
                                                <Text style={{ fontSize: 10, color: '#919191', backgroundColor: "transparent" }}>包邮价:{price.pi ? price.pi : '¥' + itm.ap.p.ri}</Text>
                                            </View>
                                        )
                                    })}
                                </Grid>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    renderEvent = () => {
        const { event } = this.props;

        return (
            <View>
                {event.map((item) => {
                    return (
                        <View style={{ alignItems: 'center', marginTop: 10 }} key={item.i}>
                            <Text style={{ fontSize: 20, padding: 10, color: '#f56a00', backgroundColor: "transparent" }}>🌟{item.n}🌟</Text>
                            <TouchableOpacity onPress={() => this.props.EventImagePress(item.id)}>
                                <Image
                                    source={{ uri: 'http://cdn2u.com' + item.i + '?width=750&constrain=true&bgcolor=white' }}
                                    style={{ height: 200, width: width }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {item.g.map((itm) => {
                                    const { isAud } = this.props;
                                    const price = {
                                        p: isAud ? '$' + itm.ap.p.a : '¥' + itm.ap.p.r,
                                        pi: isAud ? '$' + itm.ap.p.ai : '¥' + itm.ap.p.ri
                                    }

                                    return (
                                        <TouchableOpacity key={itm.i} onPress={() => this.props.onEventPress(itm.id)}>
                                            <View style={{ height: 200, width: 120, padding: 10, borderWidth: 0.5, borderColor: "#f7f7f7" }}>
                                                <Image
                                                    source={{ uri: 'http://cdn2u.com' + itm.i + '?width=140&height=140&constrain=true&bgcolor=white' }}
                                                    style={{ height: 100, width: 100 }}
                                                    resizeMode='contain'
                                                />
                                                <Text numberOfLines={2} style={{ fontSize: 12, backgroundColor: "transparent" }}>{itm.n}</Text>
                                                <Text style={{ color: '#f56a00', backgroundColor: "transparent" }}>{price.p !== '$null' ? price.p : '¥' + itm.ap.p.r}</Text>
                                                <Text style={{ fontSize: 10, color: '#919191', backgroundColor: "transparent" }}>包邮价:{price.pi !== '$null' ? price.pi : '¥' + itm.ap.p.ri}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    )
                })}
            </View>
        )
    }

    render() {

        const loaded = () => {
            if (!this.props.goodNews) return <View style={{ height: '80%', justifyContent: "center", alignItems: "center" }}><Spin /></View>
            if (!this.props.event) return <View style={{ height: '80%', justifyContent: "center", alignItems: "center" }}><Spin /></View>

            return (
                <ScrollView style={{ height: height - 44 - 45 - (Platform.OS === 'ios' ? 23 : 0) }} >
                    <Carousel>
                        {this.props.Carousel.map((item) => {
                            return <Image
                                key={item.i}
                                source={{ uri: 'http://cdn2u.com' + item.i }}
                                style={{ height: 200, width: width }}
                                resizeMode='contain'
                            />
                        })}
                    </Carousel>
                    {this.renderEvent()}
                    {this.renderLayout()}
                </ScrollView>
            )
        }

        return (
            <View>
                <PriceListHeader
                    search={this.props.search}
                    onCartPress={this.onCartPress}
                    onValueChange={this.props.onValueChange}
                    isShowAud={this.props.isAud}
                />
                {loaded()}
            </View>
        )
    }
}



class PriceListHeader extends React.Component {
    state = {
        show: false
    }
    onCartPress = () => {
        this.setState({
            show: false
        })
        if (this.props.onCartPress) this.props.onCartPress()
    }

    onFocus = () => {
        this.props.search()
    }

    onPress = () => {
        this.setState({
            show: true
        })
        if (this.props.onPress) this.props.onPress()
    }
    onClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const {
            isPanelVisiable,
            onPress,
            onValueChange,
            isShowAud
            } = this.props

        return (
            <View >
                <PageHeader style={{ backgroundColor: '#f46e65' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", top: Platform.OS === 'ios' ? 10 : 0 }}>
                        <FakeSearchBar placeholder='秒杀 ' onFocus={this.onFocus} />
                        <TouchableOpacity style={{ right: 4, width: 40 }} onPress={this.onPress}>
                            <SimpleLineIcons name='options' size={26} color='#fcdbd9' style={{ backgroundColor: "transparent" }} />
                        </TouchableOpacity>
                        <Modal
                            visible={this.state.show}
                            transparent={true}
                            onRequestClose={() => { }}
                        >
                            <View
                                style={{
                                    height: 80,
                                    width: 150,
                                    backgroundColor: "#222222",
                                    zIndex: 10,
                                    right: 4,
                                    position: 'absolute',
                                    top: 45 + (Platform.OS === 'ios' ? 23 : 0),
                                    borderRadius: 5,
                                    padding: 5
                                }}
                            >
                                <SwitchWithTitle title={'显示澳币'} onValueChange={onValueChange} value={isShowAud} />
                                <TouchableOpacity onPress={this.onCartPress} style={{ marginTop: 10 }}>
                                    <Text style={{ textAlign: "center", color: 'white', fontSize: 14, backgroundColor: "transparent" }}>购物车</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ height: '100%', width: '100%', position: 'absolute' }} onPress={this.onClose}>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                </PageHeader>
            </View>
        )
    }
}

const SwitchWithTitle = ({ title, tintColor = 'white', ...otherProps }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: tintColor, backgroundColor: "transparent" }}>{title}</Text>
            <Switch {...otherProps} onTintColor='#f46e65' />
        </View>
    )
}

class FakeSearchBar extends Component {

    render() {
        const { placeholder } = this.props;
        return (
            <View style={{ marginLeft: 8, borderRadius: 5, flexDirection: 'row', backgroundColor: '#f79992', height: 30, width: '70%', alignItems: 'center' }}>
                <View style={{ marginLeft: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <Ionicons name='ios-search-outline' size={18} color='#fcdbd9' style={{ backgroundColor: "transparent" }} />
                    <TouchableOpacity
                        style={{ width: '80%', marginLeft: 8 }}
                        onPress={this.props.onFocus}
                    >
                        <Text style={{ backgroundColor: "transparent" }}>{placeholder}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}