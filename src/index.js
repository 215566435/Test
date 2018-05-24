/**
 * 方正
 * App 的入口文件，一般来说不用修改
 * 如果要修改，请联系我
 */

import React from 'react'
import * as WeChat from 'react-native-wechat'
import RootTabs from './navigator'
import { Provider } from 'react-redux'
import { store } from './store'
import { setLogin } from './util'

export default class AustGoApp extends React.Component {
    componentDidMount() {
        WeChat.registerApp('wx33af9e573209c0e7')
        console.disableYellowBox = true
    }
    render() {
        return (
            <Provider store={store}>
                <RootTabs />
            </Provider>
        )
    }
}
