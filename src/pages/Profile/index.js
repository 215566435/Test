/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆、个人信息等功能
 */
import React from 'react'
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { connect } from 'react-redux'

import ManifestPage from '../Manifest'
import Profile from './profile'
import LoginPage from './login'
import Person from '../Person'
import Address from '../Address'
import DetailPage from '../Detail';
import GoodState from '../GoodState';
import Cart from '../Cart';
import Settle from '../Settle';


const ProfileInstace = null;

const ProfileHOC = () => {
    return class Wrapper extends React.Component {
        constructor(props, context) {
            super(props, context);
            ProfileInstace = this;
        }
        static navigationOptions = {
            header: null,
            tabBarOnPress: (obj, jump) => { ProfileInstace.onTabPress(obj, jump) }
        }
        onTabPress({ route, index }, jump) {
            this.refs.Profile.checkLogin()
            jump(index)
        }
        render() {

            return (
                <View>
                    <Profile
                        {...this.props}
                        ref='Profile'
                    />
                </View>
            )
        }
    }
}

const Login = (props) => {
    return (
        <LoginPage {...props} />
    )
}
Login.navigationOptions = {
    title: '账户登陆'
}

const ProfileNavigator = StackNavigator({
    Profile: {
        screen: ProfileHOC(),
        navigationOptions: {
            header: null
        }
    },
    Manifest: {
        screen: ManifestPage,
        navigationOptions: {
            tabBarVisible: false
        }
    },
    Person: {
        screen: Person,
        navigationOptions: {
            tabBarVisible: false
        }
    },
    Address: {
        screen: Address,
        navigationOptions: {
            tabBarVisible: false
        }
    },
    GoodState: {
        screen: (props) => <GoodState {...props} />,
        navigationOptions: {
            title: '订单详情',
            tabBarVisible: false,
            gesturesEnabled: true
        }
    },
    ManifestDetail: {
        screen: DetailPage,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }
    },
    Cart: {
        screen: (props) => <Cart {...props} />,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }
    },
    Settle: {
        screen: (props) => <Settle {...props} />,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }
    }
}, {
        initialRouteName: 'Manifest',
        mode: 'card',
        headerMode: 'screen'
    }
)


export default StackNavigator(
    {
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                header: null
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                tabBarVisible: false
            }
        },

    },
    {
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);