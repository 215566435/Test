/**
 * 2017/10/27 方正 创建
 * Grid组件
 */
import React from 'react'
import { View, Dimensions, TouchableOpacity } from 'react-native'


const { width } = Dimensions.get('window')
export class Grid extends React.Component {
    constructor(props, context) {
        super(props, context)

    }

    static defaultProps = {
        cols: 3,
        wMargin: 0.5,
        hMargin: 0.5,
        ContainerWidth: width,
        itemHeight: 100,
        borderWidth: null,
        borderColor: 'black'
    }

    renderGridItem() {
        const { ContainerWidth, wMargin, hMargin, cols, itemHeight, borderWidth, borderColor } = this.props
        const cellWidth = (ContainerWidth - (cols + 1) * wMargin) / cols

        const GridItem = React.Children.map(this.props.children, (child, index) => {
            const fixKey = child.key || index
            return (
                <TouchableOpacity activeOpacity={0.6} onPress={(e) => this.props.onPress(e, child, index)}>
                    <View
                        key={fixKey}
                        style={{
                            width: cellWidth,
                            marginLeft: wMargin,
                            marginTop: hMargin,
                            height: itemHeight,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: borderWidth,
                            borderColor: borderColor
                        }}
                    >
                        {React.Children.only(child)}
                    </View>
                </TouchableOpacity>
            )
        })
        return GridItem
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.renderGridItem()}
            </View>
        )
    }
}