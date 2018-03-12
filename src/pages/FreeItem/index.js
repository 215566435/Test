/**
 *  2018/02/20 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker, Modal, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { PickerView } from '../../components/Picker';
import { CustomTabBar } from '../../components/CustomTabBar';
import { SearchBar } from '../../components/SearchBar';

import { FlatListComponent } from '../../HOC/FlatListWithSpecs';
import { PageWithTab } from '../../HOC/PageWithTab';
import { BoxCore } from '../../components/ProductBox';
import { Pop } from '../Detail/Views/Popup';
import { ModalWrapper, ModalWithScrollWrapper } from '../../HOC/ModalWrapper';
import { ImageHelper } from '../PriceList/Views/PriceItem';

const { height } = Dimensions.get('window')


const PopUp = ModalWithScrollWrapper(Pop);

class FreeItem extends Component {

    getKey = () => {
        return this.props.navigation.state.params.key
    }

    componentDidMount() {

        this.props.dispatch({
            type: 'getFreeItem',
            payload: this.getKey()
        })
    }
    CustomTabBarPress(e, child, index) {
        this.props.navigation.goBack();
    }

    handleBoxCorePress = (item) => {
        this.props.dispatch({ type: 'fetchItems', payload: item.id });
    }

    renderFreeItems = () => {
        const { freeItems } = this.props

        if (freeItems) {
            return freeItems.map((item) => {
                return <BoxCore key={item.id} name={item.name} uri={item.image} onPress={() => this.handleBoxCorePress(item)} />
            })
        }
    }
    handleOnChange = (choosenGood) => {
        console.log(choosenGood)
        this.choosenGood = choosenGood;
    }
    handleCancelPress = () => {
        this.props.dispatch({
            type: 'closeModal'
        })
    }
    handleConfirm = () => {

        this.props.dispatch({
            type: 'handleConfirm',
            payload: {
                choosenGood: this.choosenGood,
                instance: this,
                key: this.getKey()
            }
        })
        // this.props.navigation.goBack();
    }

    render() {
        const { currentGood, modal } = this.props;
        return (
            <View style={{ height: height - 44, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.renderFreeItems()}
                </View>
                <PopUp
                    visible={modal}
                    title={currentGood.n}
                    uri={'http://cdn2u.com' + currentGood.i + '?width=140&height=140&constrain=true&bgcolor=white'}
                    property={currentGood.ss}
                    pt={currentGood.pt}
                    onChange={this.handleOnChange}
                >
                    <Button title={'确定'} onPress={this.handleConfirm} />
                    <Button title={'返回'} onPress={this.handleCancelPress} />
                </PopUp>
            </View>
        )
    }
}

const ListWtihTab = PageWithTab(FreeItem, ['返回'], ['white']);
const mapState = (state) => {

    return {
        freeItemsKey: state.Settle.freeItems,
        freeItems: state.freeitem.freeItems,
        currentGood: state.freeitem.currentGood,
        modal: state.freeitem.modal
    }
}
export default connect(mapState)(ListWtihTab);