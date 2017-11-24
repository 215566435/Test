import React from 'react';
import * as WeChat from 'react-native-wechat';
import RootTabs from './navigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { setLogin } from './util'

export default class AustGoApp extends React.Component {

    componentDidMount() {
        WeChat.registerApp('wx558e460ec290964b');
        console.disableYellowBox = true;
        console.log(__DEV__)
    }
    render() {
        return (
            <Provider store={store}>
                <RootTabs />
            </Provider>
        );
    }
}
