/**
 * 新的Grid组件
 * 07/18
 */
import React, { Component } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
export class Grid extends Component {
  state = {
    lastPress: 0
  };

  DetectDouble = (e, child, index) => {
    var delta = new Date().getTime() - this.state.lastPress;

    if (delta < 400) {
      return;
    }

    this.setState({
      lastPress: new Date().getTime()
    });

    this.props.onPress(e, child, index);
  };

  renderGridItem() {
    const {
      ContainerWidth,
      wMargin,
      hMargin,
      cols,
      itemHeight,
      borderWidth,
      borderColor
    } = this.props;
    const cellWidth = (ContainerWidth - (cols + 1) * wMargin) / cols;

    const GridItem = React.Children.map(this.props.children, (child, index) => {
      const fixKey = child.key || index;
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={e => this.DetectDouble(e, child, index)}
        >
          <View
            key={fixKey}
            style={{
              width: cellWidth,
              marginLeft: wMargin,
              marginTop: hMargin,
              height: itemHeight,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: borderWidth,
              borderColor: borderColor
            }}
          >
            {React.Children.only(child)}
          </View>
        </TouchableOpacity>
      );
    });
    return GridItem;
  }

  render() {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {this.renderGridItem()}
      </View>
    );
  }
}
