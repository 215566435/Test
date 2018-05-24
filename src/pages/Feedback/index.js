/**
 * 客户反馈的页面
 * 建议使用 dva 模式进行封装
 */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { FlatListComponent } from '../../HOC/FlatListWithSpecs'
import { ListItem, ListItemRenderProps } from '../../components/ListItem'
import { TimeLine } from '../../components/TimeLine'
import { timeSplit, width } from '../../util'

class Feedback extends FlatListComponent {
  CustomTabBarPress = (e, child, index) => {
    if (index === 0) {
      this.props.navigation.goBack()
    } else if (index === 1) {
      this.props.navigation.navigate('FeedbackForm')
    }
  }
  dataSource = () => this.props.feedbacks

  onEndReached = () => {
    this.props.dispatch({ type: 'appendFeedback' })
  }
  keyExtractor = (item, index) => index

  onItemPress = item => {
    this.props.navigation.navigate('FeedbackReply', { id: item.id })
  }
  renderItem = ({ item, index }) => {
    const { date, time } = timeSplit(item.createTime)
    const lastReplyTime = timeSplit(item.lastReplyTime)
    const content = (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: width - 180 }}>
          <Text>{item.title}</Text>
          <Text style={{ color: '#1890ff', marginBottom: 10 }}>{item.context}</Text>
        </View>
        <View style={{ width: 150 }}>
          <TimeLine date={date} time={time} SupportTicketType={item.supportTicketType} priority={item.priority} />
          <Text style={{ color: '#fa8c16', fontSize: 10, marginTop: 2 }}>
            {`${lastReplyTime.date === '无' ? '' : '上次回复时间：' + lastReplyTime.date}      ${lastReplyTime.time}`}
          </Text>
        </View>
      </View>
    )
    return (
      <ListItemRenderProps title={`${item.title}`} content={content} onPress={() => this.onItemPress(item)}>
        {arrProps => {
          return (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10
              }}
            >
              {content}
              <View style={{ ...arrProps }} />
            </View>
          )
        }}
      </ListItemRenderProps>
    )
  }

  componentDidMount() {
    this.props.dispatch({ type: 'fetchFeedback' })
  }
}

const wrapper = PageWithTab(Feedback, ['返回', '我要反馈'], ['white', '#ff7875'])

const mapState = state => {
  return {
    ...state.Feedback
  }
}

export default connect(mapState)(wrapper)
