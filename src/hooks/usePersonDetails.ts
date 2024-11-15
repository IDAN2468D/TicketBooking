import { useEffect, useReducer } from 'react';
import { ApiKey } from '../api/apicalls';

interface PersonState {
    loading: boolean;
    error: string | null;
    data: any | null;
    isExpanded: boolean;
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'TOGGLE_EXPAND'; payload: boolean };

const initialState: PersonState = {
    loading: true,
    error: null,
    data: null,
    isExpanded: false,
};

const personReducer = (state: PersonState, action: Action): PersonState => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'TOGGLE_EXPAND':
            return { ...state, isExpanded: action.payload };
        default:
            return state;
    }
};

export const usePersonDetails = (personId: string) => {
    const [state, dispatch] = useReducer(personReducer, initialState);

    useEffect(() => {
        const getPersonDetails = async () => {
            dispatch({ type: 'FETCH_START' });
            const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${ApiKey}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.warn(`Person with ID ${personId} not found.`);
                    }
                    throw new Error(`Failed to fetch person data, Status code: ${response.status}`);
                }
                const data = await response.json();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error: any) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };

        getPersonDetails();
    }, [personId]);

    const toggleBiography = () => {
        dispatch({ type: 'TOGGLE_EXPAND', payload: !state.isExpanded });
    };

    return { ...state, toggleBiography };
};