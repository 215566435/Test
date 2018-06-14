/**
 * 佣金页面
 * 06/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
//每行的渲染样式
import CommissionRow from "./View/CommissionRow";
// 从manifest页面拿来头部
import { HeaderWithLeftArrow } from "../Manifest";

class Commission extends Component {
  state = {
    pageIndex = 1
  }
  componentDidMount() {
    this.props.dispatch({
      type: "fetchCommissionList"
    });
  }

  //返回主页方法
  goBack = () => {
    this.props.navigation.goBack(null)
  }

  EndReachHandler = (pageIndex) => {
    
  }
  render() {
    // 渲染主题页面
    console.log("commission state", this.props.commission);
    return (
      <View>
        <HeaderWithLeftArrow title="佣金记录" onPress={this.goBack} />
        <FlatList
          data={this.props.commission || []}
          renderItem={CommissionRow}
          keyExtractor={item => item.id}
          onEndReached={}
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
