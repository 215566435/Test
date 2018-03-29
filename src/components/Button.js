/**
 * 2017/10/27 方正 创建
 * Button组件
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2


export const Button = ({ onPress = () => void 666, disabled = false, title = '按钮', style = {}, image,backgroundColor='#f04134' }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled} >
            <View style={{
                alignItems: 'center',
                padding: 16,
                margin: 8,
                backgroundColor:backgroundColor,
                borderRadius: 4,
                ...style
            }}>
                {image}
                <Text style={ButtonStyle.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ButtonStyle = StyleSheet.create({
    before: {
        alignItems: 'center',
        padding: 16,
        margin: 8,
        backgroundColor: "#f04134",
        borderRadius: 4
    },
    title: {
        fontSize: 16,
        color: '#fff3cf',
        backgroundColor: "transparent"
    }
})

export const WechatButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <FontAwesome
                    name='wechat'
                    size={44}
                    color='#62b900'
                    style={{ backgroundColor: "transparent" }}
                />
                <Text style={{ backgroundColor: "transparent" }}>微信登陆</Text>
            </View>
        </TouchableOpacity>
    )
}
