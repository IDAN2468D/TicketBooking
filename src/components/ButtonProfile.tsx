import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';

const ButtonProfile = (props: any) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View className='flex-row-reverse justify-between items-center'>
                <View className='flex-row-reverse items-start'>
                    <CustomIcon name={props.icon} size={17} className='text-White my-1 ml-2' />
                    <View className='gap-1'>
                        <Text className='text-White text-size_16 '>{props.text}</Text>
                        <Text className='text-White text-size_12'>{props.subtext}</Text>
                        <Text className='text-White text-size_12'>{props.subtext_2}</Text>
                    </View>
                </View>
                <CustomIcon name="arrow-right" className='text-White text-size_20' />
            </View>
            <View>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonProfile;