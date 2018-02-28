import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, Platform } from 'react-native';
import { Cells, NewCell } from './Cells'
import { Log } from './log'
import { Attach } from './attach'
import { Model, itemState, itemStateColor, stockState, DeliveryColor, DeliveryStatus, PackStatus, PackStatusColor } from '../model';
import { Spin } from 'component/Spin';
import { height, timeSplit } from 'utils';
import { ModalWrapper } from 'HOC/ModalWrapper';

const LogHistory = ModalWrapper(Log);
const Attachment = ModalWrapper(Attach);

export class Content extends Component {
    static defaultProps = {
        model: null,
        log: false,
        attach: false,
        Payment: false
    }
    getGoods = () => {
        const { model } = this.props;
        const goods = model.OrderGoodsItems.map((item,index) => {
            const url = 'http://cdn2u.com' + item.im + `?width=${250}` + `&height=${250}` + `&constrain=${true}` + `&bgcolor=white`;
            return (
                <TouchableOpacity key={index} onPress={() => this.props.onGoodPress(item.gi)}>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 5, alignItems: 'center', paddingHorizontal: 5, backgroundColor: 'white', padding: 5 }}>
                        <View style={{ height: 100, width: 100, borderWidth: 0.5, alignItems: "center", justifyContent: "center", borderColor: "#bfbfbf" }}>
                            <Image
                                source={{ uri: url }}
                                style={{ height: 90, width: 90 }}
                            />
                        </View>
                        <View style={{ width: '70%', padding: 10 }}>
                            <Text style={{ backgroundColor: "transparent" }}>{item.sn}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: '#f56a00', fontSize: 18, backgroundColor: "transparent" }}>{item.c === 'RMB' ? "¥" : "$"}{item.i}</Text>
                                <Text style={{ color: '#bfbfbf', backgroundColor: "transparent" }}>{stockState[item.ss]}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: itemStateColor[item.s], backgroundColor: "transparent" }}>{itemState[item.s]}</Text>
                                <Text style={{ backgroundColor: "transparent" }}>数量:{item.q}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return goods
    }

    Packs = (model) => {
        return (
            <Cells style={{ flexDirection: 'row' }}>
                {model.Packs.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={{ marginLeft: index > 0 ? 10 : 0 }} onPress={() => this.props.onChildPress(item.i)}>
                            <Text style={{ color: item.i === model.Id ? '#f56a00' : 'black', backgroundColor: "transparent" }}>{`子订单${1 + index}`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Cells>
        )
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
        } = this.props;

        if (!model.CreateTime) return <Spin />;


        const CurrencySwitcher = model.Currency === 'RMB' ? '¥' : "$";
        const { date, time } = timeSplit(model.CreateTime);
        return (
            <ScrollView style={{ height: height - 44 - (Platform.OS === 'ios' ? 0 : 24), backgroundColor: '#e9e9e9' }}>
                <Cells style={{ padding: 20, flexDirection: 'row', justifyContent: "space-between", backgroundColor: PackStatusColor[model.PackStatus] }}>
                    <View>
                        <Text style={{ fontSize: 18, color: 'white', backgroundColor: "transparent" }}>
                            {model.OrderStatus === 'Paid' ? PackStatus[model.PackStatus] : model.OrderStatus === 'Cancelled' ? PackStatus[model.PackStatus] : '待支付'}
                        </Text>
                        <Text style={{ color: 'white', backgroundColor: "transparent" }}>{model.Id}</Text>
                        <Text style={{ color: 'white', backgroundColor: "transparent" }}>{date + '  ' + time}</Text>
                    </View>
                    {model.OrderStatus === 'Paid' ? <Text style={{ color: "white", backgroundColor: "transparent" }}>已支付</Text> : (
                        <TouchableOpacity
                            disabled={model.balance > model.Price ? false : true}
                            onPress={() => Pay(model.OrderId, model.Id)}
                            style={{ width: 70, height: 55, backgroundColor: '#f56a00', alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 10 }}
                        >
                            <Text style={{ color: 'white', fontSize: 12, backgroundColor: "transparent" }}>
                                {model.balance > model.Price ? '使用预存款支付' : '请到网站充值'}
                            </Text>
                        </TouchableOpacity>)
                    }
                </Cells>
                <NewCell
                    renderProps={[
                        `总价格：${CurrencySwitcher + model.Price}`,
                        `商品价格：${CurrencySwitcher + model.OriginalPrice}`,
                        model.Delivery !== 0 ? `快递费：${CurrencySwitcher + model.Delivery}` : null,
                        model.Insurance !== 0 ? `保险：${CurrencySwitcher + model.Insurance}` : null,
                        model.OtherPrice !== 0 ? `代发税费：${CurrencySwitcher + model.OtherPrice}` : null
                    ]}
                    TextColors={[
                        '#fa8c16',
                        'rgba(0, 0, 0, 0.45)',
                        'rgba(0, 0, 0, 0.45)',
                        'rgba(0, 0, 0, 0.45)',
                        'rgba(0, 0, 0, 0.45)'
                    ]}
                />
                <NewCell renderProps={`物流方式：${model.IsPickup ? '现场提货' : '仓库代发'}`} />
                {model.Receiver ? (
                    <Cells>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ backgroundColor: "transparent" }}>{'收件人：' + model.Receiver.n}</Text>
                            <Text style={{ backgroundColor: "transparent" }}>{model.Receiver.p}</Text>
                        </View>
                        <Text style={{ backgroundColor: "transparent" }}>{'地址：' + model.Receiver.a}</Text>
                    </Cells>) : null
                }

                {model.Packs ? this.Packs(model) : null}
                <NewCell onPress={onGetLog} renderProps='订单历史记录' />
                <NewCell onPress={onGetAttach} renderProps={`订单附件(${model.AttachNumber})`} />
                {/* <NewCell onPress={this.onSupportTicketPress} renderProps={'信息反馈'} /> */}
                {this.getGoods()}
                <LogHistory visible={log} Return={Return} LogData={LogData} clearLog={Return} />
                <Attachment visible={attach} ReturnAttach={ReturnAttach} image={image} clearAttach={ReturnAttach} MarkAsSentToBuyer={this.props.MarkAsSentToBuyer} />
                {Payment ? (<View style={{ height: '100%', width: '100%', position: 'absolute', alignItems: "center", justifyContent: "center" }}>
                    <View style={{
                        height: 150,
                        width: 150,
                        backgroundColor: "white",
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 0.5,
                        borderColor: "#fccca7"
                    }}>
                        <Spin />
                        <Text style={{ color: '#404040', backgroundColor: "transparent" }}>{'支付中...'}</Text>
                    </View>
                </View>) : null}
            </ScrollView>
        )
    }
}

