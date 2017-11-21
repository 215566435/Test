/**
 *  2017/10/31 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Form, FormItem } from '../../components/Form'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export default class Person extends Component {
    static navigationOptions = {
        title: '个人信息'
    }
    onSubmit() {
        console.log('提交')
    }
    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <Form onSubmit={this.onSubmit}>
                    <FormItem>
                        <Input addonBefore='昵称' />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore='手机号码' />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore='电子邮件' />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore='国家' />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore='微信' />
                    </FormItem>
                    <FormItem type='submit'>
                        <Button title='提交' />
                    </FormItem>
                </Form>
            </ScrollView>
        )
    }
}
