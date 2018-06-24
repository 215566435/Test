/**
 * 每一行佣金提现数据
 */
import React from "react";
import { View, Text } from "react-native";
import { timeSplit, Eng2CnSymbol, height, width } from "../../../util";

export default (CommissionWithdrawRow = (item, index) => {
  /**
   * 请求返回的英文提款状态转中文
   */
  enStatusToCn = type => {
    //     //提款状态
    //     /// <summary>
    //     /// 待审核
    //     /// </summary>
    //     [Text("待审核")]
    //     Pending = 0,

    //     /// <summary>
    //     /// 待放款
    //     /// </summary>
    //     [Text("待放款")]
    //     WaitingTobePaid = 1,

    //     /// <summary>
    //     /// 已放款
    //     /// </summary>
    //     [Text("已放款")]
    //     Paid = 2,

    //     /// <summary>
    //     /// 未通过
    //     /// </summary>
    //     [Text("未通过")]
    //     NotPass = 3,
    cnType = "";
    if (type == "Paid") {
      cnType = "已放款";
    } else if (type == "Pending") {
      cnType = "待审核";
    } else if (type == "WaitingTobePaid") {
      cnType = "待放款";
    } else if (type == "NotPass") {
      cnType = "未通过";
    }
    return cnType;
  };

  /**
   * 请求返回的提款方式转中文
   */
  enMethodToCn = type => {
    cnMethod = "";
    if (type == "PreDeposit") {
      cnMethod = "预存款";
    } else if (type == "WeChat") {
      cnMethod = "微信";
    } else if (type == "Alipay") {
      cnMethod = "支付宝";
    } else if (type == "ChinaBank") {
      cnMethod = "中国境内银行";
    } else if (type == "OverseasBankAUD") {
      cnMethod = "境外银行-澳币";
    }
    return cnMethod;
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

  // <Text style={{ color: "#919191", backgroundColor: "transparent" }}>
  //           {enStatusToCn(CommissionWithdrawData.status)}
  //         </Text>
  const CommissionWithdrawData = item.item;
  return (
    <View
      style={{
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: 0.5,
        marginTop: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10
      }}
    >
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <View style={{ width: (3 * width) / 5 }}>
          <Text style={{ backgroundColor: "transparent" }}>
            申请金额：¥{CommissionWithdrawData.withdrawAmountRMB} ${
              CommissionWithdrawData.withdrawAmount
            }
          </Text>
        </View>
        <View style={{ width: (2 * width) / 5 }}>
          <Text
            style={{
              color:
                CommissionWithdrawData.finalAmountRMB > 0
                  ? "#00a854"
                  : "#404040",
              backgroundColor: "transparent"
            }}
          >
            发放：{Eng2CnSymbol(CommissionWithdrawData.finalAmountCurrency)}
            {CommissionWithdrawData.finalAmountCurrency == "RMB"
              ? CommissionWithdrawData.finalAmountRMB
              : CommissionWithdrawData.finalAmount}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1
        }}
      >
        <View style={{ width: (3 * width) / 5 }}>
          <Text
            style={{
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            申请时间：{timeSplit(CommissionWithdrawData.createdTime).date}
          </Text>
        </View>
        <View style={{ width: (2 * width) / 5 }}>
          <Text
            style={{
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            状态：{enStatusToCn(CommissionWithdrawData.status)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1
        }}
      >
        <View style={{ width: (3 * width) / 5 }}>
          <Text
            style={{
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            受理时间：{timeSplit(CommissionWithdrawData.paymentTime).date}
          </Text>
        </View>
        <View style={{ width: (2 * width) / 5 }}>
          <Text
            style={{
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            账户：{enMethodToCn(CommissionWithdrawData.withdrawMethod)}
          </Text>
        </View>
      </View>
    </View>
  );
});
