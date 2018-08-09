/**
 * 组件：Layout
 * 时间：08/18
 * 把常用的页面布局块，提取出来
 */

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
import AnimatedImage from "./AnimatedImage";
import { Grid } from "./Grid";
// 这个Grid没有用ProductBox，FlatList渲染时候需要用
import { ProductBox } from "./ProductBox";
import { width, height, priceHelper } from "../util";

/**
 * 类似首页EventLayout
 * 上面是大图，下面是横向的产品ScrollView
 *
 * 传入数据是单个Event，后台调用了好像叫ToAppAPI转过格式的数据结构
 */

// 用法
{
  /* <EventLayout
  data={event}
  isAud={isAud}
  onEventImagePress={this.props.EventImagePress}
  onEventPress={this.props.onEventPress}
/>; */
}
export const EventLayout = props => {
  const { onEventImagePress, onEventPress, isAud } = props;
  const { id, name, image, goods } = props.data;

  return (
    <View style={{ ...style.defaultStyle, marginTop: 10 }} key={image}>
      <Text style={style.eventTitleStyle}>🌟{name}🌟</Text>
      {/* <TouchableOpacity onPress={() => this.props.EventImagePress(event.id)}> */}
      <TouchableOpacity onPress={() => onEventImagePress(id)}>
        <AnimatedImage
          url={
            "http://cdn2u.com" +
            image +
            `?width=${400}` +
            `&height=${250}` +
            `&bgcolor=white `
          }
          Pheight={200}
          Pwidth={width}
          style={style.defaultStyle}
        />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {goods.map(good => {
          const price = {
            p: isAud ? "$" + good.ap.p.a : "¥" + good.ap.p.r,
            pi: isAud ? "$" + good.ap.p.ai : "¥" + good.ap.p.ri
          };

          return (
            <TouchableOpacity
              key={good.id}
              onPress={() => onEventPress(good.id)}
            >
              <View style={style.eventScrollViewImageStyle}>
                <AnimatedImage
                  url={
                    "http://cdn2u.com" +
                    good.i +
                    `?width=${140}` +
                    `&height=${140}` +
                    `&bgcolor=white `
                  }
                  Pheight={110}
                  Pwidth={110}
                  resizeMode="contain"
                  style={style.defaultStyle}
                />
                <Text numberOfLines={2} style={style.eventScrollViewNameStyle}>
                  {good.n}
                </Text>
                <Text style={style.eventScrollViewPStyle}>
                  {price.p !== "$null" ? price.p : "¥" + good.ap.p.r}
                </Text>
                <Text style={style.eventScrollViewPIStyle}>
                  包邮价:{price.pi !== "$null" ? price.pi : "¥" + good.ap.p.ri}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// 页面的样式对象
const style = {
  pageStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  // EventLayOut的样式
  eventTitleStyle: {
    fontSize: 20,
    padding: 10,
    color: "#f56a00",
    backgroundColor: "transparent"
  },
  eventScrollViewImageStyle: {
    height: 180,
    width: 130,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#f7f7f7"
  },
  eventScrollViewNameStyle: {
    fontSize: 10,
    backgroundColor: "transparent"
  },
  eventScrollViewPStyle: {
    fontSize: 12,
    color: "#f56a00",
    backgroundColor: "transparent"
  },
  eventScrollViewPIStyle: {
    fontSize: 10,
    color: "#919191",
    backgroundColor: "transparent"
  },
  // GridLayout样式
  gridTitleStyle: {
    fontSize: 20,
    padding: 10,
    color: "#f56a00",
    backgroundColor: "transparent"
  },
  gridScrollViewImageStyle: {
    alignItems: "center"
  },
  gridScrollViewNameStyle: {
    fontSize: 10,
    backgroundColor: "transparent"
  },
  gridScrollViewPStyle: {
    color: "#f56a00",
    backgroundColor: "transparent",
    fontSize: 12
  },
  gridScrollViewPIStyle: {
    fontSize: 10,
    color: "#919191",
    backgroundColor: "transparent"
  }
};

/**
 * 类似首页的GridLayout
 * 上面是标题，下面是产品列表
 */
export const GridLayout = props => {
  const { data, isAud, onGridPress } = props;
  console.log("GridLayout", data);
  return (
    <View key={data.n} style={{ ...style.defaultStyle, marginTop: 10 }}>
      <Text style={style.gridTitleStyle}>🌟{data.n}🌟</Text>
      <Grid
        onPress={onGridPress}
        cols={2}
        wMargin={5}
        hMargin={5}
        itemHeight={Platform.OS === "ios" ? 190 : 220}
        borderWidth={0.5}
        borderColor={"rgba(120,120,120,0.3)"}
      >
        {data.g.map(good => {
          console.log("id", good.id);
          const price = {
            p: isAud ? "$" + good.ap.p.a : "¥" + good.ap.p.r,
            pi: isAud ? "$" + good.ap.p.ai : "¥" + good.ap.p.ri
          };
          return (
            <View style={style.gridScrollViewImageStyle} key={good.id}>
              <AnimatedImage
                key={good.i}
                url={
                  "http://cdn2u.com" +
                  good.i +
                  `?width=${140}` +
                  `&height=${140}` +
                  `&bgcolor=white `
                }
                Pheight={120}
                Pwidth={150}
                resizeMode="contain"
                style={style.defaultStyle}
              />
              <Text numberOfLines={2} style={style.gridScrollViewNameStyle}>
                {good.n}
              </Text>
              <Text style={style.gridScrollViewPStyle}>
                {price.p ? price.p : "¥" + good.ap.p.r}
              </Text>
              <Text style={style.gridScrollViewPIStyle}>
                包邮价:{price.pi ? price.pi : "¥" + good.ap.p.ri}
              </Text>
            </View>
          );
        })}
      </Grid>
    </View>
  );
};
