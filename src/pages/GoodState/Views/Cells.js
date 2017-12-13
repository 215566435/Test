import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';


export class Cells extends Component {
    static defaultProps = {
        style: {}
    }

    render() {
        const { txt, style, onPress } = this.props;
        return (
            <TouchableOpacity disabled={onPress ? false : true} style={{ padding: 15, backgroundColor: 'white', marginBottom: 0.5, ...style }} onPress={onPress}>
                {this.props.children}
            </TouchableOpacity >
        )
    }
}

export class NewCell extends Component {
    static defaultProps = {
        TextColors: []
    }

    renderChild = () => {
        const { renderProps, TextColors } = this.props;
        return React.Children.map(renderProps, (prop, index) => {
            if (typeof prop === 'string') {
                return <Text style={{ backgroundColor: "transparent", color: TextColors[index] === void 666 ? 'black' : TextColors[index] }}>{prop}</Text>
            }
            return prop;
        })

    }

    render() {
        const { style, onPress } = this.props;
        return (
            <TouchableOpacity
                disabled={onPress ? false : true}
                style={{ padding: 15, backgroundColor: 'white', marginBottom: 0.5, ...style }}
                onPress={onPress}
            >
                {this.renderChild()}
            </TouchableOpacity >
        )
    }
}