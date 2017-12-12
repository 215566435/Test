import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import { CustomTabBar } from 'component/CustomTabBar';
import { width, height } from 'utils';


export const PageWithTab = (Cpn, TabItem, TabColor) => {

    return class Wrapper extends Component {

        CustomTabBarPress = (e, child, index) => {
            if (this.page.CustomTabBarPress === void 666) {
                throw new Error('PageWithTab 组件必须定义一个 CustomTabBarPress(e, child, index)方法')
            }
            this.page.CustomTabBarPress.call(this.page, e, child, index)
        }

        render() {
            return (
                <View style={{ height: height - 44 - (Platform.OS === 'ios' ? 0 : 24) }}>
                    <Cpn {...this.props} ref={(node) => this.page = node} />
                    <CustomTabBar onPress={this.CustomTabBarPress} childColor={(child, index) => {
                        if (TabColor && TabColor[index] === void 666) {
                            return 'white'
                        }
                        if (TabColor && TabColor[index]) {
                            return TabColor[index]
                        }
                        return 'white'
                    }}>
                        {React.Children.map(TabItem, (item) => {
                            return <Text>{item}</Text>
                        })}
                    </CustomTabBar>
                </View>
            )
        }
    }
}

