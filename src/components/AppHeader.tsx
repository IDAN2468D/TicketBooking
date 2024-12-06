import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';

const AppHeader = (props: any) => {
    return (
        <View className='flex flex-row-reverse items-center justify-between px-6'>
            {props.showButton && (
                <TouchableOpacity
                    className='h-[34px] w-[34px] p-1 items-center justify-center rounded-full bg-Orange'
                    onPress={props.action}>
                    <CustomIcon name={props.name} className='text-White text-size_24' />
                </TouchableOpacity>
            )}
            <Text className='flex-1 font-poppins_medium text-size_20 text-center text-White'>{props.header}</Text>
        </View>
    )
}

export default AppHeader;
