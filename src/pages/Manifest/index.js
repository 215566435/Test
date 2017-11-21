/**
 * 2017/10/30 方正 创建
 * 我的订单
 */
import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { TabHead } from '../../components/Tab'
import { Spin } from '../../components/Spin'

import { All } from './Views/all'


class ManifestPage extends Component {
    static navigationOptions = {
        title: '我的订单'
    }
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
        this.props.navigation.navigate('GoodState', { id: item.i })
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: "white" }}>
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