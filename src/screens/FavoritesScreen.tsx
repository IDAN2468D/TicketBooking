import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useFavorites } from '../FavoritesContext/FavoritesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteItem from '../components/FavorifeCard'; // Corrected the import statement

export interface FavoriteMovie {
    id: number;
    poster_path: string;
    original_title: string;
    release_date: string;
}

const FavoritesScreen = ({ navigation }: any) => {
    const { favorites, setFavorites } = useFavorites();

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('@favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };

        const unsubscribe = navigation.addListener('focus', getFavorites);

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View className="mx-[30px] mt-10">
                {favorites.length === 0 ? (
                    <Text className="text-White text-center">No favorite movies yet.</Text>
                ) : (
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <Text className="text-White text-center text-2xl font-bold">Favorite Movies</Text>
                        {favorites.map((favoriteMovie) => (
                            <FavoriteItem
                                key={favoriteMovie.id}
                                movie={favoriteMovie}
                                navigation={navigation}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default FavoritesScreen;
