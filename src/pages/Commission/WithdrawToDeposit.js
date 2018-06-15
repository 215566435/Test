/**
 * 佣金页面
 * 06/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
// 从manifest页面拿来头部
import { HeaderWithLeftArrow } from "./View/CommissionHeader";
// 把组件用高阶组件包一下，让组件具有下面两个button
import { PageWithTab } from "../../HOC/PageWithTab";

class WithdrawToDeposit extends Component {
  componentDidMount() {
    //页面加载完成，第一次获取数据，
    this.props.dispatch({
      type: "fetchCommission"
    });
  }

  CustomTabBarPress = (e, child, index) => {
    this.props.navigation.goBack();
    //this.props.dispatch({ type: "updateMessage" });
  };
  
  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    console.log("提现到存款页面的this.props", this.props);
    console.log("提现到存款页面的this.props", this.props.AUD);
    console.log("提现到存款页面的this.props", this.props.RMB);
    // 注意因为JS第一遍加载组件，第二遍加载数据，第一遍RMB.total,RMB不能为空。所以应该判断一下
    console.log(
      "提现到存款页面的this.props",
      this.props.RMB ? this.props.RMB.total : 0
    );
    return (
      <View>
        <HeaderWithLeftArrow title="提现到预存款" onPress={this.goBack} />
        <View style={{ padding: 20 }}>
          <Text>可提 ¥ {this.props.RMB ? this.props.RMB.total : 0}</Text>
          <Text style={{ paddingBottom: 20 }}>
            可提 $ {this.props.AUD ? this.props.AUD.total : 0}
          </Text>
          <Text>我们会把提现金额打到您的预存款帐户</Text>
          <Text>您的申请提交后，我们将：</Text>
          <Text>1.在2个工作日内，审核您的体现申请。</Text>
          <Text>2.在2个工作日内，跟您打款。</Text>
          <Text>
            3.如果银行或微信帐户名称不对，将驳回您的申请，您将需要重新申请。
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // 从application level state 中拿到 commission state
    // commission就是model中的namespace
    ...state.commission.commissionAmounts
  };
}
// 增加底部按钮
const wapprer = PageWithTab(WithdrawToDeposit, ["提交申请"], ["#f5222d"]);

export default connect(mapStateToProps)(wapprer);
