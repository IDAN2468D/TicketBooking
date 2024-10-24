import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonText from './ButtonText';

const PriceTotalButton = (props: any) => {
    return (
        <View className='flex-row justify-between'>
            <ButtonText
                containerTitle={`bg-Orange py-4 px-14 rounded-radius_25 justify-center`}
                title="Buy Tickets"
                titleText={`text-White`}
                onPress={props.onPress}
            />
            <View className='items-end'>
                <Text className='text-WhiteRGBA50 font-poppins_regular'>Total Price</Text>
                <Text className='text-White font-poppins_medium text-size_20'>{props.price.toFixed(2)} $</Text>
            </View>
        </View>
    )
}

export default PriceTotalButton;