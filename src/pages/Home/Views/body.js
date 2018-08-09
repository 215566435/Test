import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Switch,
  FlatList
} from "react-native";

import { Carousel } from "../../../components/Carousel";
import { Grid } from "../../../components/Grid";
import { Spin } from "../../../components/Spin";
import { CustomHeader } from "../../../components/PageHeader";
import { EventLayout, GridLayout } from "../../../components/Layout";

import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { header, width, height } from "../../../util";

// TODO：已知问题在Cate里Grid和Event中如果有相同产品，就会有相同的Key，RN就会报错。
export class Body extends Component {
  static defaultProps = {
    Carousel: []
  };

  state = {
    // 声明特色链接模块的数据，这里目前是写死的状态
    featuredLinks: [
      { image: "ios-contact", text: "会员臻选", link: "MemberCollection" },
      { image: "ios-trophy", text: "销量冠军", link: "TopList" },
      { image: "ios-happy", text: "达人分享", link: "ExpertShare" },
      { image: "ios-planet", text: "全球好物", link: "GlobalProducts" },
      { image: "ios-list", text: "产品分类", link: "Category" }
    ]
  };

  onCartPress = () => {
    this.props.navigate("Cart");
  };

  // onCateListPress = (cateId) => {
  //   //this.props.navigate("Category");
  //   console.log('cateId', cateId);
  // }

  // 渲染特色链接组件
  renderFeaturedLinks = () => {
    const { featuredLinks } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10
        }}
      >
        {featuredLinks.map((item, index) => {
          // console.log('featuredLinks', item);
          return (
            <View key={item.image} style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  // console.log("featuredLinks OnPress");
                  this.props.navigate(item.link);
                }}
              >
                <Ionicons
                  name={item.image}
                  size={36}
                  color="#f46e65"
                  style={{ backgroundColor: "transparent" }}
                />
                <Text style={{ fontSize: 10 }}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  // 渲染首页主体（遍历homeItem判断是event还是cate，以不同样式渲染）
  renderHomeItems = () => {
    const { homeItems } = this.props;

    if (!homeItems) {
      return (
        <View style={{ justifyContent: "center" }}>
          <Text>正在加载。。。</Text>
          <spin size={42} />
        </View>
      );
    }

    // 遍历数据生成样式， 返回给调用者
    return homeItems.map((homeItem, index) => {
      // 如果Type是Event按Event样式渲染
      if (homeItem.type == "Event") {
        console.log("这里是Event", homeItem.event);
        return this.renderEvent(homeItem.event, index);
      }

      // 如果Type不是Event，就是cate，按照cate样式渲染
      console.log("这里是cate", homeItem.cate);
      return this.renderGrid(homeItem.cate, index);
    });
  };

  // 渲染单个Event
  renderEvent = event => {
    // 从本页的props中取得isAud
    const { isAud } = this.props;
    return (
      <EventLayout
        data={event}
        isAud={isAud}
        onEventImagePress={this.props.EventImagePress}
        onEventPress={this.props.onEventPress}
      />
    );
  };

  // 渲染首页Cate
  // 后台没返回ID， 只能拿index做key
  // renderGrid = (cate, index) => {
  //   return (
  //     <View key={index} style={{ alignItems: "center", marginTop: 10 }}>
  //       <Text
  //         style={{
  //           fontSize: 20,
  //           color: "#f46e65",
  //           backgroundColor: "transparent"
  //         }}
  //       >
  //         🌟{cate.n}🌟
  //       </Text>
  //       <Grid
  //         onPress={this.props.onLayoutPress}
  //         cols={2}
  //         wMargin={5}
  //         hMargin={5}
  //         itemHeight={Platform.OS === "ios" ? 190 : 220}
  //         borderWidth={0.5}
  //         borderColor={"rgba(120,120,120,0.3)"}
  //       >
  //         {cate.g.map(good => {
  //           const { isAud } = this.props;
  //           const price = {
  //             p: isAud ? "$" + good.ap.p.a : "¥" + good.ap.p.r,
  //             pi: isAud ? "$" + good.ap.p.ai : "¥" + good.ap.p.ri
  //           };
  //           return (
  //             <View style={{ alignItems: "center" }} key={good.id}>
  //               <Image
  //                 key={good.i}
  //                 source={{
  //                   uri:
  //                     "http://cdn2u.com" +
  //                     good.i +
  //                     "?width=140&height=140&constrain=true&bgcolor=white"
  //                 }}
  //                 style={{ height: 120, width: 150 }}
  //                 resizeMode="contain"
  //               />
  //               <Text
  //                 numberOfLines={2}
  //                 style={{ fontSize: 10, backgroundColor: "transparent" }}
  //               >
  //                 {good.n}
  //               </Text>
  //               <Text
  //                 style={{
  //                   color: "#f56a00",
  //                   backgroundColor: "transparent",
  //                   fontSize: 12
  //                 }}
  //               >
  //                 {price.p ? price.p : "¥" + good.ap.p.r}
  //               </Text>
  //               <Text
  //                 style={{
  //                   fontSize: 10,
  //                   color: "#919191",
  //                   backgroundColor: "transparent"
  //                 }}
  //               >
  //                 包邮价:{price.pi ? price.pi : "¥" + good.ap.p.ri}
  //               </Text>
  //             </View>
  //           );
  //         })}
  //       </Grid>
  //     </View>
  //   );
  // };

  renderGrid = cat => {
    console.log("cat中的Props", this.props);
    console.log("cat中的cat", cat);
    const { isAud } = this.props;
    return (
      <GridLayout
        data={cat}
        isAud={isAud}
        onGridPress={this.props.onLayoutPress}
      />
    );
  };

  render() {
    // 调用上面封装的方法，输出页面
    const loaded = () => {
      if (!this.props.homeItems)
        return (
          <View
            style={{
              height: Platform.OS === "ios" ? "80%" : "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spin />
          </View>
        );

      return (
        <ScrollView
          style={{
            height: height - 44 - 45 - 30 - (Platform.OS === "ios" ? 23 : 24)
          }}
        >
          <Carousel>
            {this.props.Carousel.map(item => {
              return (
                <Image
                  key={item.i}
                  source={{ uri: "http://cdn2u.com" + item.i }}
                  style={{ height: 200, width: width }}
                  resizeMode="contain"
                />
              );
            })}
          </Carousel>
          {this.renderFeaturedLinks()}
          {this.renderHomeItems()}
        </ScrollView>
      );
    };
    return (
      <View>
        <CustomHeader
          search={this.props.search}
          onCartPress={this.onCartPress}
          onCateListPress={this.props.cateListPress}
          onValueChange={this.props.onValueChange}
          isShowAud={this.props.isAud}
          cateList={this.props.cateList}
        />
        {loaded()}
      </View>
    );
  }
}
