import React from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14


import Home from './index';
import DetailPage from '../Detail';
import Cart from '../Cart';
// import Settle from '../Settle';
import Search from '../SearchPage';
import Activity from '../Activity'
import MemberCollection from '../MemberCollection'
import TopList from '../TopList'
import GlobalProducts from '../GlobalProducts'
import ExpertShare from '../ExpertShare'

export default StackNavigator(
    {
        Home: {
            screen: (props) => <Home {...props} />,
            navigationOptions: {
                header: null
            }
        },
        EventDetailPage: {
            screen: (props) => <DetailPage {...props} />,
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
        Search: {
            screen: Search,
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
        Activity: {
            screen: Activity,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        MemberCollection: {
            screen: MemberCollection,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        TopList: {
            screen: TopList,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        ExpertShare: {
            screen: ExpertShare,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
        GlobalProducts: {
            screen: GlobalProducts,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
                gesturesEnabled: true
            }
        },
    },
    {
        initialRouteName: 'Home',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions: {
            gesturesEnabled: true,
        }
    }
);