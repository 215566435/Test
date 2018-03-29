import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { StyledText, JsonCell, TextFormater } from './json-cell'
import { PackStatusColor, PackStatus } from './model'
import { timeSplit } from '../../util'
import { centralization } from '../../style-util'

export const GoodState = ({ o, i, ps, t, onPress }) => {
    const { date, time } = timeSplit(t)
    return (
        <JsonCell
            style={{ backgroundColor: PackStatusColor[ps], padding: 22 }}
            left={[
                TextFormater(
                    o === 'Paid'
                        ? PackStatus[o]
                        : o === 'Cancelled' ? PackStatus[o] : '待支付'
                ),
                TextFormater(i),
                TextFormater(`${date}  ${time}`)
            ]}
            right={
                o === 'Paid' ? (
                    <View style={centralization()}>
                        <StyledText content="已支付" />
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={onPress}
                        style={centralization({
                            width: 90,
                            height: 55,
                            backgroundColor: '#1890ff',
                            borderRadius: 5,
                            padding: 10
                        })}
                    >
                        <StyledText fontSize="default" content="立即支付" />
                    </TouchableOpacity>
                )
            }
        />
    )
}
