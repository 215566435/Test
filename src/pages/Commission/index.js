/**
 * 佣金页面
 * 06/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";

class Commission extends Component {
  componentDidMount() {
    this.props.dispatch({
        type: 'fetchCommissionList'
    });
  }
  render() {
    // 渲染主题页面
    console.log("commission state", this.props.commission);
    return (
      <FlatList
        data={this.props.commissionList || []}
        renderItem={() => {
          <Text>1</Text>;
        }}
        keyExtractor={i => {
          return i.i;
        }}
      />
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
