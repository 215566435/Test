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
import Person from '../Person'
import Address from '../Address'
import DetailPage from '../Detail';
import GoodState from '../GoodState';
import Cart from '../Cart';
import Settle from '../Settle';
import Deposite from '../DepositeLog';
import Password from '../Password';



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
                        refreshAll={this.props.refreshAll}
                        ref='Profile'
                    />
                </View>
            )
        }
    }
}

const mapDispatch = (dispatch) => {

    return {
        refreshAll: () => {
            dispatch({ type: 'fetchHome' })
            dispatch({ type: 'FetchList' })
        }
    }
}

const connected = connect(null, mapDispatch)(ProfileHOC())

const ProfileNavigator = StackNavigator({
    Profile: {
        screen: connected,
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
    },
    Password: {
        screen: (props) => <Password {...props} />,
        navigationOptions: {
            title: '修改密码',
            tabBarVisible: false,
            gesturesEnabled: true
        }
    },
    Deposite: {
        screen: (props) => <Deposite {...props} />,
        navigationOptions: {
            title: '预存款记录',
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
        }
    },
    {
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);