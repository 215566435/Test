/**
 * 全球好物页面
 * 07/18创建
 */

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";
import { Grid } from "../../components/Grid";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import AnimatedImage from "../../components/AnimatedImage";
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
   * 直接从首页抄过来的点击产品跳转方法。TODO： 理解，整理
   */
  onGoodPress = (e, child, index) => {
    //this.props.checkDetail(child.key, this)
    //checkDetail: (id, that) => dispatch({ type: 'checkDetail', id: id, instance: that }),
    this.props.dispatch({
      type: "onGoodPress",
      payload: {
        id: child.key,
        instance: this
      }
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
   * 渲染澳洲商品, 已经废弃
   * 如果List多了的话，就需要用map优化，目前只有AU和NZ直接输出就行
   * 后台都是按照List返回的，那就用map把，这个就废弃了
   */
  renderAUList = () => {
    const { au } = this.props.globalProducts;
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
   * 渲染单个List
   */
  renderList = item => {
    console.log("item", item);
    console.log("item.n", item.n);
    // return <Text>{item.n.toString()}</Text>;
    // 这尼玛？ 为毛线返回的数据是对象？？？？还得.toString()才能显示？？？？？？TODO：搞明白返回数据是为什么不对
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: "#f46e65",
            backgroundColor: "transparent"
          }}
        >
          🌟{item.n.toString()}🌟
        </Text>
        <Grid
          onPress={this.onGoodPress}
          cols={2}
          wMargin={5}
          hMargin={5}
          itemHeight={Platform.OS === "ios" ? 190 : 220}
          borderWidth={0.5}
          borderColor={"rgba(120,120,120,0.3)"}
        >
          {item.g.map(good => {
            const { isAud } = this.props;
            const price = {
              p: isAud ? "$" + good.ap.p.a : "¥" + good.ap.p.r,
              pi: isAud ? "$" + good.ap.p.ai : "¥" + good.ap.p.ri
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
                  {good.n.toString()}
                </Text>
                <Text
                  style={{
                    color: "#f56a00",
                    backgroundColor: "transparent",
                    fontSize: 12
                  }}
                >
                  {price.p ? price.p.toString() : "¥" + good.ap.p.r.toString()}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#919191",
                    backgroundColor: "transparent"
                  }}
                >
                  包邮价:{price.pi
                    ? price.pi.toString()
                    : "¥" + good.p.ri.toString()}
                </Text>
              </View>
            );
          })}
        </Grid>
      </View>
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
   * 渲染推荐图片
   */
  renderFeaturedImage = () => {
    const { topImage } = this.props.globalProducts;

    return (
      <View style={style.rowDefaultStyle}>
        <AnimatedImage
          url={
            "http://cdn2u.com" +
            topImage +
            `?width=${700}` +
            `&height=${500}` +
            `&bgcolor=white `
          }
          Pheight={440}
          Pwidth={width}
          style={style.defaultStyle}
        />
      </View>
    );
  };

  /**
   * 渲染页面上的列表
   */
  renderAllLists = () => {
    const { globalProductsList } = this.props.globalProducts;
    // console.log('globalProductsList', globalProductsList);
    return globalProductsList.map((item, index) => {
      return <View key={index}>{this.renderList(item)}</View>;
    });
  };

  render() {
    console.log("全球好物中props", this.props);
    return (
      <ScrollView style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderFeaturedImage()}
        {this.renderAllLists()}
      </ScrollView>
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
