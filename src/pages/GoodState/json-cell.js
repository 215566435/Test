import React from 'react'
import { Text, View } from 'react-native'
import { Cells } from './Views/Cells'

export const TextFormater = (text, color) => {
    return {
        text,
        color
    }
}

export const StyledText = ({
    fontSize = 'default',
    content,
    color = 'white'
}) => {
    const _fontSize = {
        large: 18,
        default: 15,
        small: 12
    }
    return (
        <Text
            style={{
                fontSize: _fontSize[fontSize],
                color: color,
                backgroundColor: 'transparent'
            }}
        >
            {content}
        </Text>
    )
}

export const JsonCell = ({ left = [], right = [], style = {} }) => {
    return (
        <Cells
            style={{
                padding: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...style
            }}
        >
            <View>
                {left.map((item, index) => {
                    if (!item) return null
                    const { text, color } = item
                    return (
                        <StyledText key={index} content={text} color={color} />
                    )
                })}
            </View>
            <View>
                {right instanceof Array
                    ? right.map(({ text, color }, index) => {
                          return (
                              <StyledText
                                  key={index}
                                  content={text}
                                  color={color}
                              />
                          )
                      })
                    : right}
            </View>
        </Cells>
    )
}
