
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PageHeader } from '../../../components/PageHeader';

export class Header extends Component {
    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <PageHeader style={{ backgroundColor: 'white', zIndex: 10 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', top: 10 }}>
                    <TouchableOpacity onPress={this.goBack} style={{ width: 40 }}>
                        <View
                            style={{
                                borderLeftWidth: 2,
                                borderBottomWidth: 2,
                                marginLeft: 10,
                                height: 15,
                                width: 15,
                                transform: [
                                    { rotateZ: '45deg' },
                                    { perspective: 1000 }
                                ]
                            }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>购物车</Text>
                    </View>
                    <TouchableOpacity style={{ width: 40 }} onPress={this.props.option}>
                        <SimpleLineIcons name="options" size={26} />
                    </TouchableOpacity>
                </View>
            </PageHeader>
        )
    }
}