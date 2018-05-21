/**
 * 2017/11/02 方正创建
 */
import React from 'react'
import { StackNavigator } from 'react-navigation' // 1.0.0-beta.14

import PriceList from './index'
import DetailPage from '../Detail'
import Cart from '../Cart'
// import Settle from '../Settle';
import GoodState from '../GoodState'

export default StackNavigator(
  {
    PriceList: {
      screen: props => <PriceList {...props} />,
      navigationOptions: {
        header: null
      }
    },
    DetailPage: {
      screen: DetailPage,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Cart: {
      screen: props => <Cart {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    // Settle: {
    //     screen: (props) => <Settle {...props} />,
    //     navigationOptions: {
    //         header: null,
    //         tabBarVisible: false,
    //         gesturesEnabled: true
    //     }
    // },
    GoodState: {
      screen: props => <GoodState {...props} />,
      navigationOptions: {
        title: '订单详情',
        tabBarVisible: false,
        gesturesEnabled: true
      }
    }
  },
  {
    initialRouteName: 'PriceList',
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
      gesturesEnabled: true
    }
  }
)
