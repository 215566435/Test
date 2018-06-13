/**
 * 每一行佣金数据
 */
import React from "react";
import {
  View,
  Text,
} from "react-native";

export default CommissionRow = (item) => {
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
        {item.content ? (//填写需要输出的数据
          <Text style={{ backgroundColor: "transparent" }}>{item.orderid}</Text>
        ) : (
          <Text>{item.type}</Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#919191", backgroundColor: "transparent" }}>
            {item.date}
          </Text>
          <Text
            style={{
              marginLeft: 15,
              color: "#919191",
              backgroundColor: "transparent"
            }}
          >
            {item.time}
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
        {item.depositChangeStr}
      </Text>
    </View>
  );
};
