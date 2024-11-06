import React, { useState } from 'react';
import { View, Dimensions, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import useMoviesData from '../hooks/useMovies';
import { CategoryHeader, InputHeader, MovieCard, SubMovieCard } from '../components';

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }: any) => {
    const {
        baseImagePath,
        nowPlayingMoviesList,
        searchMoviesFunction,
        popularMoviesList,
        upcomingMoviesList,
        loading,
        genres
    } = useMoviesData(navigation);
    return (
        <ScrollView bounces={false} className='bg-Black'>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <View className='flex-1 mx-space_36 mt-10'>
                <InputHeader searchFunction={searchMoviesFunction} />
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height - 200 }}>
                    <ActivityIndicator color={"#FF5524"} size={80} />
                </View>
            ) : (
                <View>
                    {/* New Playing Movies List */}
                    <CategoryHeader title="New Playing" />
                    <ScrollView
                        snapToInterval={width * 0.7 + 36}
                        bounces={false}
                        horizontal
                        decelerationRate={0}
                        showsHorizontalScrollIndicator={false}
                    >
                        {nowPlayingMoviesList.map((item: any, index: number) => {
                            if (!item.original_title) {
                                const spacerWidth = (width - (width * 0.5 + 36 * 2)) / 2;
                                return (
                                    <View key={`spacer-${index}`} style={{ width: spacerWidth }} />
                                );
                            }
                            const isFirst = index === 0;
                            const isLast = index === nowPlayingMoviesList.length - 1;
                            const cardWidth = isFirst || isLast ? width * 0.5 : width * 0.7;

                            return (
                                <View key={item.id}>
                                    <MovieCard
                                        shouldMarginatedAtEnd={true}
                                        cardFunction={() => {
                                            navigation.push("MovieDetails", { movieid: item.id });
                                        }}
                                        cardWidth={cardWidth}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                        title={item.original_title}
                                        imagePath={baseImagePath("w780", item.poster_path)}
                                        genre={Array.isArray(item.genre_ids) ? item.genre_ids.slice(1, 4) : []}
                                        vote_average={item.vote_average}
                                        vote_count={item.vote_count}
                                        genres={genres}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                    {/* Popular Movies List*/}
                    <CategoryHeader title="Popular" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {popularMoviesList.map((item: any, index: any) => {
                            return (
                                <View key={item.id}>
                                    <SubMovieCard
                                        shouldMarginatedAtEnd={true}
                                        cardFunction={() => {
                                            navigation.push("MovieDetails", { movieid: item.id });
                                        }}
                                        cardWidth={width / 3}
                                        isFirst={index == 0 ? true : false}
                                        isLast={index == popularMoviesList.length - 1}
                                        title={item.original_title}
                                        imagePath={baseImagePath("w342", item.poster_path)}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>
                    {/* Upcoming Movies List */}
                    <CategoryHeader title="Upcoming" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {upcomingMoviesList.map((item: any, index: any) => {
                            return (
                                <View key={item.id}>
                                    <SubMovieCard
                                        shouldMarginatedAtEnd={true}
                                        cardFunction={() => {
                                            navigation.push("MovieDetails", { movieid: item.id });
                                        }}
                                        cardWidth={width / 3}
                                        isFirst={index == 0 ? true : false}
                                        isLast={index == upcomingMoviesList.length - 1}
                                        title={item.original_title}
                                        imagePath={baseImagePath("w342", item.poster_path)}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            )}
        </ScrollView>
    );
}

export default HomeScreen;