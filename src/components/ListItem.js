import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, FlatList, Text, TouchableOpacity } from 'react-native';
// import { Body } from './Views/body'


export class ListItem extends Component {
    static defaultProps = {
        backgroundColor: 'white',
        ArrowColor: '#d9d9d9'
    }

    render() {
        const { title, extra, content, onPress, backgroundColor, ArrowColor } = this.props;
        return (
            <TouchableOpacity
                style={{ marginVertical: 1, backgroundColor: backgroundColor, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}
                disabled={onPress ? false : true}
                onPress={onPress}
            >
                <View style={{ padding: 5 }}>
                    {title ? <Text style={{ fontSize: 18 }}>{title}</Text> : null}
                    {extra ? <Text>{extra}</Text> : null}
                    {content}
                </View>
                <View
                    style={{
                        borderLeftWidth: 2,
                        borderBottomWidth: 2,
                        marginRight: 10,
                        height: 10,
                        width: 10,
                        borderColor: ArrowColor,
                        transform: [
                            { rotateZ: '225deg' },
                            { perspective: 1000 }
                        ]
                    }}
                />
            </TouchableOpacity>
        )
    }
}

export class ListItemRenderProps extends Component {
    static defaultProps = {
        backgroundColor: 'white',
        ArrowColor: '#d9d9d9'
    }

    render() {
        const { title, extra, content, onPress, backgroundColor, ArrowColor } = this.props;
        return (
            <TouchableOpacity
                style={{ marginVertical: 1, backgroundColor: backgroundColor, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}
                disabled={onPress ? false : true}
                onPress={onPress}
            >
                {this.props.children({
                    borderLeftWidth: 2,
                    borderBottomWidth: 2,
                    marginRight: 10,
                    height: 10,
                    width: 10,
                    borderColor: ArrowColor,
                    transform: [
                        { rotateZ: '225deg' },
                        { perspective: 1000 }
                    ]
                })}
            </TouchableOpacity>
        )
    }
}