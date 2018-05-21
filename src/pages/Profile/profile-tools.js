import React from 'react'
import { View, Text } from 'react-native'

/**
 * 个人工具
 */
export const ToolItem = ({ text, Image, name }) => {
  this.name = name
  return (
    <View style={{ alignItems: 'center' }}>
      {Image}
      <Text style={{ marginTop: 8, backgroundColor: 'transparent' }}>{text}</Text>
    </View>
  )
}
