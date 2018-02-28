import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'
import { HeaderWithLeftArrow } from '../Manifest';





class Deposite extends Component {

    componentDidMount() {
        this.props.fetchDeposite()

    }
    goBack = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View style={{ backgroundColor: "white" }}>
                <HeaderWithLeftArrow title='预存款记录' onPress={this.goBack} />
                <Body
                    Deposite={this.props.Deposite}
                    appendDeposite={this.props.appendDeposite}
                    clearDeposite={this.props.clearDeposite}
                />
            </View>
        )
    }
}

function mapState(state) {
    return {
        Deposite: state.Deposite.Deposite
    }
}

function mapDispatch(dispatch) {
    return {
        fetchDeposite: () => dispatch({ type: 'fetchDeposite' }),
        appendDeposite: () => dispatch({ type: 'appendDeposite' }),
        clearDeposite: () => dispatch({ type: 'clearDeposite' })
    }
}

export default connect(mapState, mapDispatch)(Deposite)