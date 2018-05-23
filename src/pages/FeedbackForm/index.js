/**
 * 客户回馈的表单
 */

import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, Picker, CameraRoll, Image } from 'react-native'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { height, width } from '../../util'
import { PickerView } from '../../components/Picker'
import { ModalWrapper } from '../../HOC/ModalWrapper'
import { FlatListComponent } from '../../HOC/FlatListWithSpecs'

class PhotoPicker extends FlatListComponent {
  CustomTabBarPress() {
    this.props.dispatch({ type: 'cancelAttach' })
  }
  dataSource = () => this.props.photos
  keyExtractor = (item, index) => index
  numberOfColumn = () => 4
  renderItem = ({ item }) => {
    return (
      <Image
        style={{
          height: width / this.numberOfColumn(),
          width: width / this.numberOfColumn()
        }}
        source={{ uri: item.node.image.uri }}
      />
    )
  }
}
const tabWrapper = PageWithTab(PhotoPicker, '返回')
const PhotoPickerWrapper = ModalWrapper(tabWrapper)

class FeedbackForm extends Component {
  CustomTabBarPress = (e, child, index) => {
    if (index === 0) {
      this.props.navigation.goBack()
    } else if (index === 1) {
      this.props.dispatch({
        type: 'submitFeedback',
        ...this.changeText,
        FeedbackFormInstance: this
      })
    }
  }
  onChangeText = (text, name) => {
    if (this.changeText[name]) {
      this.changeText[name] = text
    } else {
      this.changeText[name] = ''
      this.changeText[name] = text
    }
  }
  onValueChange = (value, index) => {
    if (this.changeText.priority) {
      this.changeText.priority = value
    } else {
      this.changeText.priority = ''
      this.changeText.priority = value
    }
  }
  componentDidMount() {
    this.changeText = {}
  }
  addAttachment = () => {
    this.props.dispatch({ type: 'addAttachment' })
  }

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <ScrollView style={{ marginTop: 24 }}>
          <Input size="large" name="title" addonBefore="标题" onChangeText={this.onChangeText} autoFocus={true} />
          <PickerView addonBefore={'优先级'} value={'低'} onValueChange={this.onValueChange}>
            <Picker.Item label="低" value="低" />
            <Picker.Item label="普通" value="普通" />
            <Picker.Item label="高" value="高" />
          </PickerView>
          <Input
            size="large"
            name="content"
            addonBefore="反馈内容"
            multiline={true}
            numberOfLines={4}
            onChangeText={this.onChangeText}
          />
          <Button style={{ backgroundColor: '#1890ff' }} title={'添加附件'} onPress={this.addAttachment} />
          <PhotoPickerWrapper visible={this.props.isAddAttach} {...this.props} />
        </ScrollView>
      </View>
    )
  }
}

const wrapper = PageWithTab(FeedbackForm, ['返回', '提交反馈'], ['white', '#ff7875'])

const mapState = state => {
  return {
    ...state.feedbackform
  }
}

export default connect(mapState)(wrapper)
