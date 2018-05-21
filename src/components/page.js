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
