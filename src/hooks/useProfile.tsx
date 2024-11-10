import { useEffect, useReducer, useState } from 'react';
import { firebase } from '@react-native-firebase/auth';

const initialState = {
    userName: null,
    userPhoto: null,
    isAuthChecked: false,
};

const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userName: action.payload.displayName,
                userPhoto: action.payload.photoURL,
                isAuthChecked: true,
            };
        case 'CLEAR_USER':
            return {
                ...state,
                userName: null,
                userPhoto: null,
                isAuthChecked: true,
            };
        default:
            return state;
    }
};

export const useAuth = (navigation: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
            } else {
                dispatch({ type: 'CLEAR_USER' });
            }
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        if (state.isAuthChecked && firebase.auth().currentUser) {
            try {
                await firebase.auth().signOut();
                dispatch({ type: 'CLEAR_USER' });
                console.log('User signed out successfully.');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } catch (error) {
                console.error('Error signing out: ', error);
            }
        } else {
            console.log('No user is signed in, cannot sign out.');
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const confirmSignOut = () => {
        setModalVisible(true);
    };

    // סגירת המודל
    const closeModal = () => {
        setModalVisible(false);
    };

    return { ...state, handleSignOut, confirmSignOut, closeModal, modalVisible };
};