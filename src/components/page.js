/**
 * Page还封装。。。
 * 不建议使用
 * 没必要，可读性差了
 */
import React from 'react'
import { View } from 'react-native'

export const Page = ({ children, style }) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
        ...style
      }}
    >
      {children}
    </View>
  )
}
