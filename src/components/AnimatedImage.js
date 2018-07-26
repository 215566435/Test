/**
 * 提取的组件，用于图片的image的loading画面
 */
import React, { Component } from "react";
import { View, ImageBackground, Text, Image } from "react-native";
import { Spin } from "./Spin";
import { height, width } from "../util";

export default class AnimatedImage extends Component {
  static defaultProps = {
    resizeMode: null,
    Pheight: 200,
    Pwidth: width
  };

  state = {
    loaded: false
  };

  onLoadStart = () => {
    this.setState({
      loaded: true
    });
  };

  onLoadEnd = () => {
    this.setState({
      loaded: false
    });
  };

  render() {
    const { url, Pheight, Pwidth } = this.props;
    return (
      <View style={style.defaultStyle}>
        <ImageBackground
          style={{ height: Pheight, width: Pwidth, ...style.defaultStyle }}
          source={{
            uri: url,
            headers: {
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36"
            }
          }}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          resizeMode={this.props.resizeMode}
        >
          {this.state.loaded ? <Spin /> : null}
        </ImageBackground>
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
