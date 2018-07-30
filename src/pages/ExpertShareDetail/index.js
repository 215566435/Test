/**
 * 达人分享页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { Spin } from "../../components/Spin";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import AnimatedImage from "../../components/AnimatedImage";
import { PageWithTab } from "../../HOC/PageWithTab";
import { width, height, priceHelper } from "../../util";

class ExpertShareDetail extends Component {
  // state = {};

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchExpertShareDetail"
    });
  }
  /********************* 事件handler **********************/

  /**
   * 底部Tab的按键handler
   */
  CustomTabBarPress = (e, child, index) => {
    console.log("分享");
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
   * 渲染头部
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="达人分享" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染featuredImage
   */
  renderFeaturedImage = () => {
    const { image } = this.props.data;

    return (
      <View style={style.rowDefaultStyle}>
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
    );
  };

  /**
   * 渲染作者
   */
  renderAuthor = () => {
    const { avatar, author } = this.props.data;
    return (
      <View style={style.rowAuthorStyle}>
        <AnimatedImage
          url={
            "http://cdn2u.com" +
            avatar +
            `?width=${30}` +
            `&height=${30}` +
            `&bgcolor=white `
          }
          Pheight={30}
          Pwidth={30}
          style={style.authorStyle}
        />
        <Text style={style.authorStyle}>{author}</Text>
      </View>
    );
  };

  /**
   * 渲染featuredImage
   */
  renderContent = () => {
    return (
      <View style={style.contentStyle}>
        <Text>正文111</Text>
      </View>
    );
  };

  render() {
    console.log("达人分享中props", this.props);
    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderFeaturedImage()}
        {this.renderAuthor()}
        {this.renderContent()}
      </View>
    );
  }
}

// 页面的样式对象
const style = {
  pageStyle: {
    height: height - 44,
    width: width,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  rowDefaultStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  // renderFeaturedImage组件的样式
  imageStyle: {},
  // renderAuthorStyle组件的样式
  rowAuthorStyle: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  authorStyle: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  // renderContent组件的样式
  contentStyle: {
    marginLeft: 20,
    marginRight: 20
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.expertShareDetail
  };
};

const wrapper = PageWithTab(ExpertShareDetail, ["分享"], ["#ff7875"]);

export default connect(mapStateToProps)(wrapper);
