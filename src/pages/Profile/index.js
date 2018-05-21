/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆、个人信息等功能
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

const ProfileInstace = null
let _profile = null

const ProfileHOC = () => {
  return class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context)
      ProfileInstace = this
    }
    static navigationOptions = {
      header: null,
      tabBarOnPress: (obj, jump) => {
        ProfileInstace.onTabPress(obj, jump)
      }
    }
    onTabPress({ route, index }, jump) {
      this.refs.Profile.checkLogin()
      this.refs.Profile.fetchBalance()
      jump(index)
    }
    componentDidMount() {
      _profile = this.refs.Profile.page
    }
    render() {
      return (
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

const mapDispatch = dispatch => {
  return {
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
    }
  },
  {
    initialRouteName: 'Profile',
    mode: 'card',
    headerMode: 'screen'
  }
)
