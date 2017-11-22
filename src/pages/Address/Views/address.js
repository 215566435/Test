

import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, TouchableOpacity, Alert } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2


export class MyAddress extends Component {

    onDelete = () => {
        Alert.alert(
            '删除',
            '确定删除地址，删除之后无法再恢复',
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                        if (this.props.onDelete) this.props.onDelete()
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { onDelete, onEdit } = this.props;
        const type = this.props.type === "Receiver" ? '收件人' : '发件人';
        return (
            <View style={{ padding: 20, backgroundColor: 'white', marginBottom: 4, borderBottomWidth: 0.5, borderBottomColor: '#d9d9d9' }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ color: '#5a5a5a' }}>{type + '：'}{this.props.name}</Text>
                    <Text style={{ color: '#5a5a5a' }}>{this.props.phone}</Text>
                </View>
                <Text numberOfLines={4} style={{ color: '#5a5a5a' }}>{this.props.address}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Icon title='编辑' name='edit' onPress={onEdit} />
                    <Icon title='删除' name='bitbucket' onPress={this.onDelete} />
                    <Text>{this.props.default ? '默认收件人' : null}</Text>
                </View>
            </View>
        )
    }
}

class Icon extends Component {

    render() {
        const { title, name, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: 'row',
                    marginRight: 25,
                    alignItems: 'center'
                }}
            >
                <FontAwesome name={name} size={20} color={'#5a5a5a'} />
                <Text style={{ color: '#919191' }}>{title}</Text>
            </TouchableOpacity>
        )
    }
}