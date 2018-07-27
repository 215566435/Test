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
import { PageWithTab } from '../../HOC/PageWithTab';
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
    console.log('分享);
  }

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
    return (
      <View>
        <Text>大图片</Text>
      </View>
    );
  };

  /**
   * 渲染作者
   */
  renderAuthor = () => {
    return (
      <View>
        <Text>作者</Text>
      </View>
    );
  };

  /**
   * 渲染featuredImage
   */
  renderContent = () => {
    return (
      <View>
        <Text>正文</Text>
      </View>
    );
  };

  render() {
    console.log("达人分享中props", this.props);
    return (
      <View>
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
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.expertShareDetail
  };
};

const wrapper = PageWithTab(ExpertShareDetail, ['分享'], ['#ff7875'])

export default connect(mapStateToProps)(wrapper);
