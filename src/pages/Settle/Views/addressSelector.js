import { View, Text, TouchableOpacity, Modal, FlatList, Dimensions, ScrollView, Platform } from 'react-native'
import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import { CustomTabBar } from '../../../components/CustomTabBar'
import { header, Url } from '../../../util';
import { Spin } from '../../../components/Spin';
import { Modyfiy } from '../../Address/Views/modal';
import { SearchBar } from '../../../components/SearchBar';
import { ModalWrapper } from 'HOC/ModalWrapper';
import { PageWithTab } from 'HOC/PageWithTab';


const { height, width } = Dimensions.get('window')

var CurrentPage = 1;
var posting = false;
var total = -1;

const dispatch = (type, value) => {
    if (type === 'pose') {
        posting = value;
    } else if (type === 'page') {
        CurrentPage = value >= total ? total : value;
    } else if (type === 'total') {
        total = value;
    }
}
const getState = () => {
    return {
        posting,
        CurrentPage,
        total
    }
}

const setDefault = () => {
    dispatch('pose', false);
    dispatch('page', 1);
    dispatch('total', -1)
}

export class AddressSelector extends Component {
    static defaultProps = {
        addOnBefore: null,
        type: 'Receiver',
        propsHeight: 120
    }
    state = {
        isChosenVisiable: false,
        isEditVisiable: false
    }
    onPress = () => {
        this.setState({
            isChosenVisiable: !this.state.isChosenVisiable
        })
    }
    onEdit = () => {
        this.setState({
            isEditVisiable: !this.state.isEditVisiable
        })
    }
    onEditDone = (item) => {
        this.setState({
            isEditVisiable: !this.state.isEditVisiable
        })
        if (item) {
            this.props.onFinish({
                item: item,
                type: this.props.type
            });
        }
    }

    onGoBack = (item) => {
        if (item === 'goback') {
            this.setState({
                isChosenVisiable: !this.state.isChosenVisiable
            })
            return;
        }

        this.props.onFinish(item);
        this.setState({
            isChosenVisiable: !this.state.isChosenVisiable
        })
    }

    render() {
        const { isChosenVisiable, isEditVisiable } = this.state;
        let { value, type, propsHeight } = this.props;
        const typeString = type === 'Receiver' ? '收件人' : '发件人';
        const containerHeight = propsHeight;
        return (
            <View style={{
                borderBottomWidth: 0.5,
                borderColor: 'rgba(120,120,120,0.2)',
            }}>
                <ContentText value={value} type={type} containerHeight={containerHeight} />
                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity onPress={this.onPress} style={{ backgroundColor: '#948aec', borderRadius: 5 }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 15, padding: 2, color: 'white', backgroundColor: "transparent" }}>选取</Text>
                        </View>
                    </TouchableOpacity>
                    {value.n ?
                        <TouchableOpacity onPress={this.onEdit} style={{ marginLeft: 10, backgroundColor: '#f78e3d', borderRadius: 5 }} >
                            <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
                                <Text style={{ fontSize: 15, padding: 2, color: 'white', backgroundColor: "transparent" }}>编辑</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
                <AddressList visible={isChosenVisiable} goBack={this.onGoBack} type={type} />
                <Modal
                    animationType='slide'
                    visible={isEditVisiable}
                >
                    <Modyfiy addr={value} done={this.onEditDone} />
                </Modal>
            </View >
        )
    }
}

class ContentText extends Component {

    render() {
        const { value, type, containerHeight } = this.props;
        const typeString = type === 'Receiver' ? '收件人' : '发件人';
        return (
            <View
                style={{
                    height: containerHeight,
                    paddingLeft: 14,
                    alignItems: "center",
                    flexDirection: 'row',
                    width: width
                }}
            >
                <Text style={{ backgroundColor: "transparent", fontSize: 12 }}>{typeString}</Text>
                <View style={{ marginLeft: 20 }}>
                    <Text numberOfLines={4} style={{ color: '#bfbfbf', backgroundColor: "transparent", fontSize: 12 }}>{value.n ? null : `请选择${typeString}`}</Text>
                    <Text numberOfLines={4} style={{ backgroundColor: "transparent", fontSize: 12 }} >{value.n ? '名字：' + value.n : null}</Text>
                    <Text numberOfLines={4} style={{ backgroundColor: "transparent", fontSize: 12 }} >{value.p ? '电话：' + value.p : null}</Text>
                    <Text numberOfLines={4} style={{ backgroundColor: "transparent", fontSize: 12 }} >{value.i ? '身份证：' + value.i : null}</Text>
                    <Text numberOfLines={4} style={{ width: 230, backgroundColor: "transparent", fontSize: 12 }}>{value ? value.a : null}</Text>
                </View>
            </View>
        )
    }
}


class AddressPicker extends Component {
    state = {
        address: null,
        keyword: ''
    }
    componentDidMount() {
        this._load();
        this._isMounted = true;
    }
    componenWillUnmount() {

        this._isMounted = false;
    }
    renderAddressItem = (child) => {
        const item = child.item;
        return <AddrItem item={item} onItemPress={this.onItemPress} />
    }

    _load = () => {
        (async function fetchAddress(that) {
            try {
                if (posting) return;
                if (getState().CurrentPage === getState().total) return;
                dispatch('pose', true);
                const res = await fetch(Url + 'user/ListAddress2', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 0,
                        keyword: that.keyword,
                        CurrentPage: CurrentPage,
                        pageSize: 15,
                        addressType: that.props.type === 'Receiver' ? 0 : 1
                    }),
                    headers: header.get()
                })
                dispatch('pose', false);

                const json = await res.json();
                console.log(json)
                const newAddress = that.state.address ?
                    [...that.state.address, ...json.data.items] : json.data.items;

                dispatch('total', json.data.totalPages);

                if (that._isMounted) {
                    that.setState({
                        address: newAddress
                    }, (() => {
                        dispatch('pose', false);
                        const page = getState().CurrentPage + 1;
                        dispatch('page', page);
                    }))
                }
            } catch (e) {
                console.log(e);
            }
        })(this)
    }
    _search = () => {
        (async function fetchAddress(that) {
            try {

                const res = await fetch(Url + 'user/ListAddress2', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 0,
                        keyword: that.keyword,
                        CurrentPage: 1,
                        pageSize: 15,
                        addressType: that.props.type === 'Receiver' ? 0 : 1
                    }),
                    headers: header.get()
                })
                dispatch('pose', false);

                const json = await res.json();
                console.log(that.keyword)
                dispatch('total', json.data.totalPages);

                if (that._isMounted) {
                    that.setState({
                        address: json.data.items
                    }, (() => {
                        dispatch('pose', false);
                        const page = getState().CurrentPage + 1;
                        dispatch('page', page);
                    }))
                }
            } catch (e) {
                console.log(e);
            }
        })(this)
    }

    CustomTabBarPress = () => {
        setDefault();
        this.props.goBack('goback');
    }

    _keyExtractor = (child) => child.id

    onItemPress = (item) => {
        setDefault();
        this.props.goBack({
            item: { ...item },
            type: this.props.type
        });
    }
    onEndEditing = (text) => {
        this.keyword = text
        this._search()
    }
    onChangeInput = (text) => {

    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', justifyContent: "center", marginTop: Platform.OS === 'ios' ? 25 : 0 }}>
                <SearchBar backgroundColor="#bfbfbf" onEndEditing={this.onEndEditing} searchColor="white" onChangeInput={this.onChangeInput} />
                <FlatList
                    style={{ zIndex: -10, height: height - 44 - 44 - 10 }}
                    data={this.state.address}
                    renderItem={this.renderAddressItem}
                    onEndReached={() => this._load()}
                    initialNumToRender={6}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const AddressList = ModalWrapper(PageWithTab(AddressPicker, '返回'));



class AddrItem extends React.Component {

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                style={{
                    padding: 20,
                    marginBottom: 2,
                    backgroundColor: 'white',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#e9e9e9'
                }}
                onPress={() => this.props.onItemPress(item)}
            >
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: "transparent" }}>{item.n}</Text>
                    <Text style={{ backgroundColor: "transparent" }}>{item.p}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ backgroundColor: "transparent" }}>{item.a}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}