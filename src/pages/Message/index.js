import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { PageWithTab } from 'HOC/PageWithTab';
import { FlatListComponent } from 'HOC/FlatListWithSpecs';
import { ListItem } from 'component/ListItem';

import { MessageState } from './constant';



class MessagePage extends FlatListComponent {
    componentDidMount() {
        this.props.dispatch({ type: 'fetchMessage' })
    }
    CustomTabBarPress = (e, child, index) => {
        this.props.navigation.goBack()
        this.props.dispatch({ type: 'updateMessage' })
    }
    onMessagePress = (id, messageId, memberId) => {
        this.props.dispatch({ type: 'MarkAsRead', id: messageId })
        this.props.navigation.navigate('GoodState', { id, messageId, memberId })
    }
    renderItem = ({ item, index }) => {
        const splitTime = item.createTime.split('T');
        const content = (
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{`${splitTime[0]}  ${splitTime[1].substr(0, 8)}`}</Text>
                <Text style={{ color: '#ff4d4f' }}>{item.isRead ? '' : '未读'}</Text>
            </View>
        )

        return <ListItem
            title={item.title}
            extra={MessageState[item.messageType]}
            content={content}
            onPress={() => this.onMessagePress(item.dataId, item.id, item.memberId)}
        />
    }
    keyExtractor = (item) => item.id;
    dataSource = () => this.props.messages;
    onEndReached = () => {
        this.props.dispatch({ type: "appendMessage" })
    }
}

const MsgPageWrapper = PageWithTab(MessagePage, '返回')

const mapState = (state) => {
    return {
        ...state.Message
    }
}

export default connect(mapState, null)(MsgPageWrapper);