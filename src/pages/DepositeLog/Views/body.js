import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, ImageBackground } from 'react-native';

import { Spin } from '../../../components/Spin';



const { height, width } = Dimensions.get('window');



export class Body extends Component {
    static defaultProps = {

    }
    state = {

    }


    componentWillUnmount() {
        this.props.clearDeposite()
    }
    renderAddressItem = (child, index) => {
        const item = child.item;
        return (
            <View style={{ borderBottomColor: '#e9e9e9', borderBottomWidth: 0.5, marginTop: 10, flexDirection: 'row', justifyContent: "space-between", padding: 10 }}>
                <View >
                    {item.content ? <Text>{item.content}</Text> : <Text>{item.type}</Text>}
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: '#919191' }}>{item.date}</Text>
                        <Text style={{ marginLeft: 15, color: "#919191" }}>{item.time}</Text>
                    </View>
                </View>
                <Text style={{ color: item.depositChange > 0 ? '#00a854' : '#404040', fontSize: 18 }}>{item.depositChangeStr}</Text>
            </View>
        )
    }
    _keyExtractor = (item) => item.id
    
    render() {
        const { Deposite } = this.props;

        if (!Deposite) return <Spin />
        return (
            <FlatList
                data={Deposite}
                renderItem={this.renderAddressItem}
                onEndReached={() => this.props.appendDeposite()}
                initialNumToRender={6}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.1}
            />
        )
    }
}