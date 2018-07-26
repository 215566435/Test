/**
 * 2017/10/30 方正 创建
 * 用于页面的自定义头部
 * @param {*} leftBtnPress:左边按钮点击
 * @param title:标题
 */
import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  Text,
  Switch
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { stateBarMargin, width } from "../util";

// import { } from 'HOC/ModalWrapper'

/**
 * 简单页面头
 * 其实这用样式组件，可以不用classbased component
 */
export class PageHeader extends React.Component {
  render() {
    const { style } = this.props;
    const rawStyle = {
      height: stateBarMargin(43),
      borderBottomWidth: 0.5,
      borderBottomColor: "rgba(120,120,120,0.3)",
      justifyContent: "center"
    };
    const merge = StyleSheet.create({ merge: { ...rawStyle, ...style } });
    return <View style={merge.merge}>{this.props.children}</View>;
  }
}

/**
 * 带搜索和切换币种的页面头
 * 其实这用样式组件，可以不用classbased component
 */
export class CustomHeader extends React.Component {
  state = {
    show: false
  };
  onCartPress = () => {
    this.setState({
      show: false
    });
    if (this.props.onCartPress) this.props.onCartPress();
  };

  onFocus = () => {
    this.props.search();
  };

  onPress = () => {
    this.setState({
      show: true
    });
    if (this.props.onPress) this.props.onPress();
  };
  onClose = () => {
    this.setState({
      show: false
    });
  };

  // 渲染首页的CateList（分类列表）
  renderCateList = () => {
    const { cateList } = this.props;
    console.log("渲染首页CateList", cateList);
    console.log("renderCateList方法的props", this.props);
    return (
      <View>
        {/* <Text>{cateList && cateList.length > 0 ? cateList[0].name : '暂无分类'}</Text> */}
        {cateList && cateList.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cateList.map(item => {
              return (
                <TouchableOpacity key={item.name} onPress = {this.props.onCateListPress}>
                  <View
                    style={{
                      height: 30,
                      width: 120,
                      padding: 5,
                      borderWidth: 0.5,
                      borderColor: "#f7f7f7",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        backgroundColor: "transparent",
                        textAlign: "center"
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <Text>暂无分类</Text>
        )}
      </View>
    );
  };

  render() {
    const { isPanelVisiable, onPress, onValueChange, isShowAud } = this.props;

    return (
      <View>
        <PageHeader style={{ backgroundColor: "#f46e65" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              top: Platform.OS === "ios" ? 10 : 0
            }}
          >
            <FakeSearchBar placeholder="秒杀 " onFocus={this.onFocus} />
            <TouchableOpacity
              style={{ right: 4, width: 40 }}
              onPress={this.onPress}
            >
              <SimpleLineIcons
                name="options"
                size={26}
                color="#fcdbd9"
                style={{ backgroundColor: "transparent" }}
              />
            </TouchableOpacity>
            <Modal
              visible={this.state.show}
              transparent={true}
              onRequestClose={() => {}}
            >
              <View
                style={{
                  height: 80,
                  width: 150,
                  backgroundColor: "#222222",
                  zIndex: 10,
                  right: 4,
                  position: "absolute",
                  top: 45 + (Platform.OS === "ios" ? 23 : 0),
                  borderRadius: 5,
                  padding: 5
                }}
              >
                <SwitchWithTitle
                  title={"显示澳币"}
                  onValueChange={onValueChange}
                  value={isShowAud}
                />
                <TouchableOpacity
                  onPress={this.onCartPress}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 14,
                      backgroundColor: "transparent"
                    }}
                  >
                    购物车
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ height: "100%", width: "100%", position: "absolute" }}
                onPress={this.onClose}
              />
            </Modal>
          </View>
        </PageHeader>
        {this.renderCateList()}
      </View>
    );
  }
}

/**
 * 带左箭头返回按钮的页面头部
 * 这里用functionbased component才是正确的做法
 */
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

/**
 * 转换澳币和RMB方法
 */
const SwitchWithTitle = ({ title, tintColor = "white", ...otherProps }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Text style={{ color: tintColor, backgroundColor: "transparent" }}>
        {title}
      </Text>
      <Switch {...otherProps} onTintColor="#f46e65" />
    </View>
  );
};

/**
 * 搜索栏组件
 */
class FakeSearchBar extends Component {
  render() {
    const { placeholder } = this.props;
    return (
      <View
        style={{
          marginLeft: 8,
          borderRadius: 5,
          flexDirection: "row",
          backgroundColor: "#f79992",
          height: 30,
          width: "70%",
          alignItems: "center"
        }}
      >
        <View
          style={{
            marginLeft: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Ionicons
            name="ios-search-outline"
            size={18}
            color="#fcdbd9"
            style={{ backgroundColor: "transparent" }}
          />
          <TouchableOpacity
            style={{ width: "80%", marginLeft: 8 }}
            onPress={this.props.onFocus}
          >
            <Text style={{ backgroundColor: "transparent" }}>
              {placeholder}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
