import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 4.4.2
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export class Icon extends Component {
    static defaultProps = {
        color: "#5a5a5a",
        noteCount: 0
    }
    note = (noteCount) => {
        return (
            <View style={{
                backgroundColor: '#f5222d',
                position: "absolute",
                right: 0,
                top: 0,
                height: 15,
                width: 15,
                borderRadius: 7.5,
                alignItems: 'center',
                justifyContent: "center"
            }}
            >
                <Text style={{ textAlign: 'center', color: "white", fontSize: 8, height: 10, width: 10, }} >{noteCount}</Text>
            </View>
        )
    }
    render() {
        const { name, color, title, note, noteCount } = this.props;
        return (
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                {noteCount > 0 ? this.note(noteCount) : null}
                <Ionicons
                    name={name}
                    size={24}
                    color={color}
                    style={{ backgroundColor: "transparent" }}
                />
                <Text style={{ backgroundColor: "transparent", fontSize: 10, color: color }}>{title}</Text>
            </View>
        )
    }
}
