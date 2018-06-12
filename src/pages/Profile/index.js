/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆、个人信息等功能
 * 
 * 这页面应该是一开始没用redux，后来强行加进去的，比较乱啊
 */
import React from 'react'
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation' // 1.0.0-beta.14
import { connect } from 'react-redux'

import ManifestPage from '../Manifest'
import Profile from './profile'
import Person from '../Person'
import Address from '../Address'
import DetailPage from '../Detail'
import GoodState from '../GoodState'
import Cart from '../Cart'
import Deposite from '../DepositeLog'
import Password from '../Password'
import Login from '../Login'
import Message from '../Message'
import Feedback from '../Feedback'
import FeedbackForm from '../FeedbackForm'
import FeedbackReply from '../FeedbackReply'
import FeedbackReplyForm from '../FeedbackReplyForm'
import Charge from '../Charge/index'
import CommissionList from '../Commission/index'

const ProfileInstace = null
let _profile = null

const ProfileHOC = () => {
  return class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context)
      // 相当于this = this
      ProfileInstace = this
    }
    static navigationOptions = {
      header: null,
      tabBarOnPress: (obj, jump) => {
        //相当于this.onTabPress(obj, jump)
        ProfileInstace.onTabPress(obj, jump)
      }
    }

    // 需要么， 好像没有被调用啊。。。
    // 哦 明白了， 每次跳转页面，我们都验证一下用户是否登录，然后接收存款余额，如果没登录
    // 跳转到登录页面
    onTabPress({ route, index }, jump) {
      console.log('准备调用fetchBalance'); //首页加载时并没有进来
      // 调用Profile标签下面的CheckLogin方法
      this.refs.Profile.checkLogin()
      // 调用Profile标签下的fetchBalance方法
      this.refs.Profile.fetchBalance()
      this.refs.Profile.fetchCommission()
      jump(index)
    }
    componentDidMount() {
      // 这个完全看不懂是在干什么
      _profile = this.refs.Profile.page
    }
    render() { // 渲染从profile.js引入的个人信息列表
      return ( // 使用profile组件，并且把refreshAll传进去，给一个ref值，就可以得到这个标签的DOM节点
        <View>
          <Profile {...this.props} refreshAll={this.props.refreshAll} ref="Profile" />
        </View>
      )
    }
  }
}

const mapState = state => {
  return {
    messageCount: state.Home.noteCount
  }
}

//注意这里没有dispatch到action.js
const mapDispatch = dispatch => {
  return { // 定义一个函数发送两个请求，清空，但是不太理解为什么可以清空
    refreshAll: () => {
      dispatch({ type: 'fetchHome' })
      dispatch({ type: 'FetchList' })
    },
    dispatch: dispatch
  }
}

connected = connect(mapState, mapDispatch)(ProfileHOC())

export default StackNavigator(
  {
    Profile: {
      screen: connected,
      navigationOptions: {
        header: null,
        title: '<'
      }
    },
    Charge: {
      screen: props => <Charge {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Login: {
      screen: props => <Login {...props} Profile={_profile} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Message: {
      screen: props => <Message {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Feedback: {
      screen: props => <Feedback {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    FeedbackForm: {
      screen: props => <FeedbackForm {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    FeedbackReply: {
      screen: props => <FeedbackReply {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    FeedbackReplyForm: {
      screen: props => <FeedbackReplyForm {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    CommissionList: {
      screen: props => <CommissionList {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    }
  },
  {
    initialRouteName: 'Profile',
    mode: 'card',
    headerMode: 'screen'
  }
)
