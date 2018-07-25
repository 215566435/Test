/**
 * 会员臻选页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "./Views/ExpertShareHeader";
import { ProductBox } from "../../components/ProductBox";
import { width, height, priceHelper } from "../../util";

class ExpertShare extends Component {
  // state = {};

  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchExpertShare"
    });
  }

  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  _keyExtractor = (child) => child.id

  /**
   * 渲染单个产品
   */
  renderGoods = child => {
    const item = child.item;
    const { isAud } = this.props;
    const { price, price2 } = priceHelper(isAud, item);

    return (
      <ProductBox
        onPress={() => this.props.GoodItem(item.id)}
        isAud={isAud}
        price={price}
        price2={price2}
        name={item.n}
        uri={item.i}
      />
    );
  };

  /**
   * 我来组成头部！
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="销量冠军" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 我来组成身体！
   */
  renderBody = () => {
    return (
      <FlatList
        style={{
          zIndex: -10,
          height: height - 43 - 30,
          width: width,
          backgroundColor: "#f7f7f7"
        }}
        data={this.props.expertShare}
        renderItem={this.renderGoods}
        initialNumToRender={16}
        keyExtractor={this._keyExtractor}
        numColumns={2}
      />
    );
  };


  render() {
    console.log("每日榜单中props", this.props);
    return (
      <View>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}

const mapStateToProps = applicationState => {
  return {
    ...applicationState.expertShare
  };
};

export default connect(mapStateToProps)(ExpertShare);
