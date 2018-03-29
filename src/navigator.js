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
import Settle from './pages/Settle'
import Deposite from './pages/DepositeLog'
import Password from './pages/Password'
import Login from './pages/Login'
import Search from './pages/SearchPage'
import Activity from './pages/Activity'
import Feedback from './pages/Feedback'
import AddressEditPage from './pages/AddressEditPage'
import ImageViewer from './pages/ImageViewer'
import FreeItem from './pages/FreeItem'
import Payment from './pages/payment'
import ProductHistory from './pages/ProductHistory'
import Attach from './pages/Attachment/index'

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
        Settle: {
            screen: props => <Settle {...props} />,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        AddressEditPage: {
            screen: props => <AddressEditPage {...props} />,
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
        }
    },
    {
        initialRouteName: 'Home',
        mode: 'card',
        headerMode: 'screen'
    }
)

export default RootTabs
