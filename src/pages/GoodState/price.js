import React from 'react'
import { JsonCell, TextFormater } from './json-cell'

const GREY = 'rgba(0, 0, 0, 0.45)'

export const Price = ({ p, po, pd, pi, pt, c }) => {
    const Currency = c === 'RMB' ? '¥' : '$'

    const showIfNotNull = (join, src, color) => {
        if (!src) return null
        return TextFormater(join + Currency + src, color)
    }

    return (
        <JsonCell
            left={[
                //报价
                showIfNotNull('总价格：', p, '#fa8c16'),
                showIfNotNull('商品价格：', po, GREY),
                showIfNotNull('快递费：', pd, GREY),
                showIfNotNull('保险：', pi, GREY),
                showIfNotNull('代发税费：', pt, GREY)
            ]}
        />
    )
}
