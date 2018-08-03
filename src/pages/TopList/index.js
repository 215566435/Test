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
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import AnimatedImage from "../../components/AnimatedImage";
import { ProductBox } from "../../components/ProductBox";
import { width, height, priceHelper } from "../../util";
import { Tabs } from "antd-mobile-rn";

class TopList extends Component {
  state = {
    listData: {}
  };

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchTopList"
    });
  }

  /********************* 事件handler **********************/
  /**
   * 点击单个产品，跳到产品页面
   * 不懂他怎么实现的。。。！
   */
  goodOnPressHandler = (goodId) => {
    console.log(goodId);
    this.props.dispatch({ type: "GoodItem", id: goodId, instance: this })
  }
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
  _onTabChange = (tab, index) => {
    //console.log("tab and index", tab, index);
    this.setState({
      listData: this.props.topList.items[index].g
    });
  };

  /********************* 渲染页面的方法 **********************/
  /**
   * 渲染单个产品
   */
  renderGoods = good => {
    const { item } = good;
    const { isAud } = this.props;
    const { price, price2 } = priceHelper(isAud, item.ap);

    return (
      <ProductBox
        onPress={() => this.goodOnPressHandler(item.id)}
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
      <View>
        <HeaderWithLeftArrow title="销量冠军" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染顶部图片
   */
  renderImage = () => {
    const { image } = this.props.topList;
    return (
      <AnimatedImage
        url={
          "http://cdn2u.com" +
          image +
          `?width=${400}` +
          `&height=${250}` +
          `&bgcolor=white `
        }
        Pheight={120}
        Pwidth={width - 20}
        style={style.defaultStyle}
      />
    );
  };
  /**
   * 渲染Tab
   * tabs标签包裹了flatList，用户切换tabs页，使用setState切换显示的产品，因为后台是把所有页面一起返回的。
   */
  renderTab = () => {
    return (
      <Tabs
        tabs={this.props.topList.tabs ? this.props.topList.tabs : []}
        //page={1}
        //initialPage={0}
        //renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        onChange={(tab, index) => this._onTabChange(tab, index)}
      >
        {this.renderList()}
      </Tabs>
    );
  };

  /**
   * 渲染列表
   */
  renderList = () => {
    // 第一次加载flatList时的数据
    const firstLoadListData = this.props.topList.items[0].g;
    // console.log('renderList中props', this.props);
    // console.log('renderList中state', this.state);
    // console.log('是否第一次加载', Object.keys(this.state.listData).length);
    // console.log('firstLoadListData', firstLoadListData);
    // console.log('firstLoadListData中第0个', firstLoadListData);
    return (
      <FlatList
        data={
          Object.keys(this.state.listData).length === 0
            ? firstLoadListData
            : this.state.listData
        }
        renderItem={this.renderGoods}
        initialNumToRender={16}
        keyExtractor={this._keyExtractor}
        numColumns={2}
      />
    );
  };

  /********************* 页面render方法 **********************/
  render() {
    console.log("销量冠军中props", this.props);

    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderImage()}
        {this.renderTab()}
      </View>
    );
  }
}

// 页面的样式对象
const style = {
  pageStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.topList,
    isAud: applicationState.PriceList.isAud
  };
};

export default connect(mapStateToProps)(TopList);
