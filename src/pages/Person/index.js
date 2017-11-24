/**
 *  2017/10/31 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker } from 'react-native';
import { connect } from 'react-redux';

import { Form, FormItem } from '../../components/Form'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Spin } from '../../components/Spin'
import { PickerView } from '../../components/Picker'

class Person extends Component {
    static navigationOptions = {
        title: '个人信息'
    }

    onSubmit = () => {
        this.props.onSubmit(this)
    }
    componentDidMount() {
        this.props.fetchPerson()
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
        if (!info) return <Spin />
        console.log(this.props.country)
        return (
            <ScrollView style={{ height: '100%' }}>
                <Input addonBefore='昵称' name='name' onChangeText={this.onChangeText} value={info.name} />
                <Input addonBefore='手机号码' name='phone' onChangeText={this.onChangeText} value={info.phone} />
                <Input addonBefore='电子邮件' name='email' onChangeText={this.onChangeText} value={info.email} />
                <PickerView addonBefore='国家' value={info.country || '中国'} onValueChange={this.onTypeChange}>
                    <Picker.Item label="中国" value="中国" />
                    <Picker.Item label="新西兰" value="新西兰" />
                    <Picker.Item label="澳大利亚" value="澳大利亚" />
                    <Picker.Item label="其他国家" value="其他国家" />
                </PickerView>
                <Input addonBefore='微信' name='wechat' onChangeText={this.onChangeText} value={info.wechat} />
                <Button title='提交' onPress={this.onSubmit} />
                <Button title='返回' style={{ backgroundColor: '#919191' }} onPress={this.onGoBack} />
            </ScrollView>
        )
    }
}

const mapState = (state) => {
    return {
        info: state.Person
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPerson: () => dispatch({ type: "fetchPerson" }),
        onSubmit: (instance) => dispatch({ type: "personSubmit", instance: instance }),
        onChangeText: (text, name) => dispatch({ type: "personChangeText", text: text, name: name })
    }
}

export default connect(mapState, mapDispatch)(Person)