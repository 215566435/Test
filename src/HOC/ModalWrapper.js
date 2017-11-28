import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Button, Modal, AsyncStorage, Alert } from 'react-native';

/**
 * 当使用这个HOC的时候，会使得组件获得在modal的能力
 * @param {*} Component :组件
 */

export const ModalWrapper = (Component) => {
    return class Wrapper extends Component {
        render() {
            const { visible, ...others } = this.props;
            return (
                <Modal
                    animationType='slide'
                    visible={visible}
                    onRequestClose={() => { }}
                >
                    <Component {...others} />
                </Modal>
            )
        }
    }
}