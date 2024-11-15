import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
    StatusBar,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useDetails from '../hooks/useDetails';
import { AppHeader, CastData, CategoryHeader, ButtonText } from '../components';
import { baseImagePath } from '../api/apicalls';
import CustomIcon from '../components/CustomIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFavorites } from '../hooks/useFavorites';

// Assuming this is in a shared types file
interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
    runtime?: number;
    backdrop_path?: string;
    poster_path?: string; // This should be recognized
    tagline?: string;
    genres?: Array<{ id: number; name: string }>;
    [key: string]: any; // Allows any other properties of any type
}


type MovieBookingScreenProps = {
    route: any;
    navigation: any;
};

const MovieBookingScreen: React.FC<MovieBookingScreenProps> = ({ route, navigation }) => {
    const { movieData, movieCastData }: { movieData: Movie; movieCastData: any } = useDetails(route);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // Loader while data is being fetched
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

    // Image paths for backdrop and poster
    const backdropPath = baseImagePath("w780", movieData.backdrop_path || 'default-backdrop.jpg');
    const posterPath = baseImagePath("w342", movieData.poster_path || 'default-poster.jpg');
    const originalPosterPath = baseImagePath("original", movieData.poster_path || 'default-original-poster.jpg');

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
                    source={{ uri: backdropPath }}
                >
                    <LinearGradient style={{ height: "100%" }} colors={["rgba(0,0,0,0.1)", "#000000"]}>
                        <View className='mx-[50px] my-14'>
                            <View className='flex-row-reverse items-center justify-center'>
                                <AppHeader name="close" header="" action={() => navigation.goBack()} />
                                <TouchableOpacity onPress={() => { navigation.navigate("Trailer", { movieData }) }}>
                                    <View className='pl-3'>
                                        <MaterialCommunityIcons name='movie-open-play' color={"white"} size={25} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => toggleFavorite(movieData)}
                                    accessible={true}
                                    accessibilityLabel={`Toggle favorite for ${movieData.title}`}
                                    activeOpacity={0.7}
                                >
                                    <AntDesign
                                        name="heart"
                                        color={isFavorite(movieData.id) ? "red" : "white"}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <View className='w-full aspect-[2850/1727]'></View>
                <Image
                    className='w-[60%] aspect-[200/300] absolute bottom-0 self-center'
                    source={{ uri: posterPath }}
                />
            </View>
            <View className='flex flex-row-reverse items-start gap-1 justify-center my-space_15'>
                <CustomIcon className='text-size_20 text-White mr-space_8' name="clock" />
                <Text className='text-White font-poppins_medium text-size_14'>
                    {movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${Math.floor(movieData.runtime % 60)}m` : 'N/A'}
                </Text>
            </View>
            <View className='justify-center items-center gap-1'>
                <Text className='text-White text-size_24 text-center'>{movieData.original_title || 'Title Unavailable'}</Text>
                <View className='flex-row-reverse gap-space_10 flex-wrap justify-center mb-[14px]'>
                    {movieData.genres && movieData.genres.map((item: any) => (
                        <View className='border-WhiteRGBA50 border-[1px] py-space_4 px-space_10 rounded-radius_15' key={item.id}>
                            <Text className='font-poppins_regular text-size_10 text-White'>{item.name}</Text>
                        </View>
                    ))}
                </View>
                {movieData.tagline && (
                    <Text className='text-White font-poppins_thin text-size_14 italic text-center'>{movieData.tagline}</Text>
                )}
            </View>
            <View className='mx-space_24 mt-space_12'>
                <View className='flex flex-row-reverse gap-space_4'>
                    <CustomIcon className='text-size_20 text-Yellow' name='star' />
                    <Text className='text-White text-size_16 font-poppins_medium'>
                        {"  "}({movieData.vote_count || 0}){" "}{movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A'}
                    </Text>
                    <Text className='text-White text-size_16 font-poppins_medium'>
                        {movieData.release_date ? new Date(movieData.release_date).toLocaleDateString("en-US", {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        }) : 'N/A'}
                    </Text>
                </View>
                <Text className='text-white font-poppins_light text-size_14'>{movieData.overview || 'No description available.'}</Text>
            </View>
            <View>
                <CategoryHeader title="Top Cast" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {movieCastData.cast && movieCastData.cast.map((item: any, index: number) => (
                        <View key={item.id}>
                            <CastData
                                shouldMarginatedAtEnd={true}
                                shouldMarginatedAround={true}
                                cardWidth={80}
                                isFirst={index === 0}
                                isLast={index === movieCastData.cast.length - 1}
                                imagePath={baseImagePath("w185", item.profile_path)}
                                title={item.original_name}
                                subtitle={item.character}
                                onPress={() => navigation.navigate('CastDetails', { personId: item.id })}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Button to Navigate to Seat Selection */}
                <ButtonText
                    onPress={() => navigation.push("SeatBooking", {
                        BgImage: backdropPath,
                        PosterImage: originalPosterPath,
                    })}
                    containerTitle="bg-Orange py-space_15 my-space_36 mx-[100px] rounded-[40px]"
                    titleText="text-center text-White text-size_14"
                    title="Select Seats"
                />
            </View>

        </ScrollView>
    );
};

export default MovieBookingScreen;
