/**
 * 销量冠军页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "./Views/TopListHeader";
import { ProductBox } from "../../components/ProductBox";
import { width, height, priceHelper } from "../../util";
import { Tabs } from "antd-mobile-rn";

class TopList extends Component {
  // state = {};

  /********************* 声明周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchTopList"
    });
  }

  /********************* 事件handler **********************/
  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  // 对象的id当做key
  _keyExtractor = child => child.id;

  /**
   * tabs被点击
   */
  _onTabChange = () => {};

  /********************* 渲染页面的方法 **********************/
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
   * 渲染头部
   */
  renderHeader = () => {
    return (
      <View style={style.pageStyle}>
        <HeaderWithLeftArrow title="销量冠军" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染Tab
   */
  renderTab = () => {
    console.log("页面中的tabs", this.props.data.tabs);
    return (
      <Tabs
        tabs={this.props.data.tabs}
        //page={1}
        //initialPage={0}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        //onChange={(tab, index) => this._onTabChange(tab, index)}
      >
        <View>
          <Text>Content of First Tab</Text>
        </View>
        <View>
          <Text>Content of Second Tab</Text>
        </View>
        <View>
          <Text>Content of Third Tab</Text>
        </View>
      </Tabs>
    );
  };

  /**
   * 渲染列表
   */
  renderList = () => {
    console.log("list", this.props.topList);
    return (
      <FlatList
        data={this.props.topList.items ? this.props.topList.items : {}}
        renderItem={this.renderGoods}
        initialNumToRender={16}
        keyExtractor={this._keyExtractor}
        numColumns={2}
      />
    );
  };

  render() {
    console.log("销量冠军中props", this.props);

    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderTab()}
        {this.renderList()}
      </View>
    );
  }
}

// 页面的样式对象
const style = {
  pageStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.topList
  };
};

export default connect(mapStateToProps)(TopList);
