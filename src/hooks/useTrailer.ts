import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { ApiKey } from '../api/apicalls';
import { useNavigation } from '@react-navigation/native';

type State = {
    isTrailerVisible: boolean;
    trailerKey: string | null;
    loading: boolean;
    error: string | null;
};

type Action =
    | { type: 'SET_LOADING' }
    | { type: 'SET_TRAILER'; payload: string }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLOSE_TRAILER' };

const initialState: State = {
    isTrailerVisible: false,
    trailerKey: null,
    loading: false,
    error: null,
};

const trailerReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true };
        case 'SET_TRAILER':
            return { ...state, trailerKey: action.payload, isTrailerVisible: true, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'CLOSE_TRAILER':
            return { ...state, isTrailerVisible: false, trailerKey: null, error: null };
        default:
            return state;
    }
};

const useTrailer = (movieId: number | null) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(trailerReducer, initialState);

    useEffect(() => {
        if (movieId) {
            fetchTrailer(movieId);
        }
    }, [movieId]);

    const fetchTrailer = async (movieId: number) => {
        dispatch({ type: 'SET_LOADING' });

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${ApiKey}`
            );
            const trailers = response.data.results.filter(
                (video: { type: string; site: string }) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            if (trailers.length > 0) {
                dispatch({ type: 'SET_TRAILER', payload: trailers[0].key });
            } else {
                dispatch({ type: 'SET_ERROR', payload: 'Trailer not found' });
            }
        } catch (error) {
            console.error('Failed to fetch trailer:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Error fetching trailer' });
        }
    };

    const closeTrailer = () => {
        dispatch({ type: 'CLOSE_TRAILER' });
        navigation.goBack();
    };

    return { state, closeTrailer };
};

export default useTrailer;