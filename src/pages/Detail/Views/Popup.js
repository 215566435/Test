import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';

import { Spin } from '../../../components/Spin';
import { Stepper } from '../../../components/Stepper';
import { CDN_URL } from '../../../NetworkManager/CdnManager';



export class Pop extends Component {
    state = {
        x: 0,
        y: 0,
        imageIndex:0
    }

    choose = (x, y) => {
        const { property, onChange } = this.props;
        if (onChange) onChange(property[x][y]);
        
        const index = property[x][y].i
        this.setState({
            x: x,
            y: y,
            imageIndex:index?index:0
        })
    }

    render() {
        const { title, uri, property, onChange,goodsImage } = this.props;
        const { x, y } = this.state;
        var fixProperty = property !== void 666 ? property[x][y] : null;
        if (!fixProperty) {
            for (const i in property[x]) {
                if (property[x][i] !== null) {
                    fixProperty = property[x][i]
                    break;
                }
            }
        }
       
        var name = fixProperty ? (fixProperty.n === '' ? '默认型号' : fixProperty.n) : '默认型号';
        if (onChange && fixProperty) onChange(fixProperty);

        if (!fixProperty) return null;
        return (
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View >
                        <Image resizeMode='contain' style={{ height: 100, width: 100 }} source={{ uri:CDN_URL+ goodsImage[this.state.imageIndex]+`?width=${300}` + `&height=${300}` }} />
                    </View>
                    <View style={{ marginLeft: 10, width: 200, padding: 5, justifyContent: 'center' }}>
                        <Text style={{ backgroundColor: "transparent" }}>{title}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ backgroundColor: "transparent" }}>所选型号:</Text>
                    <Text style={{ color: '#f46e65', backgroundColor: "transparent" }}>{name}</Text>
                </View>
                <Text style={{ color: '#f46e65', backgroundColor: "transparent" }}>{(fixProperty.expiry? '保质期：'+fixProperty.expiry:'')}</Text>
                <Spes property={property} pt={this.props.pt} choose={this.choose} />
                <PriceQuntity au={fixProperty.ap.a} rmb={fixProperty.ap.r} quntity={fixProperty.st} />
                {this.props.children}
            </View>
        )
    }
}

class PriceQuntity extends Component {
    static defaultProps = {
        au: '',
        rmb: '',
        quntity: ''
    }
    shouldComponentUpdate(nextProps) {
        const { au, rmb, quntity } = this.props;
        return au !== nextProps.au ||
            rmb !== nextProps.rmb ||
            quntity !== nextProps.quntity
    }
    render() {
        const { au, rmb, quntity } = this.props;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ backgroundColor: "transparent" }}>价格：</Text>
                    <Text style={{ fontSize: 18, color: '#f78e3d', backgroundColor: "transparent" }}>$ {au}</Text>
                    <Text style={{ marginLeft: 8, fontSize: 18, color: '#f78e3d', backgroundColor: "transparent" }}>¥ {rmb}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ backgroundColor: "transparent" }}>库存数量：</Text>
                    <Text style={{ fontSize: 18, color: '#919191', backgroundColor: "transparent" }}>{quntity <= 0 ? 0 : quntity}</Text>
                </View>
            </View>
        )
    }
}

const colorHelper = {
    ByBook: '#fa90ba',
    OutStock: '#f79992',
    NotForSale: '#919191',
    InStock: '#76d0a3',
    null: 'black'
}
const displayHelper = (s, number) => {
    const Helper = {
        ByBook: '预定',
        OutStock: '缺货',
        NotForSale: '下架',
        InStock: number,
        null: '无效'
    }

    return Helper[s]
}

const getChosenColor = (i, j, x, y) => {
    let chosen;
    if (i === x && j === y) {
        chosen = '#f78e3d';
    } else if (i === x) {
        chosen = '#fde3cf';
    } else if (j === y) {
        chosen = '#fde3cf';
    } else {
        chosen = 'white'
    }
    return chosen;
}

const maxSize = (item) => {
    let max = 0;
    item.forEach((itm) => {
        max = itm.length > max ? itm.length : max;
    })
    if (max > 20) max = 20;
    return Math.max(30, max * 6);
}

class RowItem extends Component {

    shouldComponentUpdate(nextProps) {
        const { color, stock, chosen, stockWidth, state } = this.props;

        return color !== nextProps.color ||
            chosen !== nextProps.chosen ||
            state !== nextProps.state

    }

    render() {
        const { color, stock, chosen, stockWidth, state } = this.props;
        const fontSize = Platform.OS === 'ios' ? 12 : 8;

        return (
            <TouchableOpacity activeOpacity={0.4} disabled={stock === 'null' ? true : false} onPress={this.props.onPress} style={{ backgroundColor: chosen, padding: 2 }}>
                <View style={{ width: stockWidth, height: stockWidth, borderRadius: stockWidth / 2, backgroundColor: colorHelper[state], alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontSize: fontSize, backgroundColor: "transparent" }}>{stock >= 99 ? '99+' : displayHelper(state, stock)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class Spes extends Component {
    state = {
        x: 0,
        y: 0
    }
    renderTwo = () => {
        const { property, pt } = this.props;

        if (!property) return <Spin />;
        const HowManyProperty = pt.map((item) => {
            return item.v.length
        })
        const x = HowManyProperty[0];
        const y = HowManyProperty[1];
        let map = []
        let colorLength = maxSize(pt[0].v) * 1.2, stockWidth = Platform.OS === 'ios' ? 30 : 25;


        for (let i = 0; i < x; i++) {
            let row = [];
            for (let j = 0; j < y; j++) {
                if (!property[i][j]) {

                    row.push(
                        <RowItem stockWidth={stockWidth} stock={'null'} state={'null'} key={j} />
                    )
                    continue;
                };
                const stock = property[i][j].st;
                const state = property[i][j].s;

                let chosen;
                if (i === this.state.x && j === this.state.y) {
                    chosen = '#f78e3d';
                } else if (i === this.state.x) {
                    chosen = '#fde3cf';
                } else if (j === this.state.y) {
                    chosen = '#fde3cf';
                } else {
                    chosen = 'white'
                }

                row.push(
                    <RowItem stockWidth={stockWidth} stock={stock} state={state} key={j} onPress={() => { this.onPress(i, j) }} chosen={chosen} />
                )
            }
            const color = pt[0].v[i];

            map.push(
                <View key={i} style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', width: colorLength, fontSize: 12, backgroundColor: "transparent" }} adjustsFontSizeToFit numberOfLines={1}>{color}</Text>
                    {row}
                </View>
            )
        }


        const sizeAry = [0, ...pt[1].v];
        const size = sizeAry.map((item, index) => {
            return (
                <View key={item} style={{ padding: 2 }}>
                    <Text style={{ color: 'black', width: index === 0 ? colorLength : stockWidth, backgroundColor: "transparent" }}>{item === 0 ? null : item}</Text>
                </View>
            )
        })
        return (
            <ScrollView horizontal={true} >
                <View>
                    <Text style={{ color: '#bfbfbf', fontSize: 12 }}>型号选择区域可左右滚动哟⬅️➡️</Text>
                    <View style={{ flexDirection: 'row' }}>{size}</View>
                    {map}
                </View>
            </ScrollView>
        )
    }

    renderOne = () => {
        const { property, pt } = this.props;
        const { x, y } = this.state;
        if (!property) return <Spin />;
        const fontSize = pt[0] ? maxSize(pt[0].v) * 2.3 : null;
        const table = property[0].map((item, index) => {
            const stock = item.st;
            const state = item.s;
            const name = item.n;
            if (item.st === void 666) return null;
            return (
                <View key={item.n} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{ width: fontSize, fontSize: 12, backgroundColor: "transparent" }}
                    >
                        {name}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={{ backgroundColor: getChosenColor(0, index, x, y), padding: 3, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.onPress(0, index)}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 5,
                                borderRadius: 15,
                                backgroundColor: colorHelper[state],
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 12, backgroundColor: "transparent" }}>{stock >= 99 ? '99+' : displayHelper(state, stock)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        })
        return <View>{table}</View>;
    }

    onPress = (x, y) => {
        const { property } = this.props;
        this.setState({
            x: x,
            y: y
        })
        if (this.props.choose) {
            this.props.choose(x, y);
        }
    }
    render() {
        const { property, pt } = this.props;

        if (!property) return <Spin />;
        return property.length === 1 ? this.renderOne() : this.renderTwo();
    }
}
