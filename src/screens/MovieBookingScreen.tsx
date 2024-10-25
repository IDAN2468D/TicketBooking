import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View, StatusBar, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useDetails from '../hooks/useDetails';
import { AppHeader, CastData, CategoryHeader, ButtonText } from '../components';
import { baseImagePath } from '../api/apicalls';
import CustomIcon from '../components/CustomIcon';

const MovieBookingScreen = ({ route, navigation }: any) => {
    const { movieData, movieCastData } = useDetails(route);

    if (!movieData || !movieCastData) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                bounces={false}
                className='flex flex-1 bg-Black'
                showsVerticalScrollIndicator={false}
            >
                <View className='mx-[30px] my-14'>
                    <AppHeader name="close" header="Movie Details" action={() => navigation.goBack()} />
                </View>
                <View className='flex-1 self-center justify-center'>
                    <ActivityIndicator color={"#FF5524"} size={80} />
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView
            className='flex flex-1 bg-Black'
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <View>
                <ImageBackground
                    style={{ width: "100%", aspectRatio: 2850 / 1727 }}
                    source={{ uri: baseImagePath("w780", movieData.backdrop_path) }}
                >
                    <LinearGradient style={{ height: "100%" }} colors={["rgba(0,0,0,0.1)", "#000000"]}>
                        <View className='mx-[30px] my-14'>
                            <AppHeader name="close" header="" action={() => navigation.goBack()} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <View className='w-full aspect-[2850/1727]'></View>
                <Image
                    className='w-[60%] aspect-[200/300] absolute bottom-0 self-center'
                    source={{ uri: baseImagePath("w342", movieData.poster_path) }}
                />
            </View>
            <View className='flex flex-row-reverse items-start gap-1 justify-center my-space_15'>
                <CustomIcon className='text-size_20 text-White mr-space_8' name="clock" />
                <Text className='text-White font-poppins_medium text-size_14'>
                    {Math.floor(movieData?.runtime / 60)}h {""}
                    {Math.floor(movieData?.runtime % 60)}m
                </Text>
            </View>
            <View className='justify-center items-center gap-1'>
                <Text className='text-White text-size_24 text-center'>{movieData?.original_title}</Text>
                <View className='flex-row-reverse gap-space_10 flex-wrap justify-center mb-[14px]'>
                    {movieData?.genres.map((item: any) => (
                        <View className='border-WhiteRGBA50 border-[1px] py-space_4 px-space_10 rounded-radius_15' key={item.id}>
                            <Text className='font-poppins_regular text-size_10 text-White'>{item.name}</Text>
                        </View>
                    ))}
                </View>
                <Text className='text-White font-poppins_thin text-size_14 italic text-center'>{movieData.tagline}</Text>
            </View>
            <View className='mx-space_24 mt-space_12'>
                <View className='flex flex-row-reverse gap-space_4'>
                    <CustomIcon className='text-size_20 text-Yellow' name='star' />
                    <Text className='text-White text-size_16 font-poppins_medium'>{"  "}({movieData.vote_count}){" "}{movieData.vote_average.toFixed(1)}</Text>
                    <Text className='text-White text-size_16 font-poppins_medium'>
                        {movieData.release_date.substring(8, 10)}{" "}
                        {new Date(movieData.release_date).toLocaleString("default", { month: "long" })}{" "}
                        {movieData.release_date.substring(0, 4)}{"   "}
                    </Text>
                </View>
                <Text className='text-white font-poppins_light text-size_14'>{movieData.overview}</Text>
            </View>
            <View>
                <CategoryHeader title="Top Cast" />
                <ScrollView horizontal>
                    {movieCastData.cast.map((item: any, index: number) => (
                        <View key={item.id}>
                            <CastData
                                shouldMarginatedAtEnd={true}
                                shouldMarginatedAround={true}
                                cardWidth={80}
                                isFirst={index == 0 ? true : false}
                                isLast={index == movieCastData.length - 1 ? true : false}
                                imagePath={baseImagePath("w185", item.profile_path)}
                                title={item.original_name}
                                subtitle={item.character}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Button Tickets */}
                <ButtonText
                    onPress={() => navigation.push("SeatBooking", {
                        BgImage: baseImagePath("w780", movieData.backdrop_path),
                        PosterImage: baseImagePath("original", movieData.poster_path),
                    })}
                    containerTitle="bg-Orange py-space_15 my-space_36 mx-[100px] rounded-[40px]"
                    titleText="text-center text-White text-size_14"
                    title="Select Seats"
                />
            </View>
        </ScrollView>
    )
}

export default MovieBookingScreen;