
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity, FlatList, Image, Animated, Modal, Platform, Switch } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { PageHeader } from '../../../components/PageHeader';

export class Header extends Component {
    state = {
        show: false
    }

    goBack = () => {
        this.props.navigation.goBack()
    }
    option = () => {
        if (this.props.option) this.props.option();
        this.setState({
            show: true
        })
    }

    onClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <PageHeader style={{ backgroundColor: 'white', zIndex: 10 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', top: Platform.OS === 'ios' ? 10 : 0 }}>
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
                        <Text style={{ fontSize: 18, textAlign: 'center', backgroundColor: "transparent" }}>购物车</Text>
                    </View>
                    <TouchableOpacity style={{ width: 40 }} onPress={this.option}>
                        <SimpleLineIcons name="options" size={26} style={{ backgroundColor: "transparent" }} />
                    </TouchableOpacity>
                    <Modal
                        visible={this.state.show}
                        transparent={true}
                    >
                        <View
                            style={{
                                height: 50,
                                width: 150,
                                backgroundColor: "#222222",
                                zIndex: 10,
                                right: 4,
                                position: 'absolute',
                                top: 45 + (Platform.OS === 'ios' ? 23 : 0),
                                borderRadius: 5,
                                padding: 5
                            }}
                        >
                            <SwitchWithTitle title={'显示澳币'} onValueChange={this.props.onValueChange} value={this.props.isAud} />
                        </View>
                        <TouchableOpacity style={{ height: '100%', width: '100%', position: 'absolute' }} onPress={this.onClose}>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </PageHeader>
        )
    }
}

const SwitchWithTitle = ({ title, tintColor = 'white', ...otherProps }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: tintColor }}>{title}</Text>
            <Switch {...otherProps} onTintColor='#f46e65' />
        </View>
    )
}
