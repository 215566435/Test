import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'

class EventPage extends Component {

    componentDidMount() {
        this.props.fetchEvent()

    }
    render() {
        return (
            <View style={{ backgroundColor: "white" }}>
                <Body
                    event={this.props.event}
                    onAppend={this.props.onAppend}
                    onItemPress={(id) => this.props.itemPress(id, this)}
                    search={() => this.props.search(this)}
                    isAud={this.props.isAud}
                    onActivityPress={(id) => this.props.onActivityPress(id, this)}
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
        fetchEvent: () => dispatch({ type: "fetchEvent" }),
        onAppend: () => dispatch({ type: "AppendEvent" }),
        itemPress: (id, that) => dispatch({ type: 'itemPress', id: id, instance: that }),
        search: (that) => dispatch({ type: 'search', instance: that }),
        onActivityPress: (id, that) => dispatch({ type: 'onActivityPress', id: id, instance: that }),
    }
}
export default connect(mapState, mapDispatch)(EventPage)