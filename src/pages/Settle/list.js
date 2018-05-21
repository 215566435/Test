import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome' // 4.4.2
import { Arrow } from '../../components/ListItem'

export const Flex = ({ children, direction = 'row', align = 'center', style }) => {
  return <View style={{ ...style, flexDirection: 'row', alignItems: align }}>{children}</View>
}

export const List = ({ children, title, onPress, arrowDirection = 'down' }) => {
  return (
    <View style={{ paddingHorizontal: 15, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={onPress}>
        <Flex style={{ paddingVertical: 12 }}>
          <FontAwesome
            name="archive"
            size={18}
            style={{
              color: 'red',
              backgroundColor: 'transparent'
            }}
          />
          <Text style={{ paddingLeft: 12 }}>{title}</Text>
          <View style={{ paddingLeft: 10 }}>
            <Arrow arrowDirection={arrowDirection} />
          </View>
        </Flex>
      </TouchableOpacity>
      {children}
    </View>
  )
}

export class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.defaultShow
    }
  }
  static defaultProps = {
    defaultShow: true
  }

  hanldeOnPress = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <List title={this.props.title} onPress={this.hanldeOnPress} arrowDirection={this.state.show ? 'up' : 'down'}>
        {this.props.children(this.state.show)}
      </List>
    )
  }
}

export const Li = ({ children, title, border = true, onPress, arrow = false, arrowDirection = 'right', color }) => {
  const borderConfig = border
    ? {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(120,120,120,0.3)'
      }
    : null

  return (
    <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
      <View
        style={{
          ...borderConfig,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Flex>
          <Text>{title}</Text>
          {typeof children === 'string' ? (
            <Text style={{ paddingHorizontal: 15, fontSize: 12, color: color }}>{children}</Text>
          ) : (
            children
          )}
        </Flex>
        {arrow ? <Arrow arrowDirection={arrowDirection} /> : null}
      </View>
    </TouchableOpacity>
  )
}
