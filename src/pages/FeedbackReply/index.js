import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { PageWithTab } from 'HOC/PageWithTab';
import { FlatListComponent } from 'HOC/FlatListWithSpecs';
import { ListItem } from 'component/ListItem';
import { SupportTicketType, TicketColor, TicketPriority } from './constant';
import { timeSplit, height, width } from 'utils';
import { Input } from 'component/Input';
import { TimeLine } from 'component/TimeLine';
import { CDN_URL } from '../../NetworkManager/CdnManager';
import { ClickableImage } from 'component/ClickableImage';
import { ModalWrapper } from 'HOC/ModalWrapper';
import { Carousel } from 'component/Carousel';

/**
 * 一个方法，用于去除[A8001]xxxx，中的[去除内容]
 */
const removeSeverString = (string) => {
    const splite = string.split(']');
    if (splite[1]) {
        return splite[1];
    }
    return string;
}

class Feedback extends FlatListComponent {
    CustomTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack();
        } else if (index === 1) {
            const id = this.props.navigation.state.params.id;
            this.props.navigation.navigate('FeedbackReplyForm', { id: id });
        }
    }
    dataSource = () => this.props.FeedbackReply;

    onEndReached = () => {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch({ type: 'appendFeedbackReply', id: id })
    }

    keyExtractor = (item, index) => index;

    onPress = (url, index) => {
        this.props.navigation.navigate('ImageViewer');
        this.props.dispatch({ type: 'mapFeedbackImage', url, index })
    }

    renderItem = ({ item, index }) => {
        const { date, time } = timeSplit(item.createTime);
        const content = (
            <View>
                <Text style={{ color: "#1890ff", marginBottom: 10 }}>{item.context}</Text>
                <TimeLine
                    date={date}
                    time={time}
                    SupportTicketType={item.supportTicketType}
                    priority={item.priority}
                />
                <View style={{ flexDirection: 'row' }}>
                    {React.Children.map(item.attachment, (attach, idx) => {
                        return <ClickableImage uri={CDN_URL + attach} onPress={() => { this.onPress(item.attachment, idx) }} />
                    })}
                </View>
            </View>
        )
        return <ListItem
            title={`回复人：${removeSeverString(item.createdByUser)}`}
            content={content}
            backgroundColor={item.tragetGroup === "CustomerService" ? '#fff7e6' : 'white'}
            ArrowColor={'transparent'}
        />
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch({ type: 'fetchReply', id: id })
    }
}

const wrapper = PageWithTab(Feedback, ['返回', '继续反馈'], ['white', '#ff7875']);

const mapState = (state) => {
    return {
        ...state.FeedbackReply
    }
}

export default connect(mapState)(wrapper);