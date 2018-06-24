/**
 * 2017/10/31 方正 创建
 * TextInput组件
 */

 /**
  * input组件使用方法
  * 1.引入组件
  * 2.输入必填属性
  例:
  <Input
  addonBefore="微信号"
  placeholder="请输入您的微信号"
  name="weChat"
  onChangeText={this.onChangeText}
  />
  * 3.onChangeText在父组件中定义
  // 绑定输入数据显示
  onChangeText = (text, name) => {
    if (this[name] !== void 666) {
      this[name] = text;
    } else {
      this[name] = "";
      this[name] = text;
    }
  };
  * 4.调用输入的数据
  * 注意这个数据没有绑定在state里面，直接在this下面。。。
  Account: this.weChat,
  */

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

export class Input extends Component {
  static defaultProps = {
    size: 'default',
    password: false,
    autoFocus: false
  }
  clear() {}

  render() {
    const size = {
      large: 14,
      small: 10,
      default: 12
    }
    const {
      addonBefore,
      onFocus,
      placeholder,
      returnKeyType,
      password,
      onBlur,
      onChangeText,
      multiline,
      numberOfLines,
      autoFocus,
      ...p
    } = this.props
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: 'rgba(120,120,120,0.2)',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {addonBefore ? (
          <Text
            style={{
              backgroundColor: 'transparent',
              width: 80,
              paddingLeft: 14,
              fontSize: 12,
              paddingTop: size[this.props.size],
              paddingBottom: size[this.props.size]
            }}
          >
            {addonBefore}
          </Text>
        ) : null}
        <TextInput
          style={{
            width: '70%',
            paddingLeft: 10,
            paddingTop: size[this.props.size],
            paddingBottom: size[this.props.size],
            fontSize: 12
          }}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={password}
          value={this.props.value}
          onChangeText={text => {
            onChangeText(text, this.props.name)
          }}
          placeholder={placeholder}
          onFocus={onFocus}
          returnKeyType={returnKeyType || 'done'}
          onBlur={onBlur}
          blurOnSubmit={true}
          autoFocus={autoFocus}
          defaultValue={this.props.defaultValue}
          {...p}
        />
      </View>
    )
  }
}

export class InputSelfControl extends Component {
  static defaultProps = {
    size: 'default',
    password: false,
    autoFocus: false
  }
  state = {
    value: ''
  }
  clear() {
    this.setState({
      value: ''
    })
  }
  setText(text) {
    this.setState({
      value: text
    })
  }
  getText() {
    return this.state.value
  }

  render() {
    const size = {
      large: 14,
      small: 10,
      default: 12
    }
    const {
      addonBefore,
      onFocus,
      placeholder,
      returnKeyType,
      password,
      onBlur,
      onChangeText,
      multiline,
      numberOfLines,
      autoFocus
    } = this.props
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: 'rgba(120,120,120,0.2)',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {addonBefore ? (
          <Text
            style={{
              backgroundColor: 'transparent',
              width: 80,
              paddingLeft: 14,
              fontSize: 12,
              paddingTop: size[this.props.size],
              paddingBottom: size[this.props.size]
            }}
          >
            {addonBefore}
          </Text>
        ) : null}
        <TextInput
          style={{
            width: '70%',
            paddingLeft: 10,
            paddingTop: size[this.props.size],
            paddingBottom: size[this.props.size],
            fontSize: 12
          }}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={password}
          value={this.state.value}
          onChangeText={text => {
            onChangeText(text, this.props.name)
          }}
          placeholder={placeholder}
          onFocus={onFocus}
          returnKeyType={returnKeyType || 'done'}
          onBlur={onBlur}
          blurOnSubmit={true}
          autoFocus={autoFocus}
          defaultValue={this.props.defaultValue}
        />
      </View>
    )
  }
}
