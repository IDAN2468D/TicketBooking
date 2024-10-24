import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from '../components/CustomIcon';

const TabBarIcon = (props: any) => {
    return (
        <View className={`bg-Black p-space_18 rounded-[180px] ${props.focused ? "bg-Orange" : ""}`}>
            <CustomIcon name={props.icon} color="white" size={30} />
        </View>
    )
}

export default TabBarIcon;