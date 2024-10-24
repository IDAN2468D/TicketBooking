import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';

const MovieCard = (props: any) => {
    const classNames = `flex bg-black 
    ${props.shouldMarginatedAtEnd && props.isFirst ? 'ml-9' : ''} 
    ${props.shouldMarginatedAtEnd && !props.isFirst && !props.isLast ? 'mr-9' : ''} 
    ${props.shouldMarginatedAround ? 'm-3' : ''}
`;
    return (
        <TouchableOpacity onPress={props.cardFunction}>
            <View className={classNames} style={{ maxWidth: props.cardWidth }}>
                <Image
                    className={`aspect-[2/3] rounded-radius_20 $`}
                    source={{ uri: props.imagePath }}
                    resizeMode="cover"
                    style={{ width: props.cardWidth }}
                />
                <View>
                    <View className='flex-row-reverse gap-space_10 items-center justify-center mt-space_10'>
                        <CustomIcon name='star' className='text-size_20 text-Yellow' />
                        <Text className='font-poppins_medium text-size_14 text-White'>{props.vote_average} ({props.vote_count})</Text>
                    </View>
                    <Text numberOfLines={1} className="text-white font-poppins_regular text-size_24 text-center py-2">{props.title}</Text>
                    <View className='flex-row-reverse gap-space_20 flex-wrap justify-center'>
                        {props.genre.map((item: any) => (
                            <View className='border-WhiteRGBA50 border-[1px] py-space_4 px-space_10 rounded-radius_20' key={item}>
                                <Text className='font-poppins_regular text-size_10 text-White'>{props.genres[item]}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MovieCard;