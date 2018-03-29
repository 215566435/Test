import React from 'react'
import { View, Text } from 'react-native'
import { Spin } from './Spin'
import { connect } from 'react-redux'

const Loading = ({ isLoading, message }) => {
    if (!isLoading) return null

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute'
            }}
        >
            <View
                style={{
                    height: 150,
                    width: 150,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.5,
                    borderColor: '#fccca7'
                }}
            >
                <Spin />
                <Text
                    style={{
                        color: '#404040',
                        backgroundColor: 'transparent'
                    }}
                >
                    {message}
                </Text>
            </View>
        </View>
    )
}

const mapState = state => {
    return state.loading
}

export const Loadings = connect(mapState)(Loading)
