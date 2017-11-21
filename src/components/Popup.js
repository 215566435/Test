/**
 * 2017/11/01 方正 创建
 * popup组件
 */
import React, { Component } from 'react'
import { Animated, View, Text, Dimensions, Platform, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'

const { height, width } = Dimensions.get('window')

export class Popup extends Component {
    state = {
        show: false,
    }
    static defaultProps = {
        size: 300
    }

    close = () => {
        if (this.props.close) {
            this.props.close()
        }

    }

    popup = () => {
    }

    show = () => {
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount() {
        this.popup()
    }

    render() {
        const { isPop } = this.props;
        const TabBar = this.props.TabBar
        return (
            <View>
                <Modal
                    animationType='slide'
                    visible={isPop}
                >
                    <ScrollView style={{ marginTop: Platform.OS === 'ios' ? 25 : 0 }}>
                        {this.props.children}
                    </ScrollView>
                    {TabBar}
                </Modal>
            </View>
        )
    }
}