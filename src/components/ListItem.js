import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Platform, FlatList, Text, TouchableOpacity } from 'react-native'
// import { Body } from './Views/body'

export const Arrow = ({ arrowDirection }) => {
  const ad = {
    up: '135deg',
    down: '-45deg',
    right: '225deg'
  }

  return (
    <View
      style={{
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        marginRight: 10,
        height: 10,
        width: 10,
        borderColor: '#bfbfbf',
        transform: [{ rotateZ: ad[arrowDirection] }, { perspective: 1000 }]
      }}
    />
  )
}

export class ListRenderProps extends React.PureComponent {
  state = {
    show: false,
    arrowDirection: 'down'
  }

  onPress = () => {
    const arrowDirection = this.state.arrowDirection === 'down' ? 'up' : 'down'

    this.setState({
      show: !this.state.show,
      arrowDirection: arrowDirection
    })
  }

  render() {
    return (
      <List {...this.props} onPress={this.onPress} arrowDirection={this.state.arrowDirection} style={{ height: 15 }}>
        {this.props.children(this.state.show)}
      </List>
    )
  }
}

export const List = ({ children, title, style, onPress, arrow = false, arrowDirection = 'right' }) => {
  return (
    <View style={{ ...style, padding: 5 }}>
      {typeof title === 'string' ? (
        <TouchableOpacity
          disabled={onPress ? false : true}
          onPress={onPress}
          style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text>{title}</Text>
          {arrow ? <Arrow arrowDirection={arrowDirection} /> : null}
        </TouchableOpacity>
      ) : (
        title
      )}
      {children}
    </View>
  )
}

export class ListItem extends Component {
  static defaultProps = {
    backgroundColor: 'white',
    ArrowColor: '#d9d9d9'
  }

  render() {
    const { title, extra, content, onPress, backgroundColor, ArrowColor } = this.props
    return (
      <TouchableOpacity
        style={{
          marginVertical: 1,
          backgroundColor: backgroundColor,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        disabled={onPress ? false : true}
        onPress={onPress}
      >
        <View style={{ padding: 5 }}>
          {title ? <Text style={{ fontSize: 18 }}>{title}</Text> : null}
          {extra ? <Text>{extra}</Text> : null}
          {content}
        </View>
        <View
          style={{
            borderLeftWidth: 2,
            borderBottomWidth: 2,
            marginRight: 10,
            height: 10,
            width: 10,
            borderColor: ArrowColor,
            transform: [{ rotateZ: '225deg' }, { perspective: 1000 }]
          }}
        />
      </TouchableOpacity>
    )
  }
}

export class LI extends Component {
  static defaultProps = {
    backgroundColor: 'white',
    ArrowColor: '#d9d9d9'
  }

  render() {
    const { title, extra, content, onPress, backgroundColor, ArrowColor, Arrow, style } = this.props
    return (
      <TouchableOpacity
        style={{
          ...style,
          marginVertical: 1,
          backgroundColor: backgroundColor,
          marginBottom: 5
        }}
        disabled={onPress ? false : true}
        onPress={onPress}
      >
        {title ? <Text style={{ color: '#8c8c8c' }}>{title}</Text> : null}
        {this.props.children}
        {Arrow === true ? (
          <View
            style={{
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              marginRight: 10,
              height: 10,
              width: 10,
              borderColor: ArrowColor,
              transform: [{ rotateZ: '225deg' }, { perspective: 1000 }]
            }}
          />
        ) : null}
      </TouchableOpacity>
    )
  }
}

export class ListItemRenderProps extends Component {
  static defaultProps = {
    backgroundColor: 'white',
    ArrowColor: '#d9d9d9'
  }

  render() {
    const { title, extra, content, onPress, backgroundColor, ArrowColor } = this.props
    return (
      <TouchableOpacity
        style={{
          marginVertical: 1,
          backgroundColor: backgroundColor,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        disabled={onPress ? false : true}
        onPress={onPress}
      >
        {this.props.children({
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          marginRight: 10,
          height: 10,
          width: 10,
          borderColor: ArrowColor,
          transform: [{ rotateZ: '225deg' }, { perspective: 1000 }]
        })}
      </TouchableOpacity>
    )
  }
}
