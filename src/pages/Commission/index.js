/**
 * 佣金来源详情页面
 * 06/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
//每行的渲染样式
import CommissionRow from "./View/CommissionRow";
// 从manifest页面拿来头部
import { HeaderWithLeftArrow } from "./View/CommissionHeader";
// 帮助类里面拿到屏幕的长宽
import { width, height } from "../../util";

// 声明一个变量pageIndex记录目前的页数
let pageIndex = 1;
class Commission extends Component {
  componentDidMount() {
    //页面加载完成，第一次获取数据，
    this.props.dispatch({
      type: "fetchCommissionList",
      payload: { pageIndex } //payLoad必须是对象
    });
  }

  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  /**
   * 页面加载到底,触发请求渲染下一页
   */
  endReachHandler = () => {
    // 这里需要-1， 我也不知道为什么，可能是因为程序启动时候所有方法都会被调用一次吧，不然就直接到第三页！！！
    pageIndex++;
    console.log('pagIndex', pageIndex);
    this.props.dispatch({
      type: "fetchCommissionList",
      payload: { pageIndex } //payload必须是对象
    });
  };

  /**
   * 申请提现按钮
   * 弹出警告栏选择提现方法
   */
  withdrawHandler = () => {
    Alert.alert(
      "选择提现账户",
      "",
      [
        {
          text: "预存款",
          onPress: () => {
            //{ ...this.props.commission }这个第二个参数就是传入的props
            //this.props.navigation.navigate("WithdrawToDeposit", { ...this.props.commission });
            this.props.navigation.navigate("WithdrawToDeposit", {});
          }
        },
        {
          text: "微信",
          onPress: () => {
            this.props.navigation.navigate("WithdrawToWeChat", {});
          }
        },
        {
          text: "支付宝",
          onPress: () => {
            this.props.navigation.navigate("WithdrawToAlipay", {});
          }
        },
        {
          text: "中国境内银行",
          onPress: () => {
            this.props.navigation.navigate("WithdrawToCNBank", {});
          }
        },
        {
          text: "境外银行-澳币",
          onPress: () => {
            this.props.navigation.navigate("WithdrawToAUBank", {});
          }
        },
        { text: "取消" }
      ],
      { cancelable: false }
    );
  };

  render() {
    // 渲染主题页面
    console.log("佣金来源文件commission state", this.props.commission);
    console.log("佣金来源文件的this.props", this.props);
    //style={{height: height-10}}
    return (
      <View>
        <View>
          <View>
            <HeaderWithLeftArrow title="佣金来源详情" onPress={this.goBack} />
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              height: 50
            }}
          >
            <TouchableOpacity onPress={this.withdrawHandler}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "left",
                  backgroundColor: "transparent",
                  width: 160,
                  padding: 20,
                  paddingBottom: 10
                }}
              >
                申请提现
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("CommissionWithdraw");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "right",
                  backgroundColor: "transparent",
                  width: 160,
                  padding: 20,
                  paddingBottom: 10
                }}
              >
                提现记录
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.props.commission || []}
          renderItem={CommissionRow}
          keyExtractor={item => item.id}
          onEndReached={this.endReachHandler}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // 从application level state 中拿到 commission state
    ...state.commission
  };
}

export default connect(mapStateToProps)(Commission);
