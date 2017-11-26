/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆功能
 */
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, Modal, Switch, Picker } from 'react-native'
import * as WeChat from 'react-native-wechat';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spin } from '../../components/Spin';
import { SpinScreen } from '../../components/Spin'
import { PickerView } from '../../components/Picker'

import { Url, hostName } from '../../util';



const WechatButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <FontAwesome
                    name='wechat'
                    size={44}
                    color='#62b900'
                    style={{ backgroundColor: "transparent" }}
                />
                <Text style={{ backgroundColor: "transparent" }}>微信登陆</Text>
            </View>
        </TouchableOpacity>
    )
}

var FIRST_TIME_PRESS = true;

/**
 * 服务器返回的错误代码，用map来对应
 */
const ERR_MSG = {
    'UserName Required': '用户名必须填写',
    'Password Required': '密码必须填写',
    "Verify Required": '验证码必须填写'
}

/**
 * 封装的alert方法
 * @param {string} msg 
 */
function alert(msg) {
    Alert.alert(
        '登陆失败',
        ERR_MSG[msg] ? ERR_MSG[msg] : msg,
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK' },
        ],
        { cancelable: false }
    )
}


export default class LoginPage extends React.Component {
    state = {
        name: '',
        psw: '',
        code: '',
        hash: '',
        unionId: '',
        'ensure-psw': '',
        email: '',
        country: '中国',
        keyboardHeight: 0,
        loading: false,
        login: '登陆',
        register: 0,
        old: false,
        newRegister: false
    }

    loginFinish = (json) => {
        this.setState({
            loading: false
        })

        if (json.success) {
            FIRST_TIME_PRESS = true;
            this.props.login(json);
        } else {
            this.ins.setState({
                time: Date.now() + Math.random() * 100
            })


            if (json.message === '请绑定') {
                this.setState({
                    login: '我是老客户，绑定此微信号',
                    register: 1,
                    hash: json.data.hash,
                    unionId: json.data.unionId
                })
            } else {
                alert(json.message)
                this.setState({
                    code: ''
                })
            }
        }
    }

    wxChat = () => {//微信
        (
            async (that) => {
                try {
                    that.setState({
                        loading: true
                    })
                    const wxRes = await WeChat.sendAuthRequest('snsapi_userinfo');
                    const code = wxRes.code;
                    const res = await fetch(Url + 'user/LoginByWechat', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            WechatCode: code
                        })
                    })
                    const json = await res.json();
                    that.loginFinish(json);
                    console.log(json)
                } catch (e) {
                    alert('微信登陆出错')
                }
            }
        )(this)
    }
    normal = () => {
        (
            async (that) => {
                that.setState({
                    loading: true
                })

                const body = that.state.old ? {
                    username: that.state.name,
                    password: that.state.psw,
                    verify: that.state.code,
                    unionId: that.state.unionId,
                    hash: that.state.hash
                } : {
                        username: that.state.name,
                        password: that.state.psw,
                        verify: that.state.code
                    }
                console.log(body);

                const res = await fetch(Url + 'user/Login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })

                const json = await res.json()

                console.log(json);

                that.loginFinish(json);
            }
        )(this)
    }
    Old = () => {
        this.setState({
            register: false,
            old: true
        })
    }



    _NewConfirm = () => {
        (
            async (that) => {
                that.setState({
                    loading: true
                })
                const res = await fetch(Url + 'user/RegisterByWechat', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        hash: that.state.hash,
                        unionId: that.state.unionId
                    })
                })

                const json = await res.json()

                console.log(json);

                that.loginFinish(json);
            }
        )(this)
    }
    New = () => {
        Alert.alert(
            '一键注册账户确认',
            '点击确认后，系统将自动帮你创建一个账户并绑定到当前微信。如果您已经有账户，请使用[我是老用户，绑定微信]按钮。\n确定要一键注册吗？',
            [
                { text: '取消', style: 'cancel' },
                { text: '一键注册', onPress: () => this._NewConfirm() },
            ],
            { cancelable: false }
        )
    }
    onChange = (text, name) => {
        this.setState({
            [name]: text
        })
    }
    onFocus = () => {
        if (FIRST_TIME_PRESS) {
            this.ins.setState({
                show: true,
                time: Date.now() + Math.random() * 100
            });
            FIRST_TIME_PRESS = false;
        }
    }

    cancel = () => {
        this.props.loginCancel()
    }
    newRegister = (is_Fnished) => {
        if (is_Fnished === true) {
            (
                async (that) => {
                    that.setState({
                        loading: true
                    })
                    const res = await fetch(Url + 'user/Register', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: that.state.name,
                            password: that.state.psw,
                            Password2: that.state['ensure-psw'],
                            country: that.state.country,
                            realemail: that.state.email,
                            verify: that.state.code
                        })
                    })

                    const json = await res.json()

                    console.log(json);

                    that.loginFinish(json);
                }
            )(this)
        } else {
            this.setState({
                register: 2
            })
        }
    }

    /**
     * 正常登陆页面
     */
    renderNormalLogin = () => (
        <View style={{
            height: '100%', justifyContent: 'center', transform: [
                { translateY: 0 - this.state.keyboardHeight }
            ]
        }} >
            <Input addonBefore='登陆名' name='name' onChangeText={this.onChange} />
            <Input addonBefore='密码' password={true} name='psw' onChangeText={this.onChange} />
            <Input addonBefore='验证码' name='code' onChangeText={this.onChange} value={this.state.code} />

            <Code ref={(ins) => this.ins = ins} />
            <Button title='登陆' onPress={this.normal} />
            <Button title='没有账户，转到新用户注册' onPress={this.newRegister} style={{ backgroundColor: "#f56a00" }} />
            <Button title='取消' onPress={this.cancel} style={{ backgroundColor: '#919191' }} />
            {this.state.old ? null : <WechatButton onPress={this.wxChat} />}

            {this.state.loading ? <SpinScreen text={'登陆中...'} /> : null}

        </View>
    )
    /**
     * 用户微信登陆的绑定界面
     */
    renderRegister = () => {
        return (
            <View style={{
                height: '100%', justifyContent: 'center'
            }}>
                <View>
                    <Text style={{ fontSize: 22, textAlign: "center" }}>微信账户绑定</Text>
                </View>
                <Button title='我是老用户，绑定微信' onPress={this.Old} style={{ backgroundColor: '#00a854' }} />
                <Button title='我是新账户，一键注册' onPress={this.New} />
            </View>
        )
    }
    _onfocuse = () => {
        this.setState({
            keyboardHeight: 160
        })
    }

    onBlur = () => {
        this.setState({
            keyboardHeight: 0
        })
    }
    onTypeChange = (value) => {
        console.log(value)
        this.setState({
            country: value
        })
    }
    /**
     * 这个人完全没有注册过
     */

    newToAustGo = () => {

        return (
            <View style={{
                height: '100%', justifyContent: 'center', transform: [
                    { translateY: 0 - this.state.keyboardHeight }
                ]
            }}>
                <Input addonBefore='登陆名' name='name' onChangeText={this.onChange} />
                <Input addonBefore='密码' name='psw' onChangeText={this.onChange} />
                <Input addonBefore='确认密码' name='ensure-psw' onChangeText={this.onChange} />
                <Input addonBefore='Email' name='email' onChangeText={this.onChange} onFocus={this._onfocuse} onBlur={this.onBlur} />
                <PickerView addonBefore='国家' value={this.state.country} onValueChange={this.onTypeChange}>
                    <Picker.Item label="中国" value="中国" />
                    <Picker.Item label="新西兰" value="新西兰" />
                    <Picker.Item label="澳大利亚" value="澳大利亚" />
                    <Picker.Item label="其他国家" value="其他国家" />
                </PickerView>
                <Input addonBefore='验证码' name='code' onChangeText={this.onChange} onFocus={this._onfocuse} onBlur={this.onBlur} />

                <Code ref={(ins) => this.ins = ins} />
                <Button title='注册' onPress={() => this.newRegister(true)} />
                <Button title='取消' onPress={this.cancel} style={{ backgroundColor: '#919191' }} />
            </View>
        )
    }

    render() {

        if (this.state.register === 0) {
            return this.renderNormalLogin()
        }
        if (this.state.register === 1) {
            return this.renderRegister()
        }
        if (this.state.register === 2) {
            return this.newToAustGo()
        }
    }
}


/**
 * 验证码组件，使用time来更新
 */
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