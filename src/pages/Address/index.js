/**
 *  2017/10/31 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker, Modal, FlatList, Dimensions } from 'react-native';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { PickerView } from '../../components/Picker';
import { CustomTabBar } from '../../components/CustomTabBar';
import { SearchBar } from '../../components/SearchBar';

import { MyAddress } from './Views/address'
import { Modyfiy } from './Views/modal'

import { Url, header } from '../../util';

const { height } = Dimensions.get('window')

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

export default class Address extends Component {
    static navigationOptions = {
        title: '我的地址',
    }
    state = {
        address: null,
        addr: null,
        isEditing: false,
        isAdd: false
    }
    componentWillUnmount() {
        dispatch('pose', false);
        dispatch('page', 1);
        dispatch('total', -1);
    }
    _load = () => {
        (async function fetchAddress(that) {
            try {
                if (posting) return;
                console.log(getState().CurrentPage, getState().total)
                if (getState().CurrentPage === getState().total) return;
                dispatch('pose', true);
                const res = await fetch(Url + 'user/ListAddress2', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 0,
                        keyword: that.currentkey,
                        CurrentPage: CurrentPage,
                        pageSize: 15
                    }),
                    headers: header.get()
                })

                const json = await res.json();
                console.log(json);

                const newAddress = that.state.address ?
                    [...that.state.address, ...json.data.items] : json.data.items;

                dispatch('total', json.data.totalPages);

                that.setState({
                    address: newAddress
                })
                dispatch('pose', false);
                const page = getState().CurrentPage + 1;
                dispatch('page', page);

            } catch (e) {
                console.log(e);
            }
        })(this)
    }
    componentDidMount() {
        this.currentkey = ''
        this._load();
    }
    onEditDone = (addr) => {
        this.setState({
            isEditing: false,
            addr: null,
            address: null
        })
        dispatch('page', 1);
        dispatch('pose', false);
        dispatch('total', -1);
        this._load();
    }

    onEdit = (addr) => {
        console.log(addr)
        this.setState({
            addr: addr,
            isEditing: true
        })
    }
    onAddAddress = () => {
        this.setState({
            addr: { a: '', d: false, i: '', id: '', n: '', p: '', se: false, t: 'Receiver' },
            isEditing: true,
            isAdd: true
        })
    }

    onDelete = (addr) => {
        (async function fetchAddress(that) {
            try {
                const res = await fetch(Url + 'user/DeleteAddress', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: addr.id,
                        a: addr.a
                    }),
                    headers: header.get()
                })

                const json = await res.json();
                that.setState({
                    isEditing: false,
                    addr: null,
                    address: null
                }, () => {
                    dispatch('page', 1);
                    dispatch('pose', false);
                    dispatch('total', -1);
                    that._load();//删除后重新载入
                })
            } catch (e) {
                console.log(e);
            }
        })(this)
    }


    onEndEditing = (value) => {
        (async function fetchAddress(that) {
            try {
                if (posting) return;
                that.setState({
                    address: []
                })
                that.currentkey = value
                dispatch('page', 1);
                dispatch('pose', true);
                const res = await fetch(Url + 'user/ListAddress2', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 0,
                        keyword: value,
                        CurrentPage: CurrentPage,
                        pageSize: 15,
                        addressType: 0
                    }),
                    headers: header.get()
                })

                const json = await res.json();

                dispatch('total', json.data.totalPages);

                that.setState({
                    address: json.data.items
                })
                dispatch('pose', false);
                const page = getState().CurrentPage + 1;
                dispatch('page', page);

            } catch (e) {
                console.log(e);
            }
        })(this)
    }

    renderAddressItem = (child, index) => {
        const addr = child.item;
        if (!addr) return null;
        return <MyAddress
            type={addr.t}
            name={addr.n}
            phone={addr.p}
            key={addr.id}
            address={addr.a}
            onEdit={() => this.onEdit(addr)}
            onDelete={() => this.onDelete(addr)}
            default={addr.d}
        />
    }
    _keyExtractor = (addr, index) => addr.id



    renderAddress = () => {
        if (!this.state.address) return null;
        const address = this.state.address.filter((addr) => {
            if (addr.n !== null) {
                return addr
            }
            return addr
        })
        return (
            <View style={{ height: height - 44 - 25 - 25 - (Platform.OS === 'ios' ? 0 : 14) }}>

                {this.state.address.length !== 0 ? <FlatList
                    style={{ zIndex: -10 }}
                    data={address}
                    renderItem={this.renderAddressItem}
                    onEndReached={() => this._load()}
                    initialNumToRender={6}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                /> : <View style={{ height: "91%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, backgroundColor: "transparent", color: '#919191' }}>暂无</Text>
                    </View>
                }
                <CustomTabBar childColor={() => '#f46e65'} onPress={this.onAddAddress}>
                    <Text style={{ color: 'white' }}>新增地址</Text>
                </CustomTabBar>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={{ alignItems: "center", backgroundColor: "white" }}>
                    <SearchBar backgroundColor="#bfbfbf" onEndEditing={this.onEndEditing} searchColor="white" onChangeInput={this.onChangeInput} />
                    {this.renderAddress()}
                </View>
                <Modal
                    visible={this.state.isEditing}
                    animationType="slide"
                >
                    <Modyfiy addr={this.state.addr} done={this.onEditDone} isAdd={this.state.isAdd} />
                </Modal>
            </View>
        )
    }
}
