import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';


import { Cells } from './Cells'
import { Log } from './log'
import { Attach } from './attach'
import { Model, itemState, itemStateColor, stockState, DeliveryColor, DeliveryStatus, PackStatus, PackStatusColor } from '../model'


import { Spin } from '../../../components/Spin';

export class Content extends Component {
    static defaultProps = {
        model: null,
        log: false,
        attach: false,
        Payment: false
    }
    getGoods = () => {
        const { model } = this.props;
        const goods = model.OrderGoodsItems.map((item) => {
            const url = 'http://cdn2u.com' + item.im + `?width=${250}` + `&height=${250}` + `&constrain=${true}` + `&bgcolor=white`;
            return (
                <TouchableOpacity key={item.i} onPress={() => this.props.onGoodPress(item.gi)}>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 5, alignItems: 'center', paddingHorizontal: 5, backgroundColor: 'white', padding: 5 }}>
                        <View style={{ height: 100, width: 100, borderWidth: 0.5, alignItems: "center", justifyContent: "center", borderColor: "#bfbfbf" }}>
                            <Image
                                source={{ uri: url }}
                                style={{ height: 90, width: 90 }}
                            />
                        </View>
                        <View style={{ width: '70%', padding: 10 }}>
                            <Text >{item.sn}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ color: '#f56a00', fontSize: 18 }}>{item.c === 'RMB' ? "¥" : "$"}{item.i}</Text>
                                <Text style={{ color: '#bfbfbf' }}>{stockState[item.ss]}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: itemStateColor[item.s] }}>{itemState[item.s]}</Text>
                                <Text>数量:{item.q}</Text>
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
                            <Text style={{ color: item.i === model.Id ? '#f56a00' : 'black' }}>{`子订单${1 + index}`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Cells>
        )
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

        const time = model.CreateTime.split('T');
        return (
            <ScrollView style={{ height: '100%', backgroundColor: '#e9e9e9' }}>
                <Cells style={{ padding: 20, flexDirection: 'row', justifyContent: "space-between", backgroundColor: PackStatusColor[model.PackStatus] }}>
                    <View>
                        <Text style={{ fontSize: 18, color: 'white' }}>{model.OrderStatus === 'Paid' ? PackStatus[model.PackStatus] : '待支付'}</Text>
                        <Text style={{ color: 'white' }}>{model.Id}</Text>
                        <Text style={{ color: 'white' }}>{time[0] + '  ' + time[1].substring(0, 5)}</Text>
                    </View>
                    {model.OrderStatus === 'Paid' ? <Text style={{ color: "white" }}>已支付</Text> : (
                        <TouchableOpacity
                            disabled={model.balance > model.Price ? false : true}
                            onPress={() => Pay(model.OrderId, model.Id)}
                            style={{ width: 70, height: 55, backgroundColor: '#f56a00', alignItems: "center", justifyContent: "center", borderRadius: 5, padding: 10 }}
                        >
                            <Text style={{ color: 'white', fontSize: 12 }}>
                                {model.balance > model.Price ? '使用预存款支付' : '请到网站充值'}
                            </Text>
                        </TouchableOpacity>)
                    }

                </Cells>
                <Cells>
                    <Text style={{ color: '#f56a00' }}>总价格：{CurrencySwitcher + model.Price}</Text>
                    <Text style={{ color: '#919191' }}>商品价格：{CurrencySwitcher + model.OriginalPrice}</Text>
                    {model.Delivery !== 0 ? <Text style={{ color: '#919191' }}>快递费：{CurrencySwitcher + model.Delivery}</Text> : null}
                    {model.Insurance !== 0 ? <Text style={{ color: '#919191' }}>保险：{CurrencySwitcher + model.Insurance}</Text> : null}
                    {model.OtherPrice !== 0 ? <Text style={{ color: '#919191' }}>代发税费：{CurrencySwitcher + model.OtherPrice}</Text> : null}
                </Cells>
                <Cells>
                    <Text>物流方式：{model.IsPickup ? '现场提货' : '仓库代发'}</Text>
                </Cells>
                {model.Receiver ? (
                    <Cells>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
                            <Text>{'收件人：' + model.Receiver.n}</Text>
                            <Text>{model.Receiver.p}</Text>
                        </View>
                        <Text>{'地址：' + model.Receiver.a}</Text>
                    </Cells>) : null
                }

                {model.Packs ? this.Packs(model) : null}
                <TouchableOpacity onPress={onGetLog}>
                    <Cells>
                        <Text>{'订单历史记录'}</Text>
                    </Cells>
                </TouchableOpacity>
                <TouchableOpacity onPress={onGetAttach}>
                    <Cells>
                        <Text>{`订单附件(${model.AttachNumber})`}</Text>
                    </Cells>
                </TouchableOpacity>
                {this.getGoods()}
                <Modal
                    animationType='slide'
                    visible={log}
                >
                    <Log Return={Return} LogData={LogData} clearLog={Return} />
                </Modal>
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
                        <Text style={{ color: '#404040' }}>{'支付中...'}</Text>
                    </View>
                </View>) : null}

                <Modal
                    animationType='slide'
                    visible={attach}
                >
                    <Attach ReturnAttach={ReturnAttach} image={image} clearAttach={ReturnAttach} MarkAsSentToBuyer={this.props.MarkAsSentToBuyer} />
                </Modal>

            </ScrollView>
        )
    }
}

