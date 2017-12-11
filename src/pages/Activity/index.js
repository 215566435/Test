import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'


const { height } = Dimensions.get('window')

class Activity extends Component {
    state = {
        whichPage: ''
    }

    componentDidMount() {
        this.state.whichPage = this.props.navigation.state.params.page
        this.props.fetchActivity(this.props.navigation.state.params.id)
    }
    componentWillUnmount() {
        this.props.clearActivity()
    }
    render() {
        return (
            <View style={{
                backgroundColor: 'white',
                height: '100%'
            }}>
                <Body
                    {...this.props}
                    title={this.props.title}
                    item={this.props.item}
                    bref={this.props.bref}
                    url={this.props.url}
                    append={this.props.append}
                    onItemPress={(id, navigation) => this.props.onItemPress(id, navigation, this.state.whichPage)}
                />
            </View>
        )
    }
}

const pageStyle = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        height: '100%'
    }
})

function mapState(state) {
    return {
        title: state.Activity.title,
        item: state.Activity.item,
        bref: state.Activity.bref,
        url: state.Activity.url,
        isAud: state.PriceList.isAud,
    }
}

function mapDispatch(dispatch) {
    return {
        fetchActivity: (id) => dispatch({ type: "fetchActivity", id: id }),
        clearActivity: () => dispatch({ type: 'clearActivity' }),
        onItemPress: (id, navigation, page) => dispatch({ type: "onItemPress", id: id, navigation: navigation, page }),
        append: () => dispatch({ type: 'appendActivity' })
    }
}
export default connect(mapState, mapDispatch)(Activity)