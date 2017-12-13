import React from 'react';
import { View, Text } from 'react-native';

export const TimeLine = ({ date, time, SupportTicketType, priority }) => {
    const SupportTicketTypeMap = {
        Default: "普通咨询",
        Order: "订单咨询",
        Pack: "包裹咨询",
        PackOutStock: "包裹缺货",
        WebSiteComment: "网站留言"
    }
    const TicketColor = {
        Low: 'rgba(0, 0, 0, 0.45)',
        Default: '#40a9ff',
        High: '#f5222d'
    }
    const TicketPriority = {
        Low: '低',
        Default: '中',
        High: '高'
    }
    return (
        <View style={{ justifyContent: 'space-between', flexDirection: "row" }}>
            <Text style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 10 }}>{`${date}   ${time}`}</Text>
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{SupportTicketTypeMap[SupportTicketType]}</Text>
            <Text style={{ color: TicketColor[priority], fontSize: 10, marginLeft: 10 }}>{TicketPriority[priority]}</Text>
        </View>
    )
}