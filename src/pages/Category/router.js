import React from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14


import Category from './index';
import DetailPage from '../Detail';
import Cart from '../Cart';
import Settle from '../Settle';
import Search from '../SearchPage'
import { View } from 'react-native';

export default StackNavigator(
    {
        Category: {
            screen: (props) => <View style={{ backgroundColor: "white" }}><Category {...props} /></View>,
            navigationOptions: {
                header: null
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        EventDetailPage: {
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
    },
    {
        initialRouteName: 'Category',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions: {
            gesturesEnabled: true,
        }
    }
);