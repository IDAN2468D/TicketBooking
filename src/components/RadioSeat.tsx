import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from '../components/CustomIcon'

const RadioSeat = (props: any) => {
    return (
        <View key={props.id} className='flex-row-reverse items-center gap-2'>
            <CustomIcon name={props.icon} color={`${props.color}`} />
            <Text className='flex-row-reverse text-center text-White'>{props.name}</Text>
        </View>
    )
}

export default RadioSeat;