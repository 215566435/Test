/**
 * 每一行佣金数据
 */
import React from "react";
import { View, Text } from "react-native";
import { timeSplit, Eng2CnSymbol } from "../../../util";

export default (CommissionWithdrawRow = (item, index) => {
  enStatusToCn = type => {
    cnType = "";
    if (type == "Paid") {
      cnType = "已放款";
    } else {
      cnType = "未通过";
    }
    return cnType;
  };
  // console.log('进入CommissionWithdrawRow');
  // console.log('CommissionWithdrawItem', item);

  // 数据结构
  // account:"dddd"
  // bankName:"www"
  // createdTime:"2018-05-01T16:30:25.98"
  // finalAmount:0
  // finalAmountCurrency:"RMB"
  // finalAmountRMB:319.8
  // id:1014
  // memberId:5196
  // notPassReason:"test"
  // payeeName:null
  // paymentTime:"0001-01-01T00:00:00"
  // status:"Paid"
  // withdrawAmount:0
  // withdrawAmountRMB:319.8
  // withdrawMethod:"PreDeposit"
  const CommissionWithdrawData = item.item;
  return (
    <View
      style={{
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: 0.5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
      }}
    >
      <View>
        <Text style={{ backgroundColor: "transparent" }}>
          提现： ¥{CommissionWithdrawData.withdrawAmountRMB} ${
            CommissionWithdrawData.withdrawAmount
          }
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#919191", backgroundColor: "transparent" }}>
            {enStatusToCn(CommissionWithdrawData.status)}
          </Text>
          <Text
            style={{
              marginLeft: 15,
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            {timeSplit(CommissionWithdrawData.createdTime).date}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color:
            CommissionWithdrawData.finalAmountRMB > 0 ? "#00a854" : "#404040",
          fontSize: 16,
          backgroundColor: "transparent"
        }}
      >
        发放：{Eng2CnSymbol(CommissionWithdrawData.finalAmountCurrency)}
        {CommissionWithdrawData.finalAmountCurrency == "RMB"
          ? CommissionWithdrawData.finalAmountRMB
          : CommissionWithdrawData.finalAmount}
      </Text>
    </View>
  );
});
