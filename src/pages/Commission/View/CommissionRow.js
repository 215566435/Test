/**
 * 每一行佣金数据
 */
import React from "react";
import { View, Text } from "react-native";
import { timeSplit, Eng2CnSymbol } from "../../../util";

export default (CommissionRow = (item, index) => {
  EnTypeToCNType = (type) => {
    cnType = '';
    if (type == 'Returns') {
      cnType = '退货';
    } else {
      cnType = '下单';
    }
    return cnType;
  }
  console.log('进入CommissionRow');
  console.log('CommissionItem', item);
        // 数据
        // 0:Object
        // commissionPrice:-59.63
        // commissionType:"Returns"
        // commissionUserId:5196
        // commissionUserPrice:132.5
        // createTime:"2018-05-21T11:08:24.97"
        // currency:"RMB"
        // id:25
        // orderId:"70000731587"
        // remark:null
        // status:"NotWithdrawn"
  const commissionData = item.item;
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
        <Text style={{ backgroundColor: "transparent" }}>订单号：{commissionData.orderId}</Text> 
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#919191", backgroundColor: "transparent" }}>
            {EnTypeToCNType(commissionData.commissionType)}
          </Text>
          <Text
            style={{
              marginLeft: 15,
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            {timeSplit(commissionData.createTime).date}
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
        {Eng2CnSymbol(commissionData.currency)}{commissionData.commissionPrice}
      </Text>
    </View>
  );
});
