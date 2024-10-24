import { useEffect, useReducer } from 'react';
import { firebase } from '@react-native-firebase/auth';

const initialState = {
    userName: null,
    userPhoto: null,
};

const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                userName: action.payload.displayName,
                userPhoto: action.payload.photoURL,
            };
        case 'CLEAR_USER':
            return initialState;
        default:
            return state;
    }
};

export const useAuth = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User email: ', user.email);
                dispatch({ type: 'SET_USER', payload: user });
            } else {
                console.log('No user is signed in.');
                dispatch({ type: 'CLEAR_USER' });
            }
        });

        return () => unsubscribe();
    }, []);

    return state;
};
