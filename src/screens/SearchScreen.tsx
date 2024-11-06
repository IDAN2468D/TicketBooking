import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useSearch from '../hooks/useSearch'
import { InputHeader, SubMovieCard } from '../components';
import { baseImagePath } from '../api/apicalls';

const SearchScreen = ({ navigation }: any) => {
    const { width, height } = Dimensions.get("screen");
    const [searchList, searchMoviesFunction] = useSearch();

    return (
        <View className={`flex-1 items-center bg-Black ${width}`}>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <View>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsHorizontalScrollIndicator={false} >
                    <View className='mx-space_36 mt-10 mb-2'>
                        <InputHeader searchFunction={searchMoviesFunction} />
                    </View>
                    {searchList.map((item: any) => {
                        return (
                            <View key={item.id}>
                                <SubMovieCard
                                    shouldMarginatedAtEnd={false}
                                    shouldMarginatedAround={true}
                                    cardFunction={() => {
                                        navigation.push("MovieDetails", { movieid: item.id });
                                    }}
                                    cardWidth={width - 65}
                                    title={item.original_title}
                                    imagePath={baseImagePath("w342", item.poster_path)}
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

export default SearchScreen;