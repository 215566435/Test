/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆功能
 */
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, Modal } from 'react-native'
import * as WeChat from 'react-native-wechat';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Spin } from '../../components/Spin'

import { Url, hostName } from '../../util';



const WechatButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <FontAwesome
                    name='wechat'
                    size={44}
                    color='#62b900'
                />
                <Text>微信登陆</Text>
            </View>
        </TouchableOpacity>
    )
}

var FIRST_TIME_PRESS = true;


const ERR_MSG = {
    'UserName Required': '用户名必须填写',
    'Password Required': '密码必须填写',
    "Verify Required": '验证码必须填写'
}

function alert(msg) {
    Alert.alert(
        '信息有误',
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
        keyboardHeight: 0,
        loading: false
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
            alert(json.message)
        }
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e) {
        this.setState({
            keyboardHeight: 80
        })
    }

    _keyboardDidHide(e) {
        this.setState({
            keyboardHeight: 0
        })
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
                const res = await fetch(Url + 'user/Login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: that.state.name,
                        password: that.state.psw,
                        verify: that.state.code
                    })
                })

                const json = await res.json()

                console.log(json);

                that.loginFinish(json);
            }
        )(this)
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

    renderContent = () => (
        <View style={{
            height: '100%', justifyContent: 'center', transform: [
                { translateY: 0 - this.state.keyboardHeight }
            ]
        }} >
            <Input addonBefore='登陆名' name='name' onChangeText={this.onChange} />
            <Input addonBefore='密码' password={true} name='psw' onChangeText={this.onChange} />
            <Input addonBefore='验证码' name='code' onChangeText={this.onChange} />

            <Code ref={(ins) => this.ins = ins} />
            <Button title='登陆' onPress={this.normal} />
            <Button title='取消' onPress={this.cancel} style={{ backgroundColor: '#919191' }} />
            <WechatButton onPress={this.wxChat} />

            {this.state.loading ? <View style={{ height: '100%', width: '100%', alignItems: "center", justifyContent: "center", position: 'absolute' }}>
                <View style={{
                    height: 150,
                    width: 150,
                    backgroundColor: "white",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.5,
                    borderColor: "#fccca7"
                }}>
                    <Spin />
                    <Text style={{ color: '#404040' }}>{'登陆中...'}</Text>
                </View>
            </View> : null}

        </View>
    )

    render() {
        return this.renderContent()
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