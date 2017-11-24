/**
 *  2017/10/31 方正 创建
 * 商品分类
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Picker, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { Form, FormItem } from '../../components/Form'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Spin } from '../../components/Spin'
import { PickerView } from '../../components/Picker'

import { hostName } from '../../util';

class Password extends Component {
    static navigationOptions = {
        title: '修改密码'
    }

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

class Code extends React.Component {
    state = {
        time: Date.now() + Math.random() * 100,
        show: true
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.time !== this.state.time
    }

    onChange = () => {
        this.setState({
            time: Date.now() + Math.random() * 100
        })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <TouchableOpacity onPress={this.onChange} style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }} >
                    {this.state.show ? (<Image
                        source={{
                            uri: `http://${hostName}/api/verify?t=`
                                + this.state.time
                        }}
                        style={{
                            width: 150,
                            height: 80
                        }}
                        resizeMode='contain'
                    />)
                        : null}
                    <Text>点击刷新</Text>
                </TouchableOpacity>
            </View>
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