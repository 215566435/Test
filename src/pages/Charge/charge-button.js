import React from 'react'
import { View } from 'react-native'
import { Button } from '../../components/Button'
import { Eng2Cn } from '../../util'
import { centralization } from '../../style-util'

export class ChargeButton extends React.Component {
  handle = () => {
    this.props.onPress && this.props.onPress()
  }

  render() {
    const { currency, title } = this.props
    return (
      <View style={centralization()}>
        {this.props.children}
        <Button onPress={this.handle} backgroundColor="#1890ff" title={title} />
      </View>
    )
  }
}
