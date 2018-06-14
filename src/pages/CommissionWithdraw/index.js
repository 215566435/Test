/**
 * 佣金页面
 * 06/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//每行的渲染样式
import CommissionWithdrawRow from "./View/CommissionWithdrawRow";
// 从manifest页面拿来头部
import { HeaderWithLeftArrow } from "./View/CommissionWithdrawHeader";

// 声明一个变量pageIndex记录目前的页数
let pageIndex = 1;
class CommissionWithdrawWithdraw extends Component {
  componentDidMount() {
    //页面加载完成，第一次获取数据，
    this.props.dispatch({
      type: "fetchCommissionWithdrawList",
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
   * 页面加载到底
   */
  endReachHandler = () => {
    pageIndex++;
    this.props.dispatch({
      type: "fetchCommissionWithdrawList",
      payload: { pageIndex } //payload必须是对象
    });
  };
  render() {
    // 渲染主题页面
    console.log("index文件CommissionWithdraw state", this.props.CommissionWithdraw);
    return (
      <View>
        <HeaderWithLeftArrow title="佣金记录" onPress={this.goBack} />
        <View style={{
          alignItems: "center",
          flexDirection: "row",
        }}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                textAlign: "left",
                backgroundColor: "transparent",
                width: 150,
                padding: 20,
                top: 10
              }}
            >
              申请提现
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { 
            //this.props.navigation.navigate('CommissionWithdraw', { pack })
           }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: "right",
                backgroundColor: "transparent",
                width: 160,
                padding: 20,
                top: 10
              }}
            >
              佣金提现记录
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.CommissionWithdraw || []}
          renderItem={CommissionWithdrawRow}
          keyExtractor={item => item.id}
          onEndReached={this.endReachHandler}
          initialNumToRender={6}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // 从application level state 中拿到 CommissionWithdraw state
    ...state.CommissionWithdraw
  };
}

export default connect(mapStateToProps)(CommissionWithdraw);
