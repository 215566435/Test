import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { FlatListComponent } from '../../HOC/FlatListWithSpecs'
import { ListItem, ListItemRenderProps } from '../../components/ListItem'
import { SupportTicketType, TicketColor, TicketPriority } from './constant'
import { timeSplit, height, width } from '../../util'
import { Input } from '../../components/Input'
import { TimeLine } from '../../components/TimeLine'
import { CDN_URL } from '../../NetworkManager/CdnManager'
import { ClickableImage } from '../../components/ClickableImage'
import { ModalWrapper } from '../../HOC/ModalWrapper'
import { Carousel } from '../../components/Carousel'

/**
 * 一个方法，用于去除[A8001]xxxx，中的[去除内容]
 */
const removeSeverString = string => {
    const splite = string.split(']')
    if (splite[1]) {
        return splite[1]
    }
    return string
}

class Feedback extends FlatListComponent {
    CustomTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack()
        } else if (index === 1) {
            const id = this.props.navigation.state.params.id
            this.props.navigation.navigate('FeedbackReplyForm', { id: id })
        }
    }
    dataSource = () => this.props.FeedbackReply

    onEndReached = () => {
        const id = this.props.navigation.state.params.id
        this.props.dispatch({ type: 'appendFeedbackReply', id: id })
    }

    keyExtractor = (item, index) => index

    onPress = (url, index) => {
        this.props.navigation.navigate('ImageViewer')
        this.props.dispatch({ type: 'mapFeedbackImage', url, index })
    }

    renderItem = ({ item, index }) => {
        const { date, time } = timeSplit(item.createTime)
        const content = (
            <View>
                <Text
                    style={{
                        color: '#1890ff',
                        marginBottom: 10,
                        marginTop: 10
                    }}
                >
                    {item.context}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {React.Children.map(item.attachment, (attach, idx) => {
                        return (
                            <ClickableImage
                                uri={CDN_URL + attach}
                                onPress={() => {
                                    this.onPress(item.attachment, idx)
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
        return (
            <ListItemRenderProps>
                {arrowProps => (
                    <View style={{ padding: 10 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{ width: width - 160 }}
                            >{`${removeSeverString(item.createdByUser)}`}</Text>
                            <TimeLine
                                date={date}
                                time={time}
                                SupportTicketType={item.supportTicketType}
                                priority={item.priority}
                                style={{ width: 160 }}
                            />
                        </View>
                        {content}
                    </View>
                )}
            </ListItemRenderProps>
        )
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id
        this.props.dispatch({ type: 'fetchReply', id: id })
    }
}

const wrapper = PageWithTab(
    Feedback,
    ['返回', '继续反馈'],
    ['white', '#ff7875']
)

const mapState = state => {
    return {
        ...state.FeedbackReply
    }
}

export default connect(mapState)(wrapper)
