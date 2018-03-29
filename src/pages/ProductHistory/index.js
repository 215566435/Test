import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native'

import { connect } from 'react-redux'
import { Cells } from '../GoodState/Views/Cells'
import { PageWithTab } from '../../HOC/PageWithTab'
import { MarginTopIfNeeded } from '../../util'
import { Spin } from '../../components/Spin'

const { height } = Dimensions.get('window')

class ProductHistory extends Component {
    // componentWillUnmount() {
    //     this.props.clearLog()
    // }

    componentDidMount() {
        this.props.dispatch({ type: 'fetchHistory' })
    }

    renderCells = () => {
        if (!this.props.data) return <Spin />

        return this.props.data.map(item => {
            const time = item.t.split('T')

            return (
                <Cells key={item.i} style={{ backgroundColor: 'white' }}>
                    <Text style={{ backgroundColor: 'transparent' }}>
                        {item.c}
                    </Text>
                    <Text
                        style={{
                            color: '#bfbfbf',
                            backgroundColor: 'transparent'
                        }}
                    >{`${time[0]}   ${time[1].substring(0, 8)}`}</Text>
                </Cells>
            )
        })
    }

    CustomTabBarPress = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        const { Return } = this.props
        return (
            <View style={{ height: '100%' }}>
                <View
                    style={{
                        height: MarginTopIfNeeded(),
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <ScrollView style={{ marginTop: 22 }}>
                        {this.renderCells()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const warpper = PageWithTab(ProductHistory, ['返回'])

const mapState = state => {
    return state.productHistory
}

export default connect(mapState)(warpper)
