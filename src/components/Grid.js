/**
 * 2017/10/27 方正 创建
 * Grid组件
 */
import React from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')
export class Grid extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  state = {
    lastPress: 0
  }

  static defaultProps = {
    cols: 3,
    wMargin: 0.5,
    hMargin: 0.5,
    ContainerWidth: width,
    itemHeight: 100,
    borderWidth: null,
    borderColor: 'black'
  }

  DetectDouble = (e, child, index) => {
    var delta = new Date().getTime() - this.state.lastPress

    if (delta < 400) {
      return
    }

    this.setState({
      lastPress: new Date().getTime()
    })

    this.props.onPress(e, child, index)
  }

  renderGridItem() {
    const {
      ContainerWidth,
      wMargin,
      hMargin,
      cols,
      itemHeight,
      borderWidth,
      borderColor
    } = this.props
    const cellWidth = (ContainerWidth - (cols + 1) * wMargin) / cols
    // TODO :这个map还能传两个参数？？？
    const GridItem = React.Children.map(this.props.children, (child, index) => {
      const fixKey = child.key || index
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
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: borderWidth,
              borderColor: borderColor
            }}
          >
            {React.Children.only(child)}
          </View>
        </TouchableOpacity>
      )
    })
    return GridItem
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {this.renderGridItem()}
      </View>
    )
  }
}
