
/**
 * 2017/11/03 方正 创建
 * 价格表的每一条记录
 */
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Spin } from '../../../components/Spin'

export class PriceItem extends React.Component {
    state = {
        onLoad: true
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.item.i !== nextProps.item.i ||
            this.props.item.n !== nextProps.item.n ||
            this.props.isShowPicture != nextProps.isShowPicture ||
            this.state.onLoad !== nextState.onLoad ||
            this.props.isAud !== nextProps.isAud ||
            this.props.isDeliveryFree !== nextProps.isDeliveryFree
    }
    onLoad = () => {
        this.setState({
            onLoad: false
        })
    }
    renderImage = (item) => (
        <View>
            <ImageBackground
                onLoadEnd={this.onLoad}
                style={{
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                source={{
                    uri: ImageHelper({
                        Url: item.i,
                        width: 60,
                        height: 60,
                        constrain: true,
                        bgcolor: 'white'
                    })
                }}
            >
                {this.state.onLoad ? <Spin /> : null}
            </ImageBackground>
        </View>
    )

    render() {
        const {
            item,
            index,
            itemClick,
            isShowPicture,
            isAud,
            isDeliveryFree
        } = this.props

        let a = isAud ? 'isAud' : 'isNotAud';
        let d = isDeliveryFree ? 'isDeliveryFree' : 'isNotDeliveryFree';

        const price = priceEditor(item)(a, d)
        return (
            <TouchableOpacity
                onPress={() => itemClick(item, index)}
            >
                <View
                    style={{
                        padding: 10,
                        height: 88,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'rgba(120,120,120,0.3)',
                        backgroundColor: 'white',
                    }}
                >
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: "center" }} >
                        {isShowPicture ? this.renderImage(item) : null}
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 8, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ width: '80%', backgroundColor: "transparent" }}>{item.n}</Text>
                            <Text style={{ color: "#f56a00", backgroundColor: "transparent" }}>{price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const priceEditor = (item) => {
    return function (aud, de) {
        const price = {
            isAud: {
                isDeliveryFree: (item.p.ai ? '$' + item.p.ai : '¥' + item.p.ri) + '(包)',
                isNotDeliveryFree: item.p.a ? '$' + item.p.a : '¥' + item.p.r
            },
            isNotAud: {
                isDeliveryFree: '¥' + item.p.ri + '(包)',
                isNotDeliveryFree: '¥' + item.p.r
            }
        }
        return price[aud][de]
    }
}


const ImageHelper = ({ Url, width, height, constrain, bgcolor }) => {
    return 'http://cdn2u.com' + Url + `?width=${width}` + `&height=${height}` + `&constrain=${constrain ? 'true' : 'false'}` + `bgcolor=${bgcolor}`
}
