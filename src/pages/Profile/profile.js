/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Button,
    Modal,
    AsyncStorage,
    Alert,
    Platform
} from 'react-native'
import { StackNavigator } from 'react-navigation' // 1.0.0-beta.14

import { CustomTabBar } from '../../components/CustomTabBar'
import { Grid } from '../../components/Grid'
import FontAwesome from 'react-native-vector-icons/FontAwesome' // 4.4.2
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import codePush from 'react-native-code-push'

import Login from '../Login'

import { header, Url, height, width } from '../../util'
import { PageWithTab } from '../../HOC/PageWithTab'

class Profile extends React.Component {
    state = {
        userName: '',
        userBalence: {
            aud: '',
            rmb: ''
        }
    }

    fetchBalance = () => {
        ;(async that => {
            const res = await fetch(Url + 'user/GetDepositBalance', {
                method: 'POST',
                headers: header.get(),
                body: '{}'
            })

            const json = await res.json()
            that.setState({
                userBalence: {
                    aud: json.data[1],
                    rmb: json.data[0]
                }
            })
        })(this)
    }
    componentDidMount() {
        this.fetchBalance()
        this.checkLogin()
    }
    /**
     * 处理用户6个方块的选择
     */
    onGridItemClick = (e, child, index) => {
        if (this.state.userName === '') {
            this.checkLogin()
            return
        }
        if (child.props.name === 'logout') {
            Alert.alert(
                '退出登陆',
                '您确定需要退出登陆吗?',
                [
                    { text: '取消', style: 'cancel' },
                    {
                        text: '确定退出',
                        onPress: () => {
                            AsyncStorage.removeItem('token')
                                .then(res => {
                                    this.checkLogin()
                                    this.setState({
                                        userBalence: {
                                            rmb: '',
                                            aud: ''
                                        }
                                    })
                                })
                                .catch(res => {
                                    //出错
                                })
                        }
                    }
                ],
                { cancelable: false }
            )
        } else {
            this.props.navigation.navigate(child.props.name)
        }
    }
    checkLogin = () => {
        AsyncStorage.multiGet(['token', 'name'])
            .then(res => {
                if (res[0][1] === null) {
                    this.props.navigation.navigate('Login')
                    this.setState({
                        userName: '',
                        userBalence: {
                            aud: '',
                            rmb: ''
                        }
                    })
                } else {
                    header.set(res[0][1])
                    this.setState({
                        userName: res[1][1]
                    })
                }
            })
            .catch(res => {
                //出错
            })
    }
    onLoginFinished = personInformation => {
        if (personInformation.success === true) {
            header.set(personInformation.data.token)
            AsyncStorage.multiSet([
                ['token', personInformation.data.token],
                ['name', personInformation.data.name]
            ])
                .then(res => {
                    this.setState({
                        userName: personInformation.data.name
                    })
                    this.props.refreshAll()
                    this.fetchBalance()
                })
                .catch(res => {
                    //登陆失败
                })
        }
    }
    loginCancel = () => {
        this.setState({
            isLogined: true
        })
    }
    CustomTabBarPress = () => {
        this.props.navigation.goBack(null)
    }
    render() {
        return (
            <View style={headStyle.container}>
                <View
                    style={{
                        height: height - 44 - (Platform.OS === 'ios' ? 0 : 24)
                    }}
                >
                    <Head
                        userName={this.state.userName}
                        userBalence={this.state.userBalence}
                        navigation={this.props.navigation}
                        {...this.props}
                    />
                    <GridBody GridItemClick={this.onGridItemClick} />
                </View>
            </View>
        )
    }
}

export default PageWithTab(Profile, '返回')

/**
 * 工具栏
 * 其中的name会在点击的时候传给GridItemClick函数
 * @parma:GridItemClick函数
 */
class GridBody extends Component {
    shouldComponentUpdate(nextProps) {
        //蠢静态的，永远不更新
        return false
    }
    render() {
        const { GridItemClick } = this.props
        const ToolItemSize = 33
        const ToolItemColor = '#f79992'
        console.log('渲染GridBody')
        return (
            <Grid onPress={GridItemClick}>
                <ToolItem
                    text="我的订单"
                    name="Manifest"
                    Image={
                        <FontAwesome
                            name="file-text-o"
                            color={ToolItemColor}
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
                <ToolItem
                    text="地址管理"
                    name="Address"
                    Image={
                        <MaterialCommunityIcons
                            color={ToolItemColor}
                            name="map-marker-radius"
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
                <ToolItem
                    text="预存款"
                    name="Deposite"
                    Image={
                        <Ionicons
                            name="logo-yen"
                            color={ToolItemColor}
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
                <ToolItem
                    text="意见反馈"
                    name="Feedback"
                    Image={
                        <MaterialCommunityIcons
                            color={ToolItemColor}
                            name="border-color"
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
                <ToolItem
                    text="修改密码"
                    name="Password"
                    Image={
                        <MaterialCommunityIcons
                            color={ToolItemColor}
                            name="lock"
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
                <ToolItem
                    text="退出登陆"
                    name="logout"
                    Image={
                        <Entypo
                            name="log-out"
                            color={ToolItemColor}
                            size={ToolItemSize}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                />
            </Grid>
        )
    }
}

/**
 * 个人信息
 */
class Head extends React.Component {
    undefineToZero = money => {
        if (money !== void 666) {
            return money
        } else {
            return ' '
        }
    }

    renderBalance = () => {
        const { userBalence } = this.props
        if (userBalence.rmb === '' && userBalence.aud === '') {
            return '预存款：0'
        } else {
            return `预存款：${this.undefineToZero(
                userBalence.rmb
            )}  ${this.undefineToZero(userBalence.aud)}`
        }
    }

    render() {
        const { userName, userBalence } = this.props
        return (
            <View
                style={{
                    height: 250,
                    backgroundColor: '#f46e65'
                }}
            >
                <Message {...this.props} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Person')}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 60 / 2
                            }}
                            source={{
                                uri:
                                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509577007&di=91baca655f3d432af3a0586dbfc5e834&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e50a55bee3b66ac7253f361e874b.jpg'
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            margin: 8,
                            color: '#fff3cf',
                            backgroundColor: 'transparent'
                        }}
                    >
                        欢迎您，{userName}
                    </Text>
                    <Text
                        style={{
                            margin: 8,
                            color: '#fff3cf',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {this.renderBalance()}
                    </Text>
                    <Text
                        style={{
                            margin: 8,
                            color: '#fff3cf',
                            backgroundColor: 'transparent'
                        }}
                    />
                </View>
            </View>
        )
    }
}

class Message extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Message')}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 40,
                    height: 35,
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'black',
                    zIndex: 100
                }}
            >
                <View
                    style={{
                        backgroundColor: '#f5222d',
                        height: 15,
                        width: 15,
                        borderRadius: 7.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        zIndex: 10,
                        right: -5,
                        top: -2
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 8,
                            height: 10,
                            width: 13
                        }}
                    >
                        {this.props.messageCount}
                    </Text>
                </View>
                <FontAwesome name="envelope-o" color="#fff7e6" size={24} />
            </TouchableOpacity>
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
            <Text style={{ marginTop: 8, backgroundColor: 'transparent' }}>
                {text}
            </Text>
        </View>
    )
}

const headStyle = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        height: '100%'
    },
    head: {
        height: '60%',
        backgroundColor: '#f46e65'
    }
})
