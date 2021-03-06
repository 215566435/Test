/**
 * 方正
 * 在 home 首页，会做一些 coming event 的活动
 * 这个页面就是那些图点击后的页面
 * 老代码，使用 dva 进行重构
 */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { Body } from './Views/body'
import { CustomTabBar } from '../../components/CustomTabBar'
import { PageWithTab } from '../../HOC/PageWithTab'

class EventPage extends Component {
  componentDidMount() {
    this.props.fetchEvent()
  }
  componentWillUnmount() {
    this.props.clearEventPage()
  }
  CustomTabBarPress = () => {
    this.props.navigation.goBack(null)
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Body
          {...this.props.navigation}
          event={this.props.event}
          onAppend={this.props.onAppend}
          onItemPress={id => this.props.itemPress(id, this)}
          search={() => this.props.search(this)}
          isAud={this.props.isAud}
          onActivityPress={id => this.props.onActivityPress(id, this)}
          EventOnValueChange={this.props.EventOnValueChange}
        />
      </View>
    )
  }
}

function mapState(state) {
  return {
    event: state.EventPage.event,
    isAud: state.PriceList.isAud
  }
}

function mapDispatch(dispatch) {
  return {
    fetchEvent: () => dispatch({ type: 'fetchEvent' }),
    onAppend: () => dispatch({ type: 'AppendEvent' }),
    itemPress: (id, that) => dispatch({ type: 'itemPress', id: id, instance: that }),
    search: that => dispatch({ type: 'search', instance: that }),
    onActivityPress: (id, that) => dispatch({ type: 'onActivityPress', id: id, instance: that }),
    EventOnValueChange: () => dispatch({ type: 'EventOnValueChange' }),
    clearEventPage: () => dispatch({ type: 'clearEventPage' })
  }
}

const wrapper = PageWithTab(EventPage, '返回')

export default connect(mapState, mapDispatch)(wrapper)
