import React from 'react';
import { View, Modal, ScrollView, Dimensions, Text } from 'react-native';
import { CustomTabBar } from '../../../components/CustomTabBar';


const { height, width } = Dimensions.get('window')
export class SharePage extends React.Component {
    static defaultProps = {
        contentImg: []
    }

    render() {
        return (
            <Modal
                visible={this.props.share}
                animationType="slide"
            >
                <ScrollView style={{ height: height - 44 }}>
                    <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                        {this.props.contentImg.map((item) => {
                            return (
                                <TouchableOpacity>
                                    <Image
                                        key={item.url}
                                        source={{ uri: item.url }}
                                        style={{
                                            height: 150,
                                            width: width / 3
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <CustomTabBar >
                    <Text style={{ backgroundColor: "transparent" }}>返回</Text>
                    <Text style={{ color: 'white', backgroundColor: "transparent" }}>分享</Text>
                </CustomTabBar>
            </Modal>
        )
    }
}