/**
 * 达人分享页面
 * 07/18创建
 */

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  Modal,
  ActionSheetIOS,
  ScrollView,
  ImageBackground,
  Clipboard,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Spin } from "../../components/Spin";

// 从Views文件夹拿来头部
import { HeaderWithLeftArrow } from "../../components/PageHeader";
import AnimatedImage from "../../components/AnimatedImage";
import { PageWithTab } from "../../HOC/PageWithTab";
import { CustomTabBar } from "../../components/CustomTabBar";
import { width, height, priceHelper } from "../../util";
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2

class ExpertShareDetail extends Component {
  state = {
    share: false,
    contentImg: []
  };

  /********************* 生命周期函数 **********************/
  componentDidMount() {
    // 页面加载完成，请求API，加载数据
    this.props.dispatch({
      type: "fetchExpertShareDetail",
      payload: {
        expertShareId: this.props.navigation.state.params.expertShareId
      }
    });
  }
  /********************* 事件handler **********************/

  /**
   * 底部Tab的按键handler
   */
  CustomTabBarPress = (e, child, index) => {
    console.log("分享");
    // console.log(this.props.contentImg);
    // const newImage = this.props.contentImg.map(item => {
    //   item.choose = false;
    //   return item;
    // });

    this.setState({
      share: true
      //contentImg: newImage
    });
  };

  /**
   * 进入分享Modal后，分享按钮点击事件Handler
   */
  shareTabPress = (e, child, index) => {
    // if (index === 0) {
    //   this.setState({
    //     share: false
    //   });
    // } else if (index === 1) {
    //   const filtered = this.state.contentImg.filter(item => {
    //     if (item.choose) {
    //       return item;
    //     }
    //   });
    //   const urlMap = filtered.map(item => {
    //     return item.url;
    //   });
    //   console.log(urlMap);
    //   if (urlMap.length === 0) {
    //     Alert.alert(
    //       "分享失败",
    //       "请选择至少一张图片进行分享",
    //       [{ text: "返回", style: "cancel" }],
    //       {
    //         cancelable: false
    //       }
    //     );
    //     return;
    //   }
    //   if (typeof this.props.shareText === "string") {
    //     Clipboard.setString(this.props.shareText);
    //   } else {
    //     Clipboard.setString(this.props.shareText[0]);
    //   }
    //   if (Platform.OS === "ios") {
    //     this.setState({
    //       loading: true
    //     });
    //     ActionSheetIOS.showShareActionSheetWithOptions(
    //       {
    //         url: urlMap
    //       },
    //       () => {
    //         this.setState({
    //           loading: false
    //         });
    //       },
    //       () => {
    //         this.setState({
    //           loading: false
    //         });
    //       }
    //     );
    //   } else {
    //     sharePictures({
    //       winTitle: "窗口标题",
    //       subject: "主题",
    //       imagesUrl: urlMap,
    //       text: "测试一下朋友圈分享",
    //       //component:["com.tencent.mobileqq","com.tencent.mobileqq.activity.JumpActivity"],
    //       component: [
    //         "com.tencent.mm",
    //         "com.tencent.mm.ui.tools.ShareToTimeLineUI",
    //         "com.tencent.mm.ui.tools.ShareImgUI"
    //       ],
    //       callback: error => {
    //         alert("success");
    //       }
    //     });
    //   }
    // }
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
   * 点击底部的分享按钮，才显示的分享modal
   */

  renderShareModal = () => {
    return (
      <Modal
        visible={this.state.share}
        animationType="fade"
        transparent
        onRequestClose={() => {}}
      >
        <View style={style.shareModalContainerStyle}>
          {/* 下面这个TouchableOpacity的功能是，点击Modal空白地方，隐藏Modal */}
          <TouchableOpacity
            transparent
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ share: !this.state.share });
            }}
          />
          <View
            style={{
              height: 80,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{flexDirection: "column", alignItems: "center"}}>
              <Ionicons
                name="ios-chatbubbles"
                size={48}
                color="#f46e65"
                style={{ backgroundColor: "transparent" }}
              />
              <Text>分享到微信</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  /**
   * 渲染头部
   */
  renderHeader = () => {
    return (
      <View>
        <HeaderWithLeftArrow title="达人分享" onPress={this.goBack} />
      </View>
    );
  };

  /**
   * 渲染featuredImage
   */
  renderFeaturedImage = () => {
    const { detailImage } = this.props.expertShareDetail;

    return (
      <View style={style.rowDefaultStyle}>
        <AnimatedImage
          url={
            "http://cdn2u.com" +
            detailImage +
            `?width=${800}` +
            `&height=${500}` +
            `&bgcolor=white `
          }
          Pheight={200}
          Pwidth={width - 20}
          style={style.defaultStyle}
        />
      </View>
    );
  };

  /**
   * 渲染作者
   */
  renderAuthor = () => {
    // const { avatar, author } = this.props.data;
    const { detailAuthor } = this.props.expertShareDetail;
    return (
      <View style={style.rowAuthorStyle}>
        {/* <AnimatedImage
          url={
            "http://cdn2u.com" +
            avatar +
            `?width=${30}` +
            `&height=${30}` +
            `&bgcolor=white `
          }
          Pheight={30}
          Pwidth={30}
          style={style.authorStyle}
        /> */}
        <Text style={style.authorStyle}>{detailAuthor}</Text>
      </View>
    );
  };

  /**
   * 渲染featuredImage
   */
  renderContent = () => {
    const { detailContent } = this.props.expertShareDetail;
    return (
      <View style={style.contentStyle}>
        <Text>{detailContent}</Text>
      </View>
    );
  };

  render() {
    console.log("达人分享详情中props", this.props);
    return (
      <View style={style.pageStyle}>
        {this.renderHeader()}
        {this.renderFeaturedImage()}
        {this.renderAuthor()}
        {this.renderContent()}
        {this.renderShareModal()}
      </View>
    );
  }
}

// 页面的样式对象
const style = {
  pageStyle: {
    height: height - 44,
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
  // renderFeaturedImage的样式
  imageStyle: {},
  // renderAuthorStyle的样式
  rowAuthorStyle: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  authorStyle: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  // renderContent的样式
  contentStyle: {
    marginLeft: 20,
    marginRight: 20
  },

  // renderShareModal的样式
  shareModalContainerStyle: {
    backgroundColor: "rgba(0,0,0,0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "flex-end"
  }
};

const mapStateToProps = applicationState => {
  return {
    ...applicationState.expertShareDetail
  };
};

const wrapper = PageWithTab(ExpertShareDetail, ["分享"], ["#ff7875"]);

export default connect(mapStateToProps)(wrapper);
