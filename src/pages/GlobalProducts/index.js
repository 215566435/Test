/**
 * 全球好物页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image, Platform } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";
import { Grid } from "../../components/Grid";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import { ProductBox } from "../../components/ProductBox";
import { width, height, priceHelper } from "../../util";

class GlobalProducts extends Component {
  // state = {};

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchGlobalProducts"
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
   * 渲染页面头部
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="全球好物" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染澳洲商品
   * 如果List多了的话，就需要用map优化，目前只有AU和NZ直接输出就行
   */
  renderAUList = () => {
    const { au } = this.props.data;
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: "#f46e65",
            backgroundColor: "transparent"
          }}
        >
          🌟{au.n}🌟
        </Text>
        <Grid
          onPress={this.props.onLayoutPress}
          cols={2}
          wMargin={5}
          hMargin={5}
          itemHeight={Platform.OS === "ios" ? 190 : 220}
          borderWidth={0.5}
          borderColor={"rgba(120,120,120,0.3)"}
        >
          {au.g.map(good => {
            const { isAud } = this.props;
            const price = {
              p: isAud ? "$" + good.p.a : "¥" + good.p.r,
              pi: isAud ? "$" + good.p.ai : "¥" + good.p.ri
            };
            return (
              <View style={{ alignItems: "center" }} key={good.id}>
                <Image
                  key={good.i}
                  source={{
                    uri:
                      "http://cdn2u.com" +
                      good.i +
                      "?width=140&height=140&constrain=true&bgcolor=white"
                  }}
                  style={{ height: 120, width: 150 }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 10, backgroundColor: "transparent" }}
                >
                  {good.n}
                </Text>
                <Text
                  style={{
                    color: "#f56a00",
                    backgroundColor: "transparent",
                    fontSize: 12
                  }}
                >
                  {price.p ? price.p : "¥" + good.p.r}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#919191",
                    backgroundColor: "transparent"
                  }}
                >
                  包邮价:{price.pi ? price.pi : "¥" + good.p.ri}
                </Text>
              </View>
            );
          })}
        </Grid>
      </View>
    );
  };

  /**
   * 渲染新西兰商品
   * 如果List多了的话，就需要用map优化，目前只有AU和NZ直接输出就行
   */
  renderNZList = () => {
    return (
      <View>
        <Text>新西兰商品</Text>
      </View>
    );
  };

  render() {
    console.log("全球好物中props", this.props);
    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderAUList()}
        {this.renderNZList()}
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
    ...applicationState.globalProducts
  };
};

export default connect(mapStateToProps)(GlobalProducts);
