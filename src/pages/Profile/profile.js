/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆
 */
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Button, Modal, AsyncStorage, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14


import { Grid } from '../../components/Grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import LoginPage from './login'

import { header } from '../../util'

const { width, height } = Dimensions.get('window')


export default class Profile extends React.Component {
    state = {
        isLogined: true,
        userName: ''
    }

    ToolBoxOnPress = (e, child, index) => {
        if (child.props.name === 'logout') {
            Alert.alert(
                '退出登陆',
                '您确定需要退出登陆吗?',
                [
                    { text: '取消', style: 'cancel' },
                    {
                        text: '确定退出', onPress: () => {
                            AsyncStorage.removeItem('token')
                                .then((res) => {
                                    this.checkLogin()
                                })
                                .catch((res) => {
                                    //出错
                                })
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            if (this.state.userName === '') {
                this.checkLogin()
                return
            }
            this.props.navigation.navigate(child.props.name)
        }
    }
    checkLogin = () => {
        AsyncStorage.multiGet(['token', 'name'])
            .then((res) => {

                if (res[0][1] === null) {
                    this.setState({
                        isLogined: false,
                        userName: ''
                    })
                } else {
                    header.set(res[0][1])
                    this.setState({
                        isLogined: true,
                        userName: res[1][1]
                    })
                }
            })
            .catch((res) => {
                //出错
            })
    }
    onLogin = (personInformation) => {
        if (personInformation.success === true) {
            header.set(personInformation.data.token)

            AsyncStorage.multiSet([
                ['token', personInformation.data.token],
                ['name', personInformation.data.name]
            ])
                .then((res) => {
                    this.setState({
                        userName: personInformation.data.name,
                        isLogined: true
                    })
                    this.props.refreshAll()
                })
                .catch((res) => {
                    //登陆失败
                })
        }
    }
    loginCancel = () => {
        this.setState({
            isLogined: true
        })
    }
    onPress = () => {
        this.setState({
            isLogined: false
        })
    }

    render() {
        const ToolItemSize = 33
        const ToolItemColor = '#f79992'
        return (
            <ScrollView style={headStyle.container}>
                <Head userName={this.state.userName} />
                <Grid
                    onPress={this.ToolBoxOnPress}
                >
                    <ToolItem text='我的订单' name='Manifest' Image={<FontAwesome name="file-text-o" color={ToolItemColor} size={ToolItemSize} />} />
                    <ToolItem text='地址管理' name='Address' Image={<MaterialCommunityIcons color={ToolItemColor} name="map-marker-radius" size={ToolItemSize} />} />
                    <ToolItem text='预存款' name="Deposite" Image={<Ionicons name="logo-yen" color={ToolItemColor} size={ToolItemSize} />} />
                    <ToolItem text='个人信息' name='Person' Image={<MaterialCommunityIcons color={ToolItemColor} name="account-card-details" size={ToolItemSize} />} />
                    <ToolItem text='修改密码' name='Password' Image={<MaterialCommunityIcons color={ToolItemColor} name="lock" size={ToolItemSize} />} />
                    <ToolItem text='退出登陆' name='logout' Image={<Entypo name="log-out" color={ToolItemColor} size={ToolItemSize} />} />
                </Grid>
                <Modal
                    animationType='slide'
                    visible={!this.state.isLogined}
                >
                    <LoginPage login={this.onLogin} loginCancel={this.loginCancel} />
                </Modal>
            </ScrollView>
        )
    }
}

/**
 * 个人信息
 */
class Head extends React.Component {
    render() {
        return (
            <View style={headStyle.head}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                        source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509577007&di=91baca655f3d432af3a0586dbfc5e834&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e50a55bee3b66ac7253f361e874b.jpg' }}
                    />
                    <Text style={{ margin: 8, color: '#fff3cf' }}>欢迎您，{this.props.userName}</Text>
                </View>
            </View>
        )
    }
}

/**
 * 个人工具
 */
const ToolItem = ({ text, Image, name }) => {
    this.name = name
    return (
        <View style={{ alignItems: 'center' }}>
            {Image}
            <Text style={{ marginTop: 8 }}>{text}</Text>
        </View>
    )
}



const headStyle = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        height: '100%',
    },
    head: {
        height: '60%',
        backgroundColor: '#f46e65',
    }
})
