import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const CastData = (props: any) => {
    const classNames = ` 
    ${props.shouldMarginatedAtEnd && props.isFirst ? 'ml-space_24' : ''} 
    ${props.shouldMarginatedAtEnd && props.isFirst && props.isLast ? 'mr-space_24' : ''} 
    ${props.shouldMarginatedAround ? 'mr-7' : ''}
`;

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View className={classNames} style={{ maxWidth: props.cardWidth }}>
                <Image className='aspect-[1920/2880] rounded-[100px]' source={{ uri: props.imagePath }} style={{ width: props.cardWidth }} />
                <Text className='text-White self-stretch font-poppins_medium text-size_12' numberOfLines={1}> {props.title}</Text>
                <Text className='text-White self-stretch font-poppins_medium text-size_10' numberOfLines={1}> {props.subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CastData;