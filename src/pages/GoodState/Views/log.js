import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Cells } from './Cells'

import { CustomTabBar } from '../../../components/CustomTabBar'
import { Spin } from '../../../components/Spin';

const { height } = Dimensions.get('window')
export class Log extends Component {

    componentWillUnmount() {
        this.props.clearLog()
    }

    renderCells = () => {
        if (!this.props.LogData) return <Spin />

        return this.props.LogData.map((item) => {
            const time = item.t.split('T');

            return (
                <Cells key={item.i} style={{ backgroundColor: 'white' }}>
                    <Text style={{ backgroundColor: "transparent" }}>{item.c}</Text>
                    <Text style={{ color: '#bfbfbf', backgroundColor: "transparent" }}>{`${time[0]}   ${time[1].substring(0, 8)}`}</Text>
                </Cells>
            )
        })

    }

    render() {
        const { Return } = this.props;
        const margin = Platform.OS === 'ios' ? 25 : 0;
        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: height - 44 - margin, marginTop: margin, backgroundColor: '#f5f5f5' }}>
                    <ScrollView>
                        {this.renderCells()}
                    </ScrollView>
                </View>
                <CustomTabBar onPress={Return}>
                    <Text style={{ backgroundColor: "transparent" }}>返回</Text>
                </CustomTabBar>
            </View>
        )
    }
}
