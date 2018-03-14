/**
* 2017/10/30 方正 创建
* 用于页面的自定义头部
* @param {*} leftBtnPress:左边按钮点击
* @param title:标题
*/
import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, Modal, Text, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { stateBarMargin } from '../util'

// import { } from 'HOC/ModalWrapper'

export class PageHeader extends React.Component {

    render() {
        const { style } = this.props
        const rawStyle = { height: stateBarMargin(43), borderBottomWidth: 0.5, borderBottomColor: 'rgba(120,120,120,0.3)', justifyContent: 'center' }
        const merge = StyleSheet.create({ merge: { ...rawStyle, ...style } })
        return (
            <View style={merge.merge}>
                {this.props.children}
            </View>
        )
    }
}



export class CustomHeader extends React.Component {
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