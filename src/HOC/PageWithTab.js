import React, { Component } from "react";
import { View, Platform, Text } from "react-native";
import { CustomTabBar } from "../components/CustomTabBar";
import { width, height } from "../util";

/**
 * 使用方法
    1: 最外部的包裹, flexDriction 默认的竖直
    2: 吸顶导航: 必须固定高度
    3: 中间是滚动层 flex: 1,(ScrollView可以不加flex: 1, 其他组价没测试,), 如果flex不行那就硬设定height:height-44
    4: 最下面的tabBar 使用PageWithTab包裹已经创建好的页面组件
    5: 必须创建一个CustomTabBarPress方法，指定点击之后的时间
    例：
      CustomTabBarPress = (e, child, index) => {
        this.props.navigation.goBack();
        //this.props.dispatch({ type: "updateMessage" });
      };
 */

/**
 * 高阶组件，输入一个component会自动的给这个component加上一个tabbar
 * @param {*} Cpn:react 的component
 * @param {array} TabItem:Tabbar上的按钮
 * @param {array} TabColor:每个按钮的颜色
 * @param {bool} update:tabbar是否拥有更新能力
 */
export const PageWithTab = (
  Cpn,
  TabItem,
  TabColor = ["white"],
  update = false
) => {
  return class Wrapper extends Component {
    CustomTabBarPress = (e, child, index) => {
      if (this.page.CustomTabBarPress === void 666) {
        throw new Error(
          "PageWithTab 组件必须定义一个 CustomTabBarPress(e, child, index)方法"
        );
      }
      this.page.CustomTabBarPress.call(this.page, e, child, index);
    };

    render() {
      return (
        <View
          style={{
            height: height - 44 - (Platform.OS === "ios" ? 0 : 24)
          }}
        >
          <Cpn {...this.props} ref={node => (this.page = node)} />
          <CustomTabBar
            shouldUpdate={update}
            onPress={this.CustomTabBarPress}
            childColor={(child, index) => {
              if (TabColor && TabColor[index] === void 666) {
                return "white";
              }
              if (TabColor && TabColor[index]) {
                return TabColor[index];
              }
              return "white";
            }}
          >
            {React.Children.map(TabItem, (item, index) => {
              return (
                <Text
                  style={{ backgroundColor: "transparent", color: "black" }}
                >
                  {item}
                </Text>
              );
            })}
          </CustomTabBar>
        </View>
      );
    }
  };
};
