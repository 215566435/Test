/**
 * 路由router文件
 * 如果你想要引入页面，就在这里定义
 * 注意，这个只是前端路由，意思是，个人中心（profile）以外的页面在这里配置。
 * 后端路由在profile/index.js页面里配置，不要搞混了
 */

import React from 'react'
import { View, Text, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation' // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons' // 4.4.2
import FontAwesome from 'react-native-vector-icons/FontAwesome' // 4.4.2
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { FlatList, ScrollView } from 'react-native'

import ProfileScreen from './pages/Profile'
import PriceList from './pages/PriceList/router'
import Category from './pages/Category/router'
import Home from './pages/Home/router'
import EventPage from './pages/EventPage/router'
import ManifestPage from './pages/Manifest'
import Person from './pages/Person'
import Address from './pages/Address'
import DetailPage from './pages/Detail'
import GoodState from './pages/GoodState'
import Cart from './pages/Cart'
import Settle from './pages/Settle/remake_index'
import Deposite from './pages/DepositeLog'
import Password from './pages/Password'
import Login from './pages/Login'
import Search from './pages/SearchPage'
import Activity from './pages/Activity'
import Feedback from './pages/Feedback'
import ImageViewer from './pages/ImageViewer'
import FreeItem from './pages/FreeItem'
import Payment from './pages/payment'
import ProductHistory from './pages/ProductHistory'
import Attach from './pages/Attachment/index'
import SettleEditAddress from './pages/Settle/settle-edit-address'
import SettleAddressSelector from './pages/Settle/settle-address-selector'
import SettleCourierPicker from './pages/Settle/settle-courier-picker'
// Hank
// import WithdrawToAlipay from './pages/Commission/WithdrawToAlipay'
// import WithdrawToAUBank from './pages/Commission/WithdrawToAUBank'
// import WithdrawToCNBank from './pages/Commission/WithdrawToCNBank'
// import WithdrawToDeposit from './pages/Commission/WithdrawToDeposit'
// import WithdrawToWeChat from './pages/Commission/WithdrawToWeChat'
// import CommissionWithdraw from './pages/CommissionWithdraw'


const iconsSize = Platform.OS === 'ios' ? 26 : 15

const RootTabs = StackNavigator(
  {
    EventPage: {
      screen: EventPage,
      navigationOptions: {
        header: null,
        tabBarLabel: '最新活动',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome
            name="volume-up"
            size={iconsSize}
            style={{
              color: tintColor,
              backgroundColor: 'transparent'
            }}
          />
        )
      }
    },
    PriceList: {
      screen: PriceList,
      navigationOptions: {
        tabBarLabel: '报价表',
        tabBarIcon: ({ tintColor, focused }) => (
          <FontAwesome
            name={focused ? 'list-alt' : 'list-alt'}
            size={iconsSize}
            style={{
              color: tintColor,
              backgroundColor: 'transparent'
            }}
          />
        )
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '澳购商城',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={iconsSize}
            style={{
              color: tintColor,
              backgroundColor: 'transparent'
            }}
          />
        )
      }
    },
    Category: {
      screen: Category,
      navigationOptions: {
        tabBarLabel: '分类',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name="md-list-box"
            size={iconsSize}
            style={{
              color: tintColor,
              backgroundColor: 'transparent'
            }}
          />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: '个人中心',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={iconsSize}
            style={{
              color: tintColor,
              backgroundColor: 'transparent'
            }}
          />
        )
      }
    },
    Manifest: {
      screen: ManifestPage,
      navigationOptions: {
        header: null,
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
        tabBarVisible: false,
        header: null
      }
    },
    GoodState: {
      screen: props => <GoodState {...props} />,
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
    ManifestDetail: {
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
    Settle_remake: {
      screen: props => <Settle {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    FreeItem: {
      screen: props => <FreeItem {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Password: {
      screen: props => <Password {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Deposite: {
      screen: props => <Deposite {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    ImageViewer: {
      screen: props => <ImageViewer {...props} />,
      navigationOptions: {
        header: null,
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
    Payment: {
      screen: props => <Payment {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    Attachment: {
      screen: props => <Attach {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    ProductHistory: {
      screen: props => <ProductHistory {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    SettleEditAddress: {
      screen: props => <SettleEditAddress {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    SettleAddressSelector: {
      screen: props => <SettleAddressSelector {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    SettleCourierPicker: {
      screen: props => <SettleCourierPicker {...props} />,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        gesturesEnabled: true
      }
    },
    // Hank
    // CommissionWithdraw: {
    //   screen: props => <CommissionWithdraw {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
    // WithdrawToAlipay: {
    //   screen: props => <WithdrawToAlipay {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
    // WithdrawToAUBank: {
    //   screen: props => <WithdrawToAUBank {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
    // WithdrawToCNBank: {
    //   screen: props => <WithdrawToCNBank {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
    // WithdrawToDeposit: {
    //   screen: props => <WithdrawToDeposit {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
    // WithdrawToWeChat: {
    //   screen: props => <WithdrawToWeChat {...props} />,
    //   navigationOptions: {
    //     header: null,
    //     tabBarVisible: false,
    //     gesturesEnabled: true
    //   }
    // },
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    headerMode: 'screen'
  }
)

export default RootTabs
