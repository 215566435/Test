import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';


export class Cells extends Component {
    static defaultProps = {
        style: {}
    }

    render() {
        const { txt, style } = this.props;
        return (
            <View style={{ padding: 15, backgroundColor: 'white', marginBottom: 0.5, ...style }}>
                {this.props.children}
            </View >
        )
    }
}