import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { PageWithTab } from 'HOC/PageWithTab';
import { FlatListComponent } from 'HOC/FlatListWithSpecs';
import { ListItem } from 'component/ListItem';
import { SupportTicketType, TicketColor, TicketPriority } from './constant';
import { timeSplit } from 'utils';

class Feedback extends FlatListComponent {
    CustomTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack();
        } else if (index === 1) {
            this.props.navigation.navigate('FeedbackForm');
        }
    }

    dataSource = () => this.props.feedbacks;

    onEndReached = () => {
        this.props.dispatch({ type: 'appendFeedback' })
    }

    keyExtractor = (item, index) => index;
    renderItem = ({ item, index }) => {
        const { date, time } = timeSplit(item.createTime);
        const content = (
            <View>
                <Text style={{ color: "#1890ff", marginBottom: 10 }}>{item.context}</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: "row" }}>
                    <Text style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 10 }}>{`${date}   ${time}`}</Text>
                    <Text style={{ fontSize: 10 }}>{SupportTicketType[item.supportTicketType]}</Text>
                    <Text style={{ color: TicketColor[item.priority], fontSize: 10 }}>{TicketPriority[item.priority]}</Text>
                </View>
            </View>
        )
        return <ListItem
            title={`${item.title}`}
            content={content}
        />
    }

    componentDidMount() {
        this.props.dispatch({ type: 'fetchFeedback' })
    }
}

const wrapper = PageWithTab(Feedback, ['返回', '我要反馈']);

const mapState = (state) => {
    return {
        ...state.Feedback
    }
}

export default connect(mapState)(wrapper);