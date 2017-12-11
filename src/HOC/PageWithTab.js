import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import { CustomTabBar } from 'component/CustomTabBar';
import { width, height } from 'utils';


export const PageWithTab = (Cpn, TabItem) => {

    return class Wrapper extends Component {

        CustomTabBarPress = (e, child, index) => {
            this.page.CustomTabBarPress.call(this.page, e, child, index)
        }

        render() {
            return (
                <View style={{ height: height - 44 - (Platform.OS === 'ios' ? 0 : 24) }}>
                    <Cpn {...this.props} ref={(node) => this.page = node} />
                    <CustomTabBar onPress={this.CustomTabBarPress}>
                        {React.Children.map(TabItem, (item) => {
                            return <Text>{item}</Text>
                        })}
                    </CustomTabBar>
                </View>
            )
        }
    }
}

