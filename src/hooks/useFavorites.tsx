import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    poster_path?: string;
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    const toggleFavorite = async (movie: Movie) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
        const updatedFavorites = isAlreadyFavorite
            ? favorites.filter(favoriteMovie => favoriteMovie.id !== movie.id)
            : [...favorites, movie];

        // Update state immediately
        setFavorites(updatedFavorites);

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    };

    const isFavorite = (id: number) => favorites.some(fav => fav.id === id);

    const getFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('@favorites');
            if (storedFavorites) {
                const parsedFavorites: Movie[] = JSON.parse(storedFavorites);
                setFavorites(parsedFavorites);
            }
        } catch (error) {
            console.error('Failed to load favorites from storage:', error);
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return { favorites, toggleFavorite, isFavorite };
};
