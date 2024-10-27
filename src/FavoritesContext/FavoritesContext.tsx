import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoriteMovie = {
    id: number;
    original_title: string;
    poster_path: string;
};

type FavoritesContextType = {
    favorites: FavoriteMovie[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteMovie[]>>; // הוסף את setFavorites
    toggleFavorite: (movie: FavoriteMovie) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

    const toggleFavorite = async (movie: FavoriteMovie) => {
        const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
            ? favorites.filter((fav) => fav.id !== movie.id)
            : [...favorites, movie];

        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites)); // עדכון ב-AsyncStorage
    };

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};