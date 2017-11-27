import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, Modal, Switch, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Input } from '../../../components/Input';
import * as WeChat from 'react-native-wechat';


class NormalLogin extends Component {
    state = {
        name: '',
        psw: '',
        code: '',
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text
        })
    }

    render() {
        const {
            onNormalLogin,
            onWechatLogin,
            onNormalLoginCancel,
            onNewRegister,
            loading
        } = this.props;

        const { code } = this.state;
        return (
            <View style={{
                height: '100%',
                justifyContent: 'center',
                transform: [
                    { translateY: 0 - keyboardHeight }
                ]
            }} >
                <Input addonBefore='登陆名' name='name' onChangeText={onChange} />
                <Input addonBefore='密码' password={true} name='psw' onChangeText={onChange} />
                <Input addonBefore='验证码' name='code' onChangeText={onChange} value={code} />

                <Code ref={(ins) => this.ins = ins} />
                <Button title='登陆' onPress={onNormalLogin} />
                <Button title='没有账户，转到新用户注册' onPress={onNewRegister} style={{ backgroundColor: "#f56a00" }} />
                <Button title='取消' onPress={onNormalLoginCancel} style={{ backgroundColor: '#919191' }} />
                <WechatButton onPress={onWechatLogin} />
                {loading ? <SpinScreen text={'登陆中...'} /> : null}
            </View>
        )
    }
}

const mapState = (state) => {
    return {
        loading: state.Login.loading
    }
}


export default connect()(NormalLogin);