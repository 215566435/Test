import { View, Text, TouchableOpacity, Modal, FlatList, Dimensions, ScrollView, Platform } from 'react-native'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import { CustomTabBar } from '../../../components/CustomTabBar'
import { header, Url } from '../../../util';
import { Spin } from '../../../components/Spin';
import { SearchBar } from '../../../components/SearchBar';
import { ModalWrapper } from 'HOC/ModalWrapper';
import { PageWithTab } from 'HOC/PageWithTab';
import { FlatListComponent } from 'HOC/FlatListWithSpecs';


const { height, width } = Dimensions.get('window')

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
        this.props.navigation.navigate('AddressEditPage', {
            isAdd: false,
            type: this.props.type,
            address: this.props.value.a,
            default: this.props.value.d,
            name: this.props.value.n,
            id: this.props.value.i,
            select: this.props.value.se,
            serverID: this.props.value.id,
            phone: this.props.value.p
        });
    }
    onAdd = () => {
        this.props.navigation.navigate('AddressEditPage', {
            isAdd: true,
            type: this.props.type
        });
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
                backgroundColor: "white"
            }}>
                <ContentText value={value} type={type} containerHeight={containerHeight} />
                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity onPress={this.onPress} style={{ backgroundColor: '#948aec', borderRadius: 5 }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 15, padding: 2, color: 'white', backgroundColor: "transparent" }}>选取</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onEdit} style={{ marginLeft: 10, backgroundColor: '#f78e3d', borderRadius: 5 }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 15, padding: 2, color: 'white', backgroundColor: "transparent" }}>编辑</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <AddressList visible={isChosenVisiable} goBack={this.onGoBack} type={type} />
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


class AddressPicker extends FlatListComponent {
    componentDidMount() {
        this.props.dispatch({
            type: "fetchSettleAddress",
            PersonType: this.props.type
        })
    }
    renderItem = ({ item, index }) => {
        return <AddrItem item={item} onItemPress={this.onItemPress} />
    }
    onEndReached = () => {
        this.props.dispatch({
            type: "appendSettleAddress",
            PersonType: this.props.type
        })
    }
    keyExtractor = (item) => item.id
    dataSource = () => this.props.address;
    onItemPress = (item) => {
        this.props.goBack({
            item: { ...item },
            type: this.props.type
        });
    }
}

class CompositeAddressPicker extends Component {
    CustomTabBarPress = () => {
        this.props.goBack('goback');
    }
    onEndEditing = (text) => {
        this.props.dispatch({
            type: "addressSettleSearch",
            keyword: text,
            PersonType: this.props.type
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', justifyContent: "center", height: '100%' }}>
                <View style={{ marginTop: 10, height: height - 25 - 44 - 44 }}>
                    <SearchBar backgroundColor="#bfbfbf" onEndEditing={this.onEndEditing} searchColor="white" />
                    <AddressPicker {...this.props} />
                </View>
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        ...state.Settle
    }
}

const wrapper = ModalWrapper(PageWithTab(CompositeAddressPicker, '返回'));
const AddressList = connect(mapState)(wrapper)



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