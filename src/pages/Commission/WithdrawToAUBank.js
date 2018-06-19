/**
 * 提现到境外银行页面
 * 06/18创建
 */

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
import { connect } from "react-redux";
// 从manifest页面拿来头部
import { HeaderWithLeftArrow } from "./View/CommissionHeader";
// 把组件用高阶组件包一下，让组件具有页面底部button
import { PageWithTab } from "../../HOC/PageWithTab";
import { header, Url, height, width } from "../../util";
import { centralization } from "../../style-util";
import { Input, InputSelfControl } from "../../components/Input";
import { Page } from "../../components/page";

class WithdrawToAUBank extends Component {
  componentDidMount() {
    //页面加载完成，第一次获取佣金数据，和提现需要的MaxCommitionID
    this.props.dispatch({
      type: "fetchCommission"
    });
  }

  /**
   * 创建点击最下面提交申请按钮的eventHandler
   */
  CustomTabBarPress = (e, child, index) => {
    //发起提现请求,因为需要返回success再跳转，所以这里采取的办法是把this传到model中，在model中处理跳转，
    //但是个人觉得不是很合理，最好在dispatch这里接一个then（）但是直到可行不可行。
    this.props.dispatch({
      type: "createCommissionWithdraw",
      payload: {
        maxCommissionId: this.props.data,
        Account: this.bankAccount,
        BankName: this.bankName,
        OrderCommissionWithdrawMethod: "OverseasBankAUD",
        PayName: '',
        instance: this
      }
    });
    //返回上一页，这里比较敏感，需要把this传到后台，然后在后台执行完毕，返回成功，跳转页面
    //this.props.navigation.goBack();
  };

  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  //   onFocus = () => {
  //     this.setState({
  //       isKeyboardShow: true
  //     })
  //   }

  //   onBlur = () => {
  //     this.setState({
  //       isKeyboardShow: false
  //     })
  //   }

  // 绑定输入数据显示
  onChangeText = (text, name) => {
    if (this[name] !== void 666) {
      this[name] = text;
    } else {
      this[name] = "";
      this[name] = text;
    }
  };

  render() {
    console.log("提现到境外银行页面的this.props", this.props);
    return (
      <Page>
        <View
          style={{
            height: height - 44 - (Platform.OS === "ios" ? 0 : 24),
            flexDirection: "column"
          }}
        >
          <HeaderWithLeftArrow title="提现到境外银行-澳币" onPress={this.goBack} />
          <View style={centralization({ flex: 1 })}>
            <View>
              <Text style={{ fontSize: 20 }}>
                可提人民币 ¥ {this.props.RMB ? this.props.RMB.total : 0}
              </Text>
              <Text style={{ paddingBottom: 50, fontSize: 20 }}>
                可提澳币 $ {this.props.AUD ? this.props.AUD.total : 0}
              </Text>
            </View>
            <Input
              addonBefore="银行账号"
              placeholder="请输入您的银行账号"
              name="bankAccount"
              onChangeText={this.onChangeText}
            />
            <Input
              addonBefore="银行名称"
              placeholder="请输入您的银行名称"
              name="bankName"
              onChangeText={this.onChangeText}
            />
            <View style={{ alignItems: "flex-start", padding: 20 }}>
              <Text>我们会把提现金额转成澳币，打到您的海外银行帐户（有可能产生个人税费，请自行报税）</Text>
              <Text>您的申请提交后，我们将：</Text>
              <Text>1.在2个工作日内，审核您的体现申请。</Text>
              <Text>2.在2个工作日内，跟您打款。</Text>
              <Text>
                3.如果银行或微信帐户名称不对，将驳回您的申请，您将需要重新申请。
              </Text>
            </View>
          </View>
        </View>
      </Page>
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
const wapprer = PageWithTab(WithdrawToAUBank, ["提交申请"], ["#f5222d"]);

export default connect(mapStateToProps)(wapprer);
