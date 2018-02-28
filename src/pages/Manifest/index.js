/**
 * 2017/10/30 方正 创建
 * 我的订单
 */
import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { TabHead } from 'component/Tab'
import { Spin } from 'component/Spin'

import { All } from './Views/all'
import { PageHeader } from 'component/PageHeader';
import { width } from 'utils';


export const HeaderWithLeftArrow = ({ onPress, title }) => {

    return (
        <PageHeader>
            <View style={{ alignItems: 'center', flexDirection: 'row', top: Platform.OS === 'ios' ? 10 : 0 }}>
                <TouchableOpacity onPress={onPress} style={{ width: 40 }}>
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
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        backgroundColor: "transparent",
                        width: width - 80,
                    }}
                >
                    {title}
                </Text>
            </View>
        </PageHeader>
    )
}

class ManifestPage extends Component {

    static defaultProps = {
        orderList: [],
        spin: false
    }
    state = {
        ActivateIndex: 0
    }
    componentDidMount() {
        this.props.fetch(0)
    }

    componentWillUnmount() {
        this.props.clear();
    }
    onTabChange = (e, child, index) => {
        this.props.fetch(index)
        this.setState({
            ActivateIndex: index
        })
    }
    onItemPress = (item) => {
        this.props.navigation.navigate('GoodState', { id: item.i, messageId: -1 })
    }

    goBack = () => this.props.navigation.goBack(null);

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: "white" }}>
                <HeaderWithLeftArrow title={'订单详情'} onPress={this.goBack} />
                <TabHead
                    tabItem={['全部', '待付款', '待发货', '待收货', '已收货']}
                    onPress={this.onTabChange}
                    ActivateIndex={this.state.ActivateIndex}
                />
                <View style={{ justifyContent: "center", alignItems: this.props.spin ? 'center' : null }}>
                    {this.props.spin ? <Spin /> : <All list={this.props.orderList} append={() => { this.props.appendData(this.state.ActivateIndex) }} onPress={this.onItemPress} />}
                </View>
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        orderList: state.Manifest.list,
        spin: state.Manifest.spin
    }
}

const mapDispatch = (dispatch) => {

    return {
        fetch: (select) => dispatch({ type: 'fetchData', select: select }),
        clear: () => dispatch({ type: "clearManifest" }),
        appendData: (select) => dispatch({ type: 'appendData', select: select }),
        onPress: (item) => dispatch({ type: 'itemPress', item: item })
    }
}

export default connect(mapState, mapDispatch)(ManifestPage)