import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const SubMovieCard = (props: any) => {
    const classNames = `flex bg-black 
    ${props.shouldMarginatedAtEnd && props.isFirst ? 'ml-9' : ''} 
    ${props.shouldMarginatedAtEnd && !props.isFirst && props.isList ? '' : 'mr-9'} 
    ${props.shouldMarginatedAround ? 'm-3' : ''}
`
    return (
        <TouchableOpacity onPress={props.cardFunction}>
            <View className={classNames} style={{ maxWidth: props.cardWidth }}>
                <Image
                    className="aspect-[2/3] rounded-radius_20"
                    source={{ uri: props.imagePath }}
                    resizeMode="cover"
                    style={{ width: props.cardWidth }}
                />
                <Text numberOfLines={1} className="text-white font-poppins_regular text-base text-center py-2">{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SubMovieCard;