/**
 * 2017/10/31 方正 创建
 * Form表单组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export class Form extends Component {
    renderFormItem = () => {
        return React.Children.map(this.props.children, (child) => {
            const onlyOne = React.Children.only(child)
            const Props = { ...onlyOne.props }
            if (onlyOne.type.displayName !== 'FormItem') {
                console.warn('You may use <FormItem /> as the children of a Form Element')
                return null
            }
            if (Props.type === 'submit') {
                Props.submit = this.onSubmit
            }
            return React.createElement(onlyOne.type, Props, onlyOne.props.children)
        })
    }
    onSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit()
        }
    }

    render() {
        const { onSubmit } = this.props
        return (
            <View>{this.renderFormItem()}</View>
        )
    }
}

const noob = () => { }

export class FormItem extends Component {
    static displayName = 'FormItem';

    onSubmit = (onPressOnButton, e) => {
        onPressOnButton(e)
        if (this.props.submit) {
            this.props.submit()
        }
    }

    render() {
        console.log('50')
        const onlyOne = React.Children.only(this.props.children)
        let onlyOneProps = { ...onlyOne.props }
        if (this.props.type === 'submit') {
            const onPressOnButton = onlyOneProps.onPress || noob
            onlyOneProps.onPress = (e) => this.onSubmit(onPressOnButton, e)
        }


        const el = React.createElement(onlyOne.type, onlyOneProps, onlyOne.children);
        return <View>{el}</View>
    }
}