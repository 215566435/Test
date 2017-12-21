/**
 *  2017/11/9 方正 创建
 * 
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker } from 'react-native';
import { Input } from 'component/Input'
import { Button } from 'component/Button'
import { PickerView } from 'component/Picker';
import { connect } from 'react-redux';

import { Url, header, getNavigationParam, goBack } from 'utils';

const AddressEditPageHelper = {
    checkParma: function (key, param) {
        if (param[key] !== void 666) {
            return param[key];
        }
        throw new Error(`传递进来的param不含有${key}属性`);
    }
}

class Modyfiy extends Component {
    constructor(props) {
        super(props);
        const Param = getNavigationParam(this.props);
        const { checkParma } = AddressEditPageHelper;
        console.log(Param)
        this.state = {
            isAdd: checkParma('isAdd', Param),
            type: checkParma('type', Param),
            name: '',
            id: '',
            address: '',
            defalut: false,
            serverID: ''
        }
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
        const Param = getNavigationParam(this.props);

        this.setState({
            ...Param
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
            const fixUrl = Url + 'user/CreateAddress';
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
                console.log(state)
                that.props.dispatch({ type: 'mapAddress', [state.type]: json.data });
                goBack(that.props)(null);
            } catch (e) {
                console.log(e);
            }
        })(this, e)
    }
    onEdit = () => {
        const state = this.state;
        this.props.dispatch({
            type: 'mapAddress', [state.type]: {
                i: state.id,
                p: state.phone,
                n: state.name,
                a: state.address,
                t: state.type,
                d: state.defalut,
                se: false,
                id: state.serverID
            }
        });
        goBack(this.props)(null);
    }
    onGoBack = () => {
        goBack(this.props)(null);
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
                {this.state.type === 'Sender' ? null : <Input addonBefore='地址' name='address' onChangeText={this.onChangeText} value={this.state.address} />}
                <PickerView addonBefore='是否设为默认地址' value={this.state.defalut ? '是' : '否'} onValueChange={this.defalutChange}>
                    <Picker.Item label="否" value="否" />
                    <Picker.Item label="是" value="是" />
                </PickerView>
                {this.state.isAdd ? null : <Button title='编辑' onPress={this.onEdit} />}
                <Button title='保存到地址本' onPress={this.onSubmit} style={{ backgroundColor: "#fa8c16" }} />
                <Button title='返回' style={{ backgroundColor: '#919191' }} onPress={this.onGoBack} />
            </ScrollView>
        )
    }
}

export default connect()(Modyfiy);