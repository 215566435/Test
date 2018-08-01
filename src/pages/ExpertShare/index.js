/**
 * 达人分享列表页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import { ProductBox } from "../../components/ProductBox";
import AnimatedImage from "../../components/AnimatedImage";
import { width, height, goBack, priceHelper } from "../../util";

class ExpertShare extends Component {
  // state = {};

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchExpertShare"
    });
  }

  /********************* 事件handler **********************/

  /**
   * 跳转到单个文章的方法
   */
  onPressHandler = id => {
    console.log('onPressHandler中的id', id);
    this.props.navigation.navigate("ExpertShareDetail", {
      expertShareId: id
    });
  };
  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  _keyExtractor = child => child.id;

  /********************* 渲染页面的方法 **********************/

  /**
   * 渲染单个信息
   */
  renderExpertShareRow = (item, index) => {
    const { image, title, subTitle, id } = item.item;
    console.log("id", id);
    return (
      <TouchableOpacity
        style={style.rowStyle.rowDefaultStyle}
        onPress={ id => {
          console.log("id", id);
          this.onPressHandler(id);
        }}
      >
        <View
          style={{ ...style.rowStyle.AnimatedImage, ...style.defaultStyle }}
        >
          <AnimatedImage
            url={
              "http://cdn2u.com" +
              image +
              `?width=${800}` +
              `&height=${500}` +
              `&bgcolor=white `
            }
            Pheight={200}
            Pwidth={width - 20}
            style={style.defaultStyle}
          />
        </View>
        <Text style={style.rowStyle.title}>{title}</Text>
        <Text style={style.rowStyle.subTitle}>{subTitle}</Text>
      </TouchableOpacity>
    );
  };

  /**
   * 渲染页面头部
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="达人分享" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染列表
   */
  renderList = () => {
    return (
      <FlatList
        data={this.props.expertShare}
        renderItem={this.renderExpertShareRow}
        initialNumToRender={6}
        keyExtractor={this._keyExtractor}
        style={style.flatListStyle}
      />
    );
  };

  render() {
    console.log("达人分享列表中props", this.props);
    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderList()}
      </View>
    );
  }
}

// 页面的样式对象
const style = {
  pageStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  flatListStyle: {},
  rowStyle: {
    rowDefaultStyle: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    AnimatedImage: {
      width: width - 20,
      height: 200,
      flexDirection: "column"
    },
    title: {
      width: width - 20,
      height: 20,
      fontSize: 14,
      flexDirection: "column"
    },
    subTitle: {
      width: width - 20,
      height: 20,
      fontSize: 12,
      color: "#CCC",
      flexDirection: "column"
    }
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.expertShare
  };
};

export default connect(mapStateToProps)(ExpertShare);
