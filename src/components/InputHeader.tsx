import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native'
import CustomIcon from './CustomIcon';

const InputHeader = (props: any) => {
    const [searchText, setSearchTextText] = useState<string>("");

    return (
        <View className='flex py-space_8 px-space_24 border-[2px] border-WhiteRGBA15 rounded-radius_25 flex-row-reverse'>
            <TextInput
                className='w-[90%] font-poppins_regular text-size_14 text-White'
                value={searchText}
                onChangeText={textInput => setSearchTextText(textInput)}
                placeholder='Search your Movies...'
                placeholderTextColor={"rgba(255,255,255,0.32)"}
            />
            <TouchableOpacity
                className='items-center justify-center p-space_10'
                onPress={() => props.searchFunction(searchText)}
            >
                <CustomIcon name='search' className='text-size_20 text-Orange' />
            </TouchableOpacity>
        </View>
    )
}

export default InputHeader;