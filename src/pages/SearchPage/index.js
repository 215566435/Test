import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'


class Search extends Component {

    componentDidMount() {
        this.props.setHotKey()
    }
    goback = () => {
        console.log(this.props)
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ backgroundColor: "white" }}>
                <Body
                    hotKey={this.props.hotKey}
                    onEndEditing={(text) => this.props.onEndEditing(text)}
                    item={this.props.item}
                    append={this.props.append}
                    clearSearch={this.props.clearSearch}
                    PressItem={(text) => this.props.onEndEditing(text)}
                    GoodItem={(id) => this.props.GoodItem(id, this)}
                    goback={this.goback}
                    autoFocus={this.props.autoFocus}
                    isAud={this.props.isAud}
                    loading={this.props.loading}
                />
            </View>
        )
    }
}

function mapState(state) {
    console.log(state)
    return {
        hotKey: state.SearchPage.hotKey,
        item: state.SearchPage.item,
        autoFocus: state.SearchPage.autoFocus,
        isAud: state.PriceList.isAud,
        loading: state.SearchPage.loading
    }
}

function mapDispatch(dispatch) {
    return {
        setHotKey: () => dispatch({ type: "setHotKey" }),
        onEndEditing: (text) => dispatch({ type: "searchPage", text: text }),
        append: () => dispatch({ type: "searchAppend" }),
        clearSearch: () => dispatch({ type: "clearSearch" }),
        GoodItem: (id, that) => dispatch({ type: 'GoodItem', id: id, instance: that })
    }
}
export default connect(mapState, mapDispatch)(Search)