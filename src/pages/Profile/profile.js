/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆
 *
 * 逻辑入口在checkLogin
 */
//TODO：修改佣金提现之后循环返回问题
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Modal
} from "react-native";
import { Grid } from "../../components/Grid";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // 4.4.2
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { header, Url, height, width } from "../../util";
import { PageWithTab } from "../../HOC/PageWithTab";
import { ToolItem } from "./profile-tools";
import { Head } from "./profile-head";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import codePush from "react-native-code-push";
import { StackNavigator } from "react-navigation"; // 1.0.0-beta.14
import { CustomTabBar } from "../../components/CustomTabBar";
import Login from "../Login";

/**
 * 个人资料组件，整体，包括上下两部分，上半部分又profile-head.js引入
 */
class Profile extends React.Component {
  state = {
    userName: "",
    userBalence: {
      aud: "",
      rmb: ""
    },
    userCommission: {
      aud: "",
      rmb: ""
    },
    isWithdrawAvailable: {
      isWithdrawAvailable: ""
    }
  };

  getIsWithdrawAvailable = () => {
    return this.state.isWithdrawAvailable.isWithdrawAvailable;
  };

  /**
   * 封装接收存款余额的方法
   */
  fetchBalance = () => {
    (async that => {
      const res = await fetch(Url + "user/GetDepositBalance", {
        method: "POST",
        headers: header.get(),
        body: "{}"
      });
      console.log("fetchBalance", res);
      const json = await res.json();
      that.setState({
        userBalence: {
          aud: json.data[1],
          rmb: json.data[0]
        }
      });
    })(this);
  };

  /**
   * 封装接收佣金余额的方法
   */
  fetchCommission = () => {
    (async that => {
      // that相当于this，这个是两个括号，立即自执行函数，应该是为了确保this不变。但是不确定？？？
      const res = await fetch(Url + "user/GetCommissionSummary", {
        method: "POST",
        headers: header.get(),
        body: "{}"
      });
      console.log("fetchCommission", res);

      try {
        const json = await res.json();
        console.log("rmb", json.data.commissionAmounts.RMB);
        console.log("rmb", json.data.commissionAmounts.RMB.total);
        console.log("isWithdrawAvailable", json.data.isWithdrawAvailable);
        //console.log('AUD', json.parse(json.data.commissionAmounts.AUD));
        that.setState({
          userCommission: {
            // aud: json.data.commissionAmounts.AUD.total || 0,
            aud: json.data.commissionAmounts.AUD.total,
            rmb: json.data.commissionAmounts.RMB.total
          },
          isWithdrawAvailable: {
            isWithdrawAvailable: json.data.isWithdrawAvailable
          }
        });
      } catch (error) {
        console.log("请求佣金报错,佣金模块还未上线", error);
        that.setState({
          userCommission: null
        }
        )
      }
    })(this);
  };

  componentDidMount() {
    this.checkLogin();
    //发送到charge/charge.js下面的mapProfileInstance
    //dispatch是从connect传入的
    //就因为有这个disptch，所以需要在把profile.js在store中配置，但是好像并没有使用啊！
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
              AsyncStorage.removeItem("token")
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

  /**
   * 查看本地内存检验login
   * 如果存在token，那么发起请求，接收存款和佣金
   */
  checkLogin = () => {
    AsyncStorage.multiGet(["token", "name"])
      .then(res => {
        // 如果不存在token，转到login页面，清空状态，
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
          // 如果存在，更新状态
          header.set(res[0][1]);
          this.setState({
            userName: res[1][1]
          });
          // 发起请求，接收存款余额
          this.fetchBalance();
          // 发起请求， 接受用佣金
          this.fetchCommission();
        }
      })
      .catch(res => {
        //出错
      });
  };

  /**
   * 登陆完成以后清空，收取存款和佣金
   */
  onLoginFinished = personInformation => {
    if (personInformation.success === true) {
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
          this.fetchCommission();
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
    //TODO：修改佣金提现之后循环返回问题
    //目前因为goBack不能刷新状态，所以这里只能使用navigate回去了，这里有瑕疵
    //不然回不去了
    //this.props.navigation.goBack(null);
    this.props.navigation.navigate('Home');
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
            userCommission={this.state.userCommission}
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

// 回到主页
export default PageWithTab(Profile, "主页");

/**
 * 工具栏，就是个人信息的下半部分
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

/**
 * 右上角的系统信息
 */
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

/**
 * 上半部分的样式
 */
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
