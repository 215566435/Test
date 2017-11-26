/**
 * 2017/10/27 方正 创建
 * Button组件
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const Button = ({ onPress = () => void 666, disabled = false, title = '按钮', style = {}, image }) => {
    const mergeStyle = { ...style }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled} >
            <View style={{
                alignItems: 'center',
                padding: 16,
                margin: 8,
                backgroundColor: "#f04134",
                borderRadius: 4,
                ...mergeStyle
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