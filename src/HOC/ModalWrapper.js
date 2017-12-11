import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Button, Modal, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native';

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

const FiltersStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    modalContainer: {
        height: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width,
        backgroundColor: 'red'
    }
});