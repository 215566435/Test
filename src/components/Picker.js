/**
 * 2017/11/03 方正 创建
 * Picker组件
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Dimensions, Picker } from 'react-native';
import { Button } from './Button'
const { height, width } = Dimensions.get('window')

export class PickerView extends Component {
    value = []
    static defaultProps = {
        size: 'default',
        value: 'default'
    }
    state = {
        pickerShow: false,
        selectValue: ''
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectValue: nextProps.value
        })
    }
    componentDidMount() {
        this.setState({
            selectValue: this.props.value ? this.props.value : this.value[0]
        })
    }

    onPress = () => {
        this.setState({
            pickerShow: !this.state.pickerShow
        })
    }
    renderPickerItem = () => {
        const children = React.Children.map(this.props.children, (child) => {
            this.value = [...this.value, child.props.value]
            return child
        })
        return children
    }
    onValueChange = (value, index) => {
        if (this.props.onValueChange)
            this.props.onValueChange(value);
        this.setState({
            selectValue: value
        })
    }
    render() {
        const size = {
            large: 14,
            small: 10,
            default: 12
        }
        const {
            addonBefore,
            onFocus,
            placeholder
        } = this.props
        return (
            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderColor: 'rgba(120,120,120,0.2)',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.pickerShow}
                >
                    <TouchableOpacity
                        onPress={this.onPress}
                        style={{ height: height - 300 }}
                        activeOpacity={1}
                    />
                    <View style={{
                        height: 300,
                        backgroundColor: '#f5f5f5'
                    }}>
                        <Picker
                            onValueChange={this.onValueChange}
                            selectedValue={this.state.selectValue}
                        >
                            {this.renderPickerItem()}
                        </Picker>
                        <Button title='确认' onPress={this.onPress} />
                    </View>

                </Modal>
                {addonBefore ?
                    <Text style={{ width: 80, backgroundColor: "transparent", paddingLeft: 14, fontSize: 12, paddingTop: size[this.props.size], paddingBottom: size[this.props.size] }}>
                        {addonBefore}</Text> : null}
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        width: "60%",
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            backgroundColor: "transparent"
                        }}
                    >
                        {this.state.selectValue}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export const PickerCreator = ({ addonBefore = '', defaultValue, onValueChange, dataSet }) => {

    return (
        <PickerView addonBefore={addonBefore} value={defaultValue} onValueChange={onValueChange}>
            {dataSet.map((data, index) => {
                return <Picker.Item key={index} label={data} value={data} />
            })}
        </PickerView>
    )
}
