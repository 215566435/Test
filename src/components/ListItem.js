import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, FlatList, Text, TouchableOpacity } from 'react-native';
// import { Body } from './Views/body'


export class ListItem extends Component {

    render() {
        const { title, extra, content, onPress } = this.props;
        return (
            <TouchableOpacity
                style={{ marginVertical: 1, backgroundColor: 'white' }}
                onPress={onPress}
            >
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 18 }}>{title}</Text>
                    <Text>{extra}</Text>
                    {content}
                </View>
            </TouchableOpacity>
        )
    }
}