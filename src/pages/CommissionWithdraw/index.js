/**
 * 佣金提现记录页面
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
class CommissionWithdraw extends Component {
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
    //如果是下完单转过来的，点击goBack直接返回到profile页面
    //但是，目前profile页面自己配置的路由，不能直接this.props.navigation.pop(3)回去
    //暂时用这种方法回去，同时也有别的bug，profile page的返回按钮直接goback的话回到本页，
    //形成了循环返回，需要修改profile页面的返回按钮
    if (this.props.navigation.state.params.flag) {
      this.props.navigation.navigate("Profile");
    } else {
      this.props.navigation.goBack(null);
    }

    //this.props.navigation.goBack();
    //返回两个页面 
    //this.props.navigation.pop(2)
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
    console.log(
      "index文件CommissionWithdraw state",
      this.props.CommissionWithdraw
    );
    console.log("index文件props", this.props);
    return (
      <View>
        <HeaderWithLeftArrow title="佣金提现记录" onPress={this.goBack} />
        <FlatList
          data={this.props.CommissionWithdraw || []}
          renderItem={CommissionWithdrawRow}
          keyExtractor={item => item.id}
          onEndReached={this.endReachHandler}
          initialNumToRender={6}
          onEndReachedThreshold={0.1}
          style={{ marginBottom: 60 }}
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
