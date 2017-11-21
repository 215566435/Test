import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'

class Home extends Component {

    componentDidMount() {
        this.props.fetchHome();
    }
    onLayoutPress = (e, child, index) => {
        console.log(child.key)
        this.props.checkDetail(child.key, this)
    }

    render() {
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