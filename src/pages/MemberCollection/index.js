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
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import { ProductBox } from "../../components/ProductBox";
import { width, height, priceHelper } from "../../util";

class MemberCollection extends Component {
  // state = {};

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchMemberCollection"
    });
  }

  /********************* 事件handler **********************/
  /**
   * 返回主页方法
   */
  goBack = () => {
    this.props.navigation.goBack(null);
  };

  _keyExtractor = child => child.id;

  /********************* 渲染页面的方法 **********************/
  /**
   * 渲染单个产品
   */
  renderGoods = good => {
    console.log("good", good);
    const { item } = good;
    console.log("this.props", this.props);
    console.log("state", this.state);
    const { isAud } = this.props;
    const { price, price2 } = priceHelper(isAud, item.ap);

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
   * 渲染头部组件
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="会员臻选" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染列表组件
   */
  renderList = () => {
    return (
      <FlatList
        data={this.props.memberCollection}
        renderItem={this.renderGoods}
        initialNumToRender={20}
        keyExtractor={this._keyExtractor}
        numColumns={2}
        style={style.renderListStyle}
      />
    );
  };

  render() {
    console.log("会员臻选中props", this.props);
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
    height: height,
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
  renderListStyle: {
    zIndex: -10,
    height: height - 43 - 30,
    width: width,
    backgroundColor: "#f7f7f7"
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.memberCollection,
    // 直接这么取isAud太不规范了吧！
    isAud: applicationState.PriceList.isAud
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return(
//     checkDetail: (id, that) => dispatch({ type: 'checkDetail', id: id, instance: that }),
//   )
// }

export default connect(mapStateToProps)(MemberCollection);
