import React from 'react'
import { WebView, Linking } from 'react-native'

HandleShouldStartLoadWithRequest = e => {
  if (e.url.indexOf('alipay://alipayclient/') >= 0) {
    Linking.openURL(e.url)
    return false
  }
  return true
}

export const PaymenWebView = ({ url }) => {
  return (
    <WebView
      style={{ zIndex: -1, width: 0, height: 0, position: 'absolute' }}
      onShouldStartLoadWithRequest={HandleShouldStartLoadWithRequest}
      source={{ uri: url }}
    />
  )
}
