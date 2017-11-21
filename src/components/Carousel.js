/**
 * 2017/11/02 方正 创建
 * 轮播图组件 
 */
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'

export class Carousel extends Component {
    state = {
        contentOffset: { x: 0, y: 0 },
        startX: 0,
        pageX: 0
    }

    renderChild = () => {
        return (
            React.Children.map(this.props.children, (child, index) => (
                <View
                    key={index}
                >
                    {child}
                </View>
            ))
        )
    }

    render() {
        console.log('carousel渲染')
        return (
            <ScrollView
                ref={el => this.ScrollViewRef = el}
                horizontal
                contentOffset={this.state.contentOffset}
                pagingEnabled
                directionalLockEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "white" }}
            >
                {this.renderChild()}
            </ScrollView>
        )
    }
}