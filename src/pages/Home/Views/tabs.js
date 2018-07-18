// import React from 'react';
// import { Text, View } from 'react-native';
// import { TabNavigator } from 'react-navigation';

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
// }

// export default TabNavigator({
//   Home: { screen: HomeScreen },
//   Settings: { screen: SettingsScreen },
// });







/* tslint:disable:no-console */
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Tabs } from "antd-mobile-rn";

export default class BasicTabsExample extends React.Component {
    _change = (props) => {
    }
  render() {
    const style = {
      alignItems: "center",
      justifyContent: "center",
      height: 150,
      backgroundColor: "#fff"
    };

    const tabs = [
      { title: "1st Tab" },
      { title: "2nd Tab" },
      { title: "3rd Tab" }
    ];

    return (
      <Tabs
        tabs={tabs}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
        //   onTabClick={(tab, index) => {
        //     console.log("onTabClick", index, tab);
        //   }}
        // onChange={(tab, index) => this._change(tab, index)}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        initialPage={1}
      >
        <View style={style}>
          <Text>Content of First Tab</Text>
        </View>
        <View style={style}>
          <Text>Content of Second Tab</Text>
        </View>
        <View style={style}>
          <Text>Content of Third Tab</Text>
        </View>
      </Tabs>
    );
  }
}
export const title = "Tabs";
export const description = "Tabs example";
