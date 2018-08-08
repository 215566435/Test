import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    Platform,
    FlatList,
    Modal,
    Switch
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons' // 4.4.2
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { Carousel } from '../../../components/Carousel'
import { Grid } from '../../../components/Grid'
import { Spin } from '../../../components/Spin'
import { PageHeader } from '../../../components/PageHeader'
import { width, height } from '../../../util'

export class Body extends Component {
    static defaultProps = {
        Carousel: []
    }

    onCartPress = () => {
        this.props.navigate('Cart')
    }

    renderEvent = child => {
        const item = child.item
        const { onActivityPress } = this.props
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 1,
                    backgroundColor: 'white'
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        padding: 10,
                        color: '#f56a00',
                        backgroundColor: 'transparent'
                    }}
                >
                    🌟{item.n}🌟
                </Text>
                <TouchableOpacity onPress={() => onActivityPress(item.id)}>
                    <Image
                        source={{
                            uri:
                                'http://cdn2u.com' +
                                item.i +
                                '?width=750&constrain=true&bgcolor=white',
                            headers: {
                                Accept:
                                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                                'User-Agent':
                                    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36'
                            }
                        }}
                        style={{ height: 200, width: width }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: '#e9e9e9' }}
                >
                    {item.g.map((itm, index) => {
                        const { isAud } = this.props
                        const price = {
                            p: isAud ? '$' + itm.ap.p.a : '¥' + itm.ap.p.r,
                            pi: isAud ? '$' + itm.ap.p.ai : '¥' + itm.ap.p.ri
                        }
                        return (
                            <TouchableOpacity
                                key={itm.id}
                                style={{
                                    marginLeft: index > 0 ? 1 : 0,
                                    marginTop: 1,
                                    backgroundColor: 'white',
                                    padding: 5
                                }}
                                onPress={() => this.props.onItemPress(itm.id)}
                            >
                                <View style={{ height: 180, width: 130 }}>
                                    <Image
                                        source={{
                                            uri:
                                                'http://cdn2u.com' +
                                                itm.i +
                                                '?width=140&height=140&constrain=true&bgcolor=white',
                                            headers: {
                                                Accept:
                                                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                                                'User-Agent':
                                                    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36'
                                            }
                                        }}
                                        style={{ height: 110, width: 110 }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 12,
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        {itm.n}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 10,
                                            color: '#f56a00',
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        {price.p !== '$null'
                                            ? price.p
                                            : '¥' + itm.ap.p.r}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            fontSize: 10,
                                            color: '#919191',
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        包邮价:{price.pi !== '$null'
                                            ? price.pi
                                            : '¥' + itm.ap.p.ri}
                                    </Text>
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
        if (!this.props.event)
            return (
                <View
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spin />
                </View>
            )
        const { event, search, isAud, EventOnValueChange } = this.props
        return (
            <View>
                <PriceListHeader
                    search={search}
                    isShowAud={isAud}
                    onValueChange={EventOnValueChange}
                    onCartPress={this.onCartPress}
                />
                <View
                    style={{
                        backgroundColor: '#e9e9e9',
                        height: height - 43 - 44 - 25
                    }}
                >
                    <FlatList
                        data={event}
                        renderItem={this.renderEvent}
                        onEndReached={() => this.props.onAppend()}
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
    state = {
        show: false
    }

    onFocus = () => {
        this.props.search()
    }

    onCartPress = () => {
        this.setState({
            show: false
        })
        if (this.props.onCartPress) this.props.onCartPress()
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
        const { isPanelVisiable, onValueChange, isShowAud } = this.props

        return (
            <View>
                <PageHeader style={{ backgroundColor: '#f46e65' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            top: Platform.OS === 'ios' ? 10 : 0
                        }}
                    >
                        <FakeSearchBar
                            placeholder="秒杀 "
                            onFocus={this.onFocus}
                        />
                        <TouchableOpacity
                            style={{ right: 4, width: 40 }}
                            onPress={this.onPress}
                        >
                            <SimpleLineIcons
                                name="options"
                                size={26}
                                color="#fcdbd9"
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </TouchableOpacity>
                        <Modal visible={this.state.show} transparent={true}>
                            <View
                                style={{
                                    height: 80,
                                    width: 150,
                                    backgroundColor: '#222222',
                                    zIndex: 10,
                                    right: 4,
                                    position: 'absolute',
                                    top: 45 + (Platform.OS === 'ios' ? 23 : 0),
                                    borderRadius: 5,
                                    padding: 5
                                }}
                            >
                                <SwitchWithTitle
                                    title={'显示澳帝'}
                                    onValueChange={onValueChange}
                                    value={isShowAud}
                                />
                                <TouchableOpacity
                                    onPress={this.onCartPress}
                                    style={{ marginTop: 10 }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 14,
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        购物车
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute'
                                }}
                                onPress={this.onClose}
                            />
                        </Modal>
                    </View>
                </PageHeader>
            </View>
        )
    }
}

const SwitchWithTitle = ({ title, tintColor = 'white', ...otherProps }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Text style={{ color: tintColor, backgroundColor: 'transparent' }}>
                {title}
            </Text>
            <Switch {...otherProps} onTintColor="#f46e65" />
        </View>
    )
}

class FakeSearchBar extends Component {
    render() {
        const { placeholder } = this.props
        return (
            <View
                style={{
                    marginLeft: 8,
                    borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: '#f79992',
                    height: 30,
                    width: '70%',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        marginLeft: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons
                        name="ios-search-outline"
                        size={18}
                        color="#fcdbd9"
                        style={{ backgroundColor: 'transparent' }}
                    />
                    <TouchableOpacity
                        style={{ width: '80%', marginLeft: 8 }}
                        onPress={this.props.onFocus}
                    >
                        <Text style={{ backgroundColor: 'transparent' }}>
                            {placeholder}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
