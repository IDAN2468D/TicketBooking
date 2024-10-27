import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomIcon from '../components/CustomIcon';
import Fontisto from 'react-native-vector-icons/Fontisto';

const TabBarIcon = (props: any) => {
    const isFavoriteIcon = props.icon === 'favorites';
    return (
        <View className={`bg-Black p-space_18 rounded-[180px] ${props.focused ? "bg-Orange" : ""}`}>
            {isFavoriteIcon ? (
                <Fontisto name="favorite" color="white" size={27} />
            ) : (
                <CustomIcon name={props.icon} color="white" size={30} />
            )}
        </View>
    );
}

export default TabBarIcon;