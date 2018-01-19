/**
 *  2017/11/9 方正 创建
 * 
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker } from 'react-native';
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { PickerView } from '../../../components/Picker';
// import Parse from 'china-parser';

import { Url, header } from '../../../util';


export class Modyfiy extends Component {
    static navigationOptions = {
        title: '个人信息'
    }
    static defalutProps = {
        isAdd: false
    }
    state = {
        type: 'Receiver',
        name: '',
        phone: '',
        id: '',
        address: '',
        defalut: false,
        serverID: ''
    }
    onChangeText = (text, name) => {
        this.setState({
            [name]: text
        })
    }
    onTypeChange = (value) => {
        this.setState({
            type: value === "收件人" ? 'Receiver' : 'Sender'
        })

    }
    componentDidMount() {
        const { addr } = this.props;
        this.setState({
            type: addr.t,
            name: addr.n,
            phone: addr.p,
            address: addr.a,
            serverID: addr.id,
            defalut: addr.d,
            id: addr.i
        })
    }
    defalutChange = (v) => {
        const defalut = v == '是' ? true : false;
        this.setState({
            defalut: defalut
        })
    }

    onSubmit = (e) => {

        (async function fetchAddress(that, e) {
            const fixUrl = that.props.isAdd ? Url + 'user/CreateAddress' : Url + 'user/ModifyAddress';
            try {
                const state = that.state
                const res = await fetch(fixUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        i: state.id,
                        p: state.phone,
                        n: state.name,
                        a: state.address,
                        t: state.type,
                        d: state.defalut,
                        se: false,
                        id: state.serverID
                    }),
                    headers: header.get()
                })

                const json = await res.json();
                console.log(that.state)
                if (json.success) {
                    that.props.done(json.data)
                } else {
                    that.props.fail()
                }

            } catch (e) {
                console.log(e);
            }
        })(this, e)

    }
    onGoBack = () => {
        this.props.done()
    }

    onBlur = () => {
        console.log('br')

    }

    render() {
        const { addr } = this.props;
        return (
            <ScrollView style={{ height: '100%', marginTop: Platform.OS === 'ios' ? 22 : 0 }}>
                <PickerView addonBefore='地址类型' value={this.state.type === "Receiver" ? '收件人' : '发件人'} onValueChange={this.onTypeChange}>
                    <Picker.Item label="收件人" value="收件人" />
                    <Picker.Item label="发件人" value="发件人" />
                </PickerView>
                <Input addonBefore='姓名' name='name' onChangeText={this.onChangeText} value={this.state.name} />
                <Input addonBefore='手机号码' name='phone' onChangeText={this.onChangeText} value={this.state.phone} />
                {this.state.type === 'Sender' ? null : <Input addonBefore='身份证' name='id' onChangeText={this.onChangeText} value={this.state.id} />}
                {this.state.type === 'Sender' ? null : <Input addonBefore='地址' name='address' onChangeText={this.onChangeText} value={this.state.address} onBlur={this.onBlur} />}
                <PickerView addonBefore='是否设为默认地址' value={this.state.defalut ? '是' : '否'} onValueChange={this.defalutChange}>
                    <Picker.Item label="否" value="否" />
                    <Picker.Item label="是" value="是" />
                </PickerView>
                <Button title='保存' onPress={this.onSubmit} />
                <Button title='返回' style={{ backgroundColor: '#919191' }} onPress={this.onGoBack} />
            </ScrollView>
        )
    }
}
