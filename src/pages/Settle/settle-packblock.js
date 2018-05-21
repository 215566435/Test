import React from 'react'
import { View, Image, Alert, Text } from 'react-native'
import { Flex, Li } from './list'

export class PacksBlock extends React.Component {
  state = {
    show: false
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  renderFirst = () => {
    const { pack } = this.props
    const itm = pack.items[0]

    return (
      <Text style={{ width: '85%', fontSize: 12 }}>
        {itm.name} x{itm.qty}
        {pack.items.length > 1 ? <Text style={{ color: '#ff7875' }}> 等...</Text> : null}
      </Text>
    )
  }

  handleItemChange = item => {
    Alert.alert(
      '更换配货方式',
      `您可以更换本包裹的配货方式`,
      [
        {
          text: '移动包裹到另一个地址簿中的地址',
          onPress: () => {
            this.props.MovePack && this.props.MovePack()
          }
        },
        {
          text: '移动包裹到一个新增地址',
          onPress: () => {
            this.props.MovePack && this.props.createPack()
          }
        },
        {
          text: this.props.isSelfPickup ? '仓库代发' : '包裹自提',
          onPress: () => {
            this.props.dispatch({
              type: 'SetPackPickingMethod',
              payload: {
                index: item.index,
                isPickup: this.props.isSelfPickup
              }
            })
          }
        },
        { text: '取消' }
      ],
      { cancelable: false }
    )
  }

  renderItems = () => {
    const { pack } = this.props
    return this.state.show
      ? pack.items.map((itm, n) => {
          return (
            <Li key={itm.id} onPress={() => this.handleItemChange(itm)} arrow={true}>
              <Image
                key={itm.id}
                source={{ uri: 'http://cdn2u.com' + itm.image }}
                style={{ height: 30, width: 30, paddingLeft: 10 }}
              />
              <Text style={{ width: '85%', paddingLeft: 10, fontSize: 12 }}>
                {itm.name} <Text style={{ color: '#ff7875' }}>x{itm.qty}</Text>
              </Text>
            </Li>
          )
        })
      : null
  }

  render() {
    const { pack, isSelfPickup = false } = this.props

    return (
      <View style={{ padding: 10, backgroundColor: '#f5f5f5', marginBottom: 3 }}>
        <Li
          title={pack.innerName}
          arrow={true}
          arrowDirection={this.state.show ? 'up' : 'down'}
          onPress={this.handleShow}
        >
          {this.state.show ? null : <Flex style={{ paddingLeft: 10 }}>{this.renderFirst()}</Flex>}
        </Li>
        {this.renderItems()}
        {isSelfPickup ? null : this.state.show ? (
          <Li title="快递" border={false} arrow={true} onPress={this.props.onChangeCourier}>
            {pack.currentCourier.showName}
          </Li>
        ) : null}
      </View>
    )
  }
}
