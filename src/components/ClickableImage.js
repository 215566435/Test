/**
 */
import React from 'react'
import { View, Image, Dimensions, ImageStore, TouchableOpacity } from 'react-native'


export class ClickableImage extends React.Component {

    render() {
        const { uri, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{
                        width: 60,
                        height: 80,
                        marginLeft: 5
                    }}
                    source={{
                        uri: uri,
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
                        }
                    }}
                />
            </TouchableOpacity>
        )
    }
}
