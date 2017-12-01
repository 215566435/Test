import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { CustomTabBar } from '../../components/CustomTabBar'


import { Body } from './Views/body'


class Icon extends Component {
    static defaultProps = {
        color: "#5a5a5a"
    }
    render() {
        const { name, color, title } = this.props;
        return (
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <Ionicons
                    name={name}
                    size={24}
                    color={color}
                    style={{ backgroundColor: "transparent" }}
                />
                <Text style={{ backgroundColor: "transparent", fontSize: 12, color: color }}>{title}</Text>
            </View>
        )
    }
}


class Home extends Component {

    componentDidMount() {
        this.props.fetchHome();
    }
    onLayoutPress = (e, child, index) => {
        console.log(child.key)
        this.props.checkDetail(child.key, this)
    }
    navigationTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.navigate('EventPage')
        } else if (index === 1) {
            this.props.navigation.navigate('PriceList')
        } else if (index === 3) {
            this.props.navigation.navigate('Category')
        } else if (index === 4) {
            this.props.navigation.navigate('Profile')
        }
    }

    render() {
        console.log('首页渲染')
        return (
            <View style={{ backgroundColor: "white" }}>
                <Body
                    {...this.props.navigation}
                    Carousel={this.props.Carousel}
                    goodNews={this.props.goodNews}
                    event={this.props.event}
                    onLayoutPress={this.onLayoutPress}
                    onEventPress={(id) => this.props.checkDetail(id, this)}
                    isAud={this.props.isAud}
                    search={() => this.props.search(this)}
                    EventImagePress={(id) => this.props.EventImagePress(id, this)}
                    onValueChange={this.props.onValueChange}
                />
                <CustomTabBar onPress={this.navigationTabBarPress}>
                    <Icon name='md-bonfire' title='最新活动' />
                    <Icon name='ios-paper' title='报价表' />
                    <Icon name='ios-home' title='澳购商城' color='#f46e65' />
                    <Icon name='md-list-box' title='分类' />
                    <Icon name='ios-person' title='个人中心' />
                </CustomTabBar>
            </View>
        )
    }
}

function mapState(state) {
    return {
        Carousel: state.Home.Carousel,
        goodNews: state.Home.goodNews,
        event: state.Home.event,
        isAud: state.PriceList.isAud,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchHome: () => dispatch({ type: "fetchHome" }),
        checkDetail: (id, that) => dispatch({ type: 'checkDetail', id: id, instance: that }),
        search: (that) => dispatch({ type: 'homeSearch', instance: that }),
        EventImagePress: (id, that) => dispatch({ type: 'EventImagePress', id: id, instance: that }),
        onValueChange: () => dispatch({ type: 'AUDonValueChange' })
    }
}
export default connect(mapState, mapDispatch)(Home)