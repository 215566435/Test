import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, Modal, Switch, Picker } from 'react-native';
import { connect } from 'react-redux';

import { SpinScreen } from '../../../components/Spin';
import { Input } from '../../../components/Input';
import { Code } from '../../../components/Code';
import { Button, WechatButton } from '../../../components/Button';




var thisComponent = null;
class NormalLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            psw: '',
            code: '',
        }
    }
    componentDidMount() {
        thisComponent = this;
    }
    onChangeText = (text, name) => {
        this.setState({
            [name]: text
        })
    }
    onLoginFinished = (data) => {
        if (data.success) {
            this.props.loadingFinished(data)
            this.props.navigation.goBack();
        } else {
            this.ins.setState({
                time: Date.now() + Math.random() * 100
            })
            alert(data.message);
        }
    }

    onNormalLogin = () => {
        this.props.onNormalLogin(this.state);
    }
    onNormalLoginCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {
            onNormalLogin,
            onWechatLogin,
            onNewRegister,
            loading
        } = this.props;

        const { code } = this.state;
        return (
            <View style={{
                height: '100%',
                justifyContent: 'center',
                backgroundColor: "white"
            }} >
                <Input addonBefore='登陆名' name='name' onChangeText={this.onChangeText} />
                <Input addonBefore='密码' password={true} name='psw' onChangeText={this.onChangeText} />
                <Input addonBefore='验证码' name='code' onChangeText={this.onChangeText} value={code} />

                <Code ref={(ins) => this.ins = ins} />
                <Button title='登陆' onPress={this.onNormalLogin} />
                <Button title='没有账户，转到新用户注册' onPress={onNewRegister} style={{ backgroundColor: "#f56a00" }} />
                <Button title='取消' onPress={this.onNormalLoginCancel} style={{ backgroundColor: '#919191' }} />
                <WechatButton onPress={() => onWechatLogin(this)} />
                {loading ? <SpinScreen text={'登陆中...'} /> : null}
            </View>
        )
    }
}

/**
 * 用于封装虚拟组件实例
 * @param {*} actions 
 */
const action = (actions) => {
    return { ...actions, ins: thisComponent }
}

const mapState = (state) => {
    return {
        loading: state.Login.loading
    }
}

const mapDispatch = (dispatch) => {
    return {
        onNormalLogin: (data) => dispatch(action({ type: 'onNormalLogin', form: data })),
        onWechatLogin: (ins) => dispatch({ type: 'onWechatLogin', ins: ins })
    }
}


export default connect(mapState, mapDispatch)(NormalLogin); 