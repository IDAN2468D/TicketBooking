import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../FavoritesContext/FavoritesContext';
import { baseImagePath } from '../api/apicalls';


const FavoriteItem = ({ movie, navigation }: any) => {
    const { toggleFavorite } = useFavorites();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => { }}
        >
            <Image
                source={{ uri: baseImagePath('w185', movie.poster_path) }}
                style={styles.image}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{movie.original_title}</Text>
                <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(movie)}
                >
                    <Text style={styles.favoriteButtonText}>Remove from Favorites</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 4,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    releaseDate: {
        color: '#AAA',
        fontSize: 14,
        marginVertical: 4,
    },
    favoriteButton: {
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#E63946',
    },
    favoriteButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
});

export default FavoriteItem;
