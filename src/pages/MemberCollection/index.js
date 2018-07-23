/**
 * 会员臻选页面
 * 07/18创建
 */

import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";

import { PageHeader } from "../../components/PageHeader";
import { width, height } from "../../util";

class MemberCollection extends Component {

  state = {

  };

  componentDidMount() {
    // 页面加载完成，请求API， 加载数据
    this.props.dispatch({
      type: "fetchMemberCollection"
    });
  }

  renderList = () => {
    const row = ({ item, index }) => {
      console.log(item);
      return <Row item={item} onPress={this.handleOnPress} />;
    };

    return (
      <FlatList
        data={this.props.orderList || []}
        renderItem={row}
        keyExtractor={i => {
          return i.i;
        }}
        pageSize={4}
      />
    );
  };

  render() {
    return (
      <View>
        <Text>
          这里是会员甄选
        </Text>
      </View>
    //   <View
    //     style={{ height: height - 24, backgroundColor: "white", marginTop: 24 }}
    //   >
    //     <Tabs
    //       onChange={this.handleChange}
    //       tabs={tabs}
    //       initialPage={0}
    //       animated={true}
    //       useOnPan={false}
    //     >
    //       {this.renderList()}
    //     </Tabs>
    //   </View>
    // );
  }
}

const mapStateToProps = applicationState => {
  return {
    ...applicationState.memberCollection
  };
};

export default connect(mapStateToProps)(MemberCollection);
