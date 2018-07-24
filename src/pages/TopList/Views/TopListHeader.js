import React, { Component } from "react";
import { PageHeader } from "../../../components/PageHeader";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  WebView
} from "react-native";
import { width } from "../../../util";
export const HeaderWithLeftArrow = ({ onPress, title }) => {
  return (
    <PageHeader>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          top: Platform.OS === "ios" ? 10 : 0
        }}
      >
        <TouchableOpacity onPress={onPress} style={{ width: 40 }}>
          <View
            style={{
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              marginLeft: 10,
              height: 15,
              width: 15,
              transform: [{ rotateZ: "45deg" }, { perspective: 1000 }]
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            backgroundColor: "transparent",
            width: width - 80
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row"
        }}
      />
    </PageHeader>
  );
};
