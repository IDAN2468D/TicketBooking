import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const ButtonText = (props: any) => {
    return (
        <TouchableOpacity activeOpacity={0.6} className={`${props.containerTitle}`} onPress={props.onPress}>
            <Text className={`${props.titleText}`}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonText;