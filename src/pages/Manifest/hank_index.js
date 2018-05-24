import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { TabHead } from "../../components/Tab";
import { Spin } from "../../components/Spin";

import { All } from "./Views/all";
import { PageHeader } from "../../components/PageHeader";
import { width, height } from "../../util";

import { Tabs, WhiteSpace, Badge, Button } from "antd-mobile";
import Row from "./row";

const data = [];
const NUM_ROWS = 20;
let pageIndex = 0;

//创建Tab数组
const tabs = [
  { title: "全部" },
  { title: "待付款" },
  { title: "待发货" },
  { title: "待收货" },
  { title: "已收货" }
];

class ManifestPage extends Component {
  constructor(props) {
    super(props);

    // const dataSource = data

    this.state = {
      isLoading: true
    };
  }
  static defaultProps = {
    orderList: [],
    spin: false
  };

  goBack = () => this.props.navigation.goBack(null);

  handleChange = (item, index) => {
    const { title } = item;

    let type = 0;
    if (title === "全部") {
      type = 0;
    } else if (title === "待付款") {
      type = 1;
    } else if (title === "待发货") {
      type = 2;
    } else if (title === "待收货") {
      type = 3;
    } else if (title === "已收货") {
      type = 4;
    }

    this.props.dispatch({
      type: "fetchOrderList",
      payload: type
    });
  };

  handleOnPress = () => {
    this.props.dispatch({
      type: "increase",
      payload: Date.now()
    });
  };

  componentDidMount() {
    this.props.dispatch({
      type: "fetchOrderList"
    });
  }

  testRender = () => {
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
      <View
        style={{ height: height - 24, backgroundColor: "white", marginTop: 24 }}
      >
        <Tabs
          onChange={this.handleChange}
          tabs={tabs}
          initialPage={0}
          animated={true}
          useOnPan={false}
        >
          {this.testRender()}
        </Tabs>
      </View>
    );
  }
}

const mapState = wholeState => {
  return {
    ...wholeState.manifest
  };
};

export default connect(mapState)(ManifestPage);
