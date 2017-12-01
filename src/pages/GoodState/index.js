import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { connect } from 'react-redux';

import { Content } from './Views/Content'
import { Model } from './model'
import { CustomTabBar } from '../../components/CustomTabBar'

class GoodState extends Component {

    componentDidMount() {
        const id = this.props.navigation.state.params.id
        this.props.fetchGoodState(id)
    }
    componentWillUnmount() {
        this.props.clearGoodState()
    }
    Pay = (OrderId, Id) => {
        Alert.alert(
            '确认支付',
            '点击确定，确认支付',
            [
                { text: '取消', style: 'cancel' },
                { text: '确定', onPress: () => this.props.Pay(OrderId, Id) },
            ],
            { cancelable: false }
        )
    }
    navigationTabBarPress = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        return (
            <View>
                <Content
                    model={this.props.model}
                    onGetLog={this.props.onGetLog}
                    log={this.props.log}
                    Return={this.props.Return}
                    LogData={this.props.LogData}
                    onGetAttach={this.props.GetAttach}
                    attach={this.props.attach}
                    image={this.props.image}
                    ReturnAttach={this.props.ReturnAttach}
                    onChildPress={this.props.fetchGoodState}
                    onGoodPress={(id) => this.props.onGoodPress(id, this)}
                    Pay={this.Pay}
                    Payment={this.props.Payment}
                    MarkAsSentToBuyer={this.props.MarkAsSentToBuyer}
                />
                <CustomTabBar onPress={this.navigationTabBarPress}>
                    <Text>返回</Text>
                </CustomTabBar>
            </View>
        )
    }
}

function mapState(state) {
    const model = state.GoodState.model ? new Model(state.GoodState.model) : {};
    return {
        model: model,
        log: state.GoodState.log,
        LogData: state.GoodState.LogData,
        image: state.GoodState.image,
        attach: state.GoodState.attach,
        Payment: state.GoodState.Payment
    }
}

function mapDispatch(dispatch) {
    return {
        fetchGoodState: (id) => dispatch({ type: "fetchGoodState", id: id }),
        onGetLog: () => dispatch({ type: "GetLog" }),
        GetAttach: () => dispatch({ type: "GetAttach" }),
        Return: () => dispatch({ type: 'LogReturn' }),
        ReturnAttach: () => dispatch({ type: 'ReturnAttach' }),
        onGoodPress: (id, that) => dispatch({ type: 'onGoodPress', id: id, instance: that }),
        Pay: (OrderId, Id) => dispatch({ type: "Pay", OrderId: OrderId, Id: Id }),
        clearGoodState: () => dispatch({ type: 'clearGoodState' }),
        MarkAsSentToBuyer: () => dispatch({ type: "MarkAsSentToBuyer" })
    }
}


export default connect(mapState, mapDispatch)(GoodState)