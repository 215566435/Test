import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Body } from './Views/body'

class Deposite extends Component {
    static navigationOptions = {
        title: '预存款记录',
    }

    componentDidMount() {
        this.props.fetchDeposite()

    }
    render() {
        return (
            <View style={{ backgroundColor: "white" }}>
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