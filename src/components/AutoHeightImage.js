/**
 * 2017/11/06 方正 创建
 * 自动获取自己高度的图片组件
 */
import React from 'react'
import { View, Image, Dimensions, ImageStore } from 'react-native'
import { Spin } from './Spin'

const { height, width } = Dimensions.get('window')
export class AutoHeightImage extends React.Component {
    state = {
        height: 300,
        spin: true
    }
    componentWillMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.uri !== this.props.uri ||
            nextProps.index !== this.props.index ||
            nextState.spin !== this.state.spin ||
            nextState.height !== this.state.height
    }
    onLayout = (e) => {
        Image.getSize(this.props.uri, (w, h) => {
            if (!this._isMounted) return
            this.setState({
                height: width * h / w
            })
        }, (err) => {
            console.log(err)
        })
    }
    Spin = () => {
        if (!this._isMounted) return
        this.setState({
            spin: false
        })
        // ImageStore.removeImageForTag(this.props.uri);
        // console.log('清理', this.props.uri);
    }

    render() {
        const { uri, index } = this.props;
        return (
            <View key={index} style={{ alignItems: 'center' }}>
                {this.state.spin ? <Spin /> : null}
                <Image
                    onLoadEnd={this.Spin}
                    resizeMode='contain'
                    onLayout={this.onLayout}
                    style={{
                        flex: 1,
                        width: width,
                        height: this.state.height
                    }}
                    source={{
                        uri: uri,
                        headers: {
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
                        }
                    }}
                />
            </View>
        )
    }
}
