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

import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { header, width, height } from "../../../util";

export class Body extends Component {
  static defaultProps = {
    Carousel: []
  };

  state = {
    // 声明特色链接模块的数据，这里目前是写死的状态
    featuredLinks: [
      { image: "ios-contact", text: "会员臻选" },
      { image: "ios-trophy", text: "销量冠军" },
      { image: "ios-happy", text: "达人分享" },
      { image: "ios-planet", text: "全球好物" },
      { image: "ios-list", text: "产品分类" }
    ]
  };

  onCartPress = () => {
    this.props.navigate("Cart");
  };

  // 渲染特色链接模块
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
          return (
            <View key={index} style={{ flex: 1, alignItems: "center" }}>
              <Ionicons
                name={item.image}
                size={36}
                color="#f46e65"
                style={{ backgroundColor: "transparent" }}
              />
              <Text style={{ fontSize: 10 }}>{item.text}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  // 渲染促销活动模块
  renderEvent = () => {
    const { event } = this.props;

    return (
      <View>
        {event.map(item => {
          return (
            <View style={{ alignItems: "center", marginTop: 10 }} key={item.i}>
              <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                  color: "#f56a00",
                  backgroundColor: "transparent"
                }}
              >
                🌟{item.n}🌟
              </Text>
              <TouchableOpacity
                onPress={() => this.props.EventImagePress(item.id)}
              >
                <Image
                  source={{
                    uri:
                      "http://cdn2u.com" +
                      item.i +
                      "?width=750&constrain=true&bgcolor=white"
                  }}
                  style={{ height: 200, width: width }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.g.map(itm => {
                  const { isAud } = this.props;
                  const price = {
                    p: isAud ? "$" + itm.ap.p.a : "¥" + itm.ap.p.r,
                    pi: isAud ? "$" + itm.ap.p.ai : "¥" + itm.ap.p.ri
                  };

                  return (
                    <TouchableOpacity
                      key={itm.i}
                      onPress={() => this.props.onEventPress(itm.id)}
                    >
                      <View
                        style={{
                          height: 180,
                          width: 130,
                          padding: 10,
                          borderWidth: 0.5,
                          borderColor: "#f7f7f7"
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              "http://cdn2u.com" +
                              itm.i +
                              "?width=140&height=140&constrain=true&bgcolor=white",
                            header: {
                              Accept:
                                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;",
                              "User-Agent":
                                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36"
                            }
                          }}
                          style={{ height: 110, width: 110 }}
                          resizeMode="contain"
                        />
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 10,
                            backgroundColor: "transparent"
                          }}
                        >
                          {itm.n}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#f56a00",
                            backgroundColor: "transparent"
                          }}
                        >
                          {price.p !== "$null" ? price.p : "¥" + itm.ap.p.r}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#919191",
                            backgroundColor: "transparent"
                          }}
                        >
                          包邮价:{price.pi !== "$null"
                            ? price.pi
                            : "¥" + itm.ap.p.ri}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </View>
    );
  };

  // 渲染首页商品展示模块
  renderLayout = () => {
    return (
      <View>
        {this.props.goodNews.map((itm, index) => {
          return (
            <View key={index} style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#f46e65",
                  backgroundColor: "transparent"
                }}
              >
                🌟{itm.n}🌟
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
                {itm.g.map(item => {
                  const { isAud } = this.props;
                  const price = {
                    p: isAud ? "$" + item.ap.p.a : "¥" + item.ap.p.r,
                    pi: isAud ? "$" + item.ap.p.ai : "¥" + item.ap.p.ri
                  };
                  return (
                    <View style={{ alignItems: "center" }} key={item.id}>
                      <Image
                        key={item.i}
                        source={{
                          uri:
                            "http://cdn2u.com" +
                            item.i +
                            "?width=140&height=140&constrain=true&bgcolor=white"
                        }}
                        style={{ height: 120, width: 150 }}
                        resizeMode="contain"
                      />
                      <Text
                        numberOfLines={2}
                        style={{ fontSize: 10, backgroundColor: "transparent" }}
                      >
                        {item.n}
                      </Text>
                      <Text
                        style={{
                          color: "#f56a00",
                          backgroundColor: "transparent",
                          fontSize: 12,
                        }}
                      >
                        {price.p ? price.p : "¥" + itm.ap.p.r}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#919191",
                          backgroundColor: "transparent"
                        }}
                      >
                        包邮价:{price.pi ? price.pi : "¥" + itm.ap.p.ri}
                      </Text>
                    </View>
                  );
                })}
              </Grid>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    // 调用上面封装的方法，输出页面
    const loaded = () => {
      if (!this.props.goodNews || !this.props.event)
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
          {this.renderEvent()}
          {this.renderLayout()}
          {/* TODO: 把猜你喜欢这个弄上去 */}
          {/* <FlatList
        data={this.props.orderList || []}
        renderItem={Grid}
        keyExtractor={i => {
          return i.i;
        }}
        numColumns = {2}
        pageSize={4}
        onEndReached={this.handleOnEnd}
      /> */}
        </ScrollView>
      );
    };
    return (
      <View>
        <CustomHeader
          search={this.props.search}
          onCartPress={this.onCartPress}
          onValueChange={this.props.onValueChange}
          isShowAud={this.props.isAud}
          cateList={this.props.cateList}
        />
        {loaded()}
      </View>
    );
  }
}
