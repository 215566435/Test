/**
 *  2017/10/31 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { Form, FormItem } from 'component/Form'
import { Input } from 'component/Input'
import { Button } from 'component/Button'
import { Spin } from 'component/Spin'
import { PickerView } from 'component/Picker'
import { Code } from 'component/Code'


import { hostName } from 'utils';
import { HeaderWithLeftArrow } from '../Manifest';

class Password extends Component {


    static defaultProps = {
        info: ''
    }
    onSubmit = () => {
        this.props.onSubmit(this)
    }
    componentWillUnmount() {
        this.props.clearPassword()
    }

    onChangeText = (text, name) => {
        this.props.onChangeText(text, name)
    }
    onTypeChange = (value) => {
        this.props.onChangeText(value, 'country')
    }

    onGoBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { info } = this.props;

        return (
            <ScrollView style={{ height: '100%' }}>
                <HeaderWithLeftArrow title='修改密码' onPress={this.onGoBack} />
                <Input addonBefore='旧密码' name='oldpsw' password={true} onChangeText={this.onChangeText} value={info.oldpsw} />
                <Input addonBefore='新密码' name='newpsw' onChangeText={this.onChangeText} value={info.newpsw} />
                <Input addonBefore='确认新密码' name='newpsw2' onChangeText={this.onChangeText} value={info.newpsw2} />
                <Input addonBefore='验证码' name='code' onChangeText={this.onChangeText} value={info.code} />

                <Code ref={(ins) => this.ins = ins} />
                <Button title='提交' onPress={this.onSubmit} />
                <Button title='返回' style={{ backgroundColor: '#919191' }} onPress={this.onGoBack} />
            </ScrollView>
        )
    }
}

const mapState = (state) => {
    return {
        info: state.Password.info,
        success: state.Password.success
    }
}

const mapDispatch = (dispatch) => {
    return {
        onSubmit: (instance) => dispatch({ type: "PasswordSubmit", instance: instance }),
        onChangeText: (text, name) => dispatch({ type: "PasswordChangeText", text: text, name: name }),
        clearPassword: () => dispatch({ type: "clearPassword" })
    }
}

export default connect(mapState, mapDispatch)(Password)