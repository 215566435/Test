/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆
 */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Modal,
  AsyncStorage,
  Alert,
  Platform
} from "react-native";
import { StackNavigator } from "react-navigation"; // 1.0.0-beta.14

import { CustomTabBar } from "../../components/CustomTabBar";
import { Grid } from "../../components/Grid";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // 4.4.2
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import codePush from "react-native-code-push";

import Login from "../Login";

import { header, Url, height, width } from "../../util";
import { PageWithTab } from "../../HOC/PageWithTab";
import { ToolItem } from "./profile-tools";
import { Head } from "./profile-head";

class Profile extends React.Component {
  state = {
    userName: "",
    userBalence: {
      aud: "",
      rmb: ""
    }
  };

  fetchBalance = () => {
    (async that => {
      const res = await fetch(Url + "user/GetDepositBalance", {
        method: "POST",
        headers: header.get(),
        body: "{}"
      });

      const json = await res.json();
      that.setState({
        userBalence: {
          aud: json.data[1],
          rmb: json.data[0]
        }
      });
    })(this);
  };
  componentDidMount() {
    this.checkLogin();
    this.props.dispatch({
      type: "mapProfileInstance",
      payload: this
    });
  }
  /**
   * 处理用户6个方块的选择
   */
  onGridItemClick = (e, child, index) => {
    if (this.state.userName === "") {
      this.checkLogin();
      return;
    }
    if (child.props.name === "logout") {
      Alert.alert(
        "退出登陆",
        "您确定需要退出登陆吗?",
        [
          { text: "取消", style: "cancel" },
          {
            text: "确定退出",
            onPress: () => {
              AsyncStorage.removeItem("token") // 09/18 解决bug登录之后价格不变, 因为还是从之前的本地内存中取数据
                .then(res => {
                  this.checkLogin();
                  this.setState({
                    userBalence: {
                      rmb: "",
                      aud: ""
                    }
                  });
                })
                .catch(res => {
                  //出错
                });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate(child.props.name);
    }
  };
  checkLogin = () => {
    AsyncStorage.multiGet(["token", "name"])
      .then(res => {
        if (res[0][1] === null) {
          this.props.navigation.navigate("Login");
          this.setState({
            userName: "",
            userBalence: {
              aud: "",
              rmb: ""
            }
          });
        } else {
          header.set(res[0][1]);
          this.setState({
            userName: res[1][1]
          });
          this.props.refreshAll(); // 09/18修改这里, 登录之后 主页产品的价钱会根据会员等级改变
          this.fetchBalance();
        }
      })
      .catch(res => {
        //出错
      });
  };
  onLoginFinished = personInformation => {
    if (personInformation.success === true) {
      // 09/18 解决bug登录之后价格不变, 因为还是从之前的本地内存中取数据
      // 登录前把之前缓存的价钱清理掉
      AsyncStorage.clear();
      header.set(personInformation.data.token);
      AsyncStorage.multiSet([
        ["token", personInformation.data.token],
        ["name", personInformation.data.name]
      ])
        .then(res => {
          this.setState({
            userName: personInformation.data.name
          });
          this.props.refreshAll();
          this.fetchBalance();
        })
        .catch(res => {
          //登陆失败
        });
    }
  };
  loginCancel = () => {
    this.setState({
      isLogined: true
    });
  };
  CustomTabBarPress = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <View style={headStyle.container}>
        <View
          style={{
            height: height - 44 - (Platform.OS === "ios" ? 0 : 24)
          }}
        >
          <Head
            userName={this.state.userName}
            userBalence={this.state.userBalence}
            navigation={this.props.navigation}
            {...this.props}
            Message={Message}
          />
          <GridBody GridItemClick={this.onGridItemClick} />
        </View>
      </View>
    );
  }
}

export default PageWithTab(Profile, "返回");

/**
 * 工具栏
 * 其中的name会在点击的时候传给GridItemClick函数
 * @parma:GridItemClick函数
 */
class GridBody extends Component {
  shouldComponentUpdate(nextProps) {
    //蠢静态的，永远不更新
    return false;
  }
  render() {
    const { GridItemClick } = this.props;
    const ToolItemSize = 33;
    const ToolItemColor = "#f79992";
    return (
      <Grid onPress={GridItemClick}>
        <ToolItem
          text="我的订单"
          name="Manifest"
          Image={
            <FontAwesome
              name="file-text-o"
              color={ToolItemColor}
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
        <ToolItem
          text="地址管理"
          name="Address"
          Image={
            <MaterialCommunityIcons
              color={ToolItemColor}
              name="map-marker-radius"
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
        <ToolItem
          text="预存款"
          name="Deposite"
          Image={
            <Ionicons
              name="logo-yen"
              color={ToolItemColor}
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
        <ToolItem
          text="意见反馈"
          name="Feedback"
          Image={
            <MaterialCommunityIcons
              color={ToolItemColor}
              name="border-color"
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
        <ToolItem
          text="修改密码"
          name="Password"
          Image={
            <MaterialCommunityIcons
              color={ToolItemColor}
              name="lock"
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
        <ToolItem
          text="退出登陆"
          name="logout"
          Image={
            <Entypo
              name="log-out"
              color={ToolItemColor}
              size={ToolItemSize}
              style={{ backgroundColor: "transparent" }}
            />
          }
        />
      </Grid>
    );
  }
}

class Message extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Message")}
        style={{
          position: "absolute",
          right: 20,
          top: 40,
          height: 35,
          width: 35,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: 'black',
          zIndex: 100
        }}
      >
        <View
          style={{
            backgroundColor: "#f5222d",
            height: 15,
            width: 15,
            borderRadius: 7.5,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 10,
            right: -5,
            top: -2
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 8,
              height: 10,
              width: 13
            }}
          >
            {this.props.messageCount}
          </Text>
        </View>
        <FontAwesome name="envelope-o" color="#fff7e6" size={24} />
      </TouchableOpacity>
    );
  }
}

const headStyle = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    height: "100%"
  },
  head: {
    height: "60%",
    backgroundColor: "#f46e65"
  }
});
