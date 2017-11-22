import { View, Text, TouchableOpacity, Modal, FlatList, Dimensions, ScrollView } from 'react-native'
import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import { CustomTabBar } from '../../../components/CustomTabBar'
import { header, Url } from '../../../util';
import { Spin } from '../../../components/Spin';
import { Modyfiy } from '../../Address/Views/modal'


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
        type: 'Receiver'
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
        const { value, type } = this.props;
        const typeString = type === 'Receiver' ? '收件人' : '发件人';
        const containerHeight = 120;
        return (
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} bounces={false}>
                <ContentText value={value} type={type} containerHeight={containerHeight} />
                <TouchableOpacity onPress={this.onPress} style={{ width: 70, height: containerHeight, backgroundColor: '#948aec' }} >
                    <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}><Text style={{ fontSize: 15, color: 'white' }}>选取</Text></View>
                </TouchableOpacity>
                {value.n ?
                    <TouchableOpacity onPress={this.onEdit} style={{ width: 70, height: containerHeight, backgroundColor: '#f78e3d' }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}><Text style={{ fontSize: 15, color: 'white' }}>编辑</Text></View>
                    </TouchableOpacity>
                    :
                    null
                }

                <Modal
                    animationType='slide'
                    visible={isChosenVisiable}
                >
                    <AddressPicker goBack={this.onGoBack} type={type} />
                </Modal>
                <Modal
                    animationType='slide'
                    visible={isEditVisiable}
                >
                    <Modyfiy addr={value} done={this.onEditDone} />
                </Modal>
            </ScrollView >
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
                    borderBottomWidth: 0.5,
                    borderColor: 'rgba(120,120,120,0.2)',
                    height: containerHeight,
                    paddingLeft: 14,
                    alignItems: "center",
                    flexDirection: 'row',
                    width: width
                }}
            >
                <Text>{typeString}</Text>
                <View style={{ marginLeft: 20 }}>
                    <Text numberOfLines={4} style={{ color: '#bfbfbf' }}>{value.n ? null : `向左滑动选取或编辑${typeString}`}</Text>
                    <Text numberOfLines={4}  >{value.n ? '名字：' + value.n : null}</Text>
                    <Text numberOfLines={4}  >{value.p ? '电话：' + value.p : null}</Text>
                    <Text numberOfLines={4}  >{value.i ? '身份证：' + value.i : null}</Text>
                    <Text numberOfLines={4} style={{ width: 230 }}>{value ? value.a : null}</Text>
                </View>
            </View>
        )
    }
}


class AddressPicker extends Component {
    state = {
        address: null
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
                        keyword: '',
                        CurrentPage: CurrentPage,
                        pageSize: 15,
                        addressType: that.props.type === 'Receiver' ? 0 : 1
                    }),
                    headers: header.get()
                })

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
    goBack = () => {
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

    render() {
        return (
            <View style={{ backgroundColor: '#eee' }}>
                <FlatList
                    style={{ zIndex: -10, height: height - 44 }}
                    data={this.state.address}
                    renderItem={this.renderAddressItem}
                    onEndReached={() => this._load()}
                    initialNumToRender={6}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                />
                <CustomTabBar childColor={() => '#f7f7f7'} onPress={this.goBack}>
                    <View>
                        <Text>返回</Text>
                    </View>
                </CustomTabBar>
            </View>
        )
    }
}

class AddrItem extends React.Component {

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity
                style={{
                    padding: 20,
                    marginBottom: 2,
                    backgroundColor: 'white'
                }}
                onPress={() => this.props.onItemPress(item)}
            >
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>{item.n}</Text>
                    <Text>{item.p}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>{item.a}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}