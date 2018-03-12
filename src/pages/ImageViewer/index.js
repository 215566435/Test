import React from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { CDN_URL } from '../../NetworkManager/CdnManager'
import { width, height } from '../../util'
import { Carousel } from '../../components/Carousel'

class ImageViewer extends React.Component {
    CustomTabBarPress(e, child, index) {
        if (index === 0) {
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <Image
                    source={{
                        uri: CDN_URL + this.props.attachment[this.props.index]
                    }}
                    resizeMode="contain"
                    style={{
                        width: width,
                        height: height
                    }}
                />
            </View>
        )
    }
}

const wrapper = PageWithTab(ImageViewer, ['返回'])

const mapState = state => {
    return {
        attachment: state.imageviewer.attachment,
        index: state.imageviewer.index
    }
}

export default connect(mapState)(wrapper)
