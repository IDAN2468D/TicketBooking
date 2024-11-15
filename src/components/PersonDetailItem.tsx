import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, StatusBar } from 'react-native';

interface PersonDetailItemProps {
    profilePath: string;
    name: string;
    biography: string;
    birthday: string;
    placeOfBirth: string;
    knownForDepartment: string;
    isExpanded: boolean;
    toggleBiography: () => void;
}

const PersonDetailItem = (props: PersonDetailItemProps) => {
    return (
        <View className="bg-gray-400 rounded-lg p-4 mt-5 shadow-md">
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"} />

            <View className="items-center mb-8">
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${props.profilePath}` }}
                    style={{ width: 200, height: 300, borderRadius: 20 }}
                    resizeMode="cover"
                />
                <Text className="text-2xl font-bold text-gray-800 text-center mb-2 mt-2">{props.name}</Text>

                <TouchableOpacity activeOpacity={1} onPress={props.toggleBiography}>
                    <Text
                        numberOfLines={props.isExpanded ? undefined : 5}
                        className="text-sm text-gray-700 text-center"
                    >
                        {props.biography}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-600 mb-3">Birthday: {props.birthday}</Text>
            <Text className="text-sm text-gray-600 mb-3">Place of Birth: {props.placeOfBirth}</Text>
            <Text className="text-sm text-gray-600 mb-3">Known for: {props.knownForDepartment}</Text>
        </View>
    );
};

export default PersonDetailItem;
