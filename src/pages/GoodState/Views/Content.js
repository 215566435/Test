import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    Platform
} from 'react-native'
import { Cells, NewCell } from './Cells'
import { Log } from './log'
import { Attach } from './attach'
import {
    Model,
    itemState,
    itemStateColor,
    stockState,
    DeliveryColor,
    DeliveryStatus,
    PackStatus,
    PackStatusColor
} from '../model'
import { Spin } from '../../../components/Spin'
import { height, timeSplit } from '../../../util'
import { ModalWrapper } from '../../../HOC/ModalWrapper'

const LogHistory = ModalWrapper(Log)
const Attachment = ModalWrapper(Attach)

export class Content extends Component {
    static defaultProps = {
        model: null,
        log: false,
        attach: false,
        Payment: false
    }

    onSupportTicketPress = () => {
        this.props.navigation.navigate('Feedback')
    }

    render() {
        const {
            model,
            onGetLog,
            log,
            Return,
            LogData,
            onGetAttach,
            attach,
            image,
            ReturnAttach,
            Pay,
            Payment
        } = this.props

        if (!model.CreateTime) return <Spin />

        const CurrencySwitcher = model.Currency === 'RMB' ? '¥' : '$'
        const { date, time } = timeSplit(model.CreateTime)

        return (
            <ScrollView
                style={{
                    height: height - 44 - (Platform.OS === 'ios' ? 0 : 24),
                    backgroundColor: '#e9e9e9'
                }}
            >
                {model.Packs ? this.Packs(model) : null}
                <NewCell onPress={onGetLog} renderProps="订单历史记录" />
                <NewCell
                    onPress={onGetAttach}
                    renderProps={`订单附件(${model.AttachNumber})`}
                />

                {/* <NewCell onPress={this.onSupportTicketPress} renderProps={'信息反馈'} /> */}
                {this.getGoods()}
                <LogHistory
                    visible={log}
                    Return={Return}
                    LogData={LogData}
                    clearLog={Return}
                />
                <Attachment
                    visible={attach}
                    ReturnAttach={ReturnAttach}
                    image={image}
                    clearAttach={ReturnAttach}
                    MarkAsSentToBuyer={this.props.MarkAsSentToBuyer}
                />
                {Payment ? (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                height: 150,
                                width: 150,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 0.5,
                                borderColor: '#fccca7'
                            }}
                        >
                            <Spin />
                            <Text
                                style={{
                                    color: '#404040',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                {'支付中...'}
                            </Text>
                        </View>
                    </View>
                ) : null}
            </ScrollView>
        )
    }
}
