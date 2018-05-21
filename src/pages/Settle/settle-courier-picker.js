import React from 'react'
import { connect } from 'react-redux'
import { PageWithTab } from '../../HOC/PageWithTab'
import { Page } from '../../components/page'
import { Li } from './list'
import { Text, View, TouchableOpacity } from 'react-native'
import { centralization } from '../../style-util'
import { height, width } from '../../util'

/**
 * 给进来一个快递数组，选择与id对应的快递
 * @param {array} Courier 快递
 * @param {number} id 选择的快递id
 */
const getCourier = (Courier, id) => {
  for (let i in Courier) {
    if (Courier[i].i === id) {
      return Courier[i]
    }
  }
  return null
}

class SettleCourierPicker extends React.Component {
  CustomTabBarPress(e, child, index) {
    this.props.navigation.goBack(null)
  }

  changeCourier = avalible => {
    this.props.dispatch({
      type: 'changeCourier',
      payload: { packindex: this.props.navigation.state.params.pack.index, courierid: avalible.id }
    })
    this.props.navigation.goBack(null)
  }

  render() {
    const { u, packs } = this.props

    const index = this.props.navigation.state.params.pack.index
    if (packs[index].summary.couriers === void 666) return null

    const couriers = packs[index].summary.couriers

    const avalibles = couriers.filter(courier => {
      if (courier.available) {
        return courier
      }
    })
    const avalible = getCourier(avalibles, u)

    const el =
      avalibles.length !== 0 ? (
        <View style={{ marginTop: 24 }}>
          {avalibles.map((avalible, index) => {
            return (
              <TouchableOpacity onPress={() => this.changeCourier(avalible)} key={index}>
                {<Li>{avalible.name}</Li>}
              </TouchableOpacity>
            )
          })}
        </View>
      ) : (
        <View style={centralization({ height: height, width: width })}>
          <Text style={{ fontSize: 20 }}>暂时只有推荐快递</Text>
        </View>
      )

    return <Page>{el}</Page>
  }
}

const wapprer = PageWithTab(SettleCourierPicker, ['返回'])

const mapState = state => {
  return {
    ...state.settle.data
  }
}
export default connect(mapState)(wapprer)
