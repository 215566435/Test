/**
 * 每一行佣金数据
 */
import React from "react";
import { View, Text } from "react-native";
import { timeSplit, Eng2CnSymbol } from "../../../util";

export default (CommissionWithdrawRow = (item, index) => {
  EnTypeToCNType = (type) => {
    cnType = '';
    if (type == 'Returns') {
      cnType = '退货';
    } else {
      cnType = '下单';
    }
    return cnType;
  }
  // console.log('进入CommissionWithdrawRow');
  // console.log('CommissionWithdrawItem', item);
        // 数据
        // 0:Object
        // CommissionWithdrawPrice:-59.63
        // CommissionWithdrawType:"Returns"
        // CommissionWithdrawUserId:5196
        // CommissionWithdrawUserPrice:132.5
        // createTime:"2018-05-21T11:08:24.97"
        // currency:"RMB"
        // id:25
        // orderId:"70000731587"
        // remark:null
        // status:"NotWithdrawn"
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
        <Text style={{ backgroundColor: "transparent" }}>订单号：{CommissionWithdrawData.orderId}</Text> 
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#919191", backgroundColor: "transparent" }}>
            {EnTypeToCNType(CommissionWithdrawData.CommissionWithdrawType)}
          </Text>
          <Text
            style={{
              marginLeft: 15,
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            {timeSplit(CommissionWithdrawData.createTime).date}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: item.depositChange > 0 ? "#00a854" : "#404040",
          fontSize: 18,
          backgroundColor: "transparent"
        }}
      >
        {Eng2CnSymbol(CommissionWithdrawData.currency)}{CommissionWithdrawData.CommissionWithdrawPrice}
      </Text>
    </View>
  );
});
