import { useReducer, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as firebaseAuth } from '../api/firebase';

interface State {
    email: string;
    password: string;
    errorMessage: string;
    showPassword: boolean;
    name: string | null;
    photo: string | null;
}

type Action =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_ERROR_MESSAGE'; payload: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: 'RESET_ERROR_MESSAGE' }
    | { type: 'SET_USER_INFO'; payload: { name: string | null; photo: string | null } };

const initialState: State = {
    email: '',
    password: '',
    errorMessage: '',
    showPassword: false,
    name: null,
    photo: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, showPassword: !state.showPassword };
        case 'RESET_ERROR_MESSAGE':
            return { ...state, errorMessage: '' };
        case 'SET_USER_INFO':
            return { ...state, name: action.payload.name, photo: action.payload.photo };
        default:
            return state;
    }
};

const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
};

const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

function useLogin(navigation: any) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Tab");
            }
        });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        dispatch({ type: 'RESET_ERROR_MESSAGE' });

        if (!validateEmail(state.email)) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'Please enter a valid email address.' });
            return;
        }

        if (!validatePassword(state.password)) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'Password must be at least 6 characters long.' });
            return;
        }

        console.log('Attempting to login with email:', state.email);
        try {
            await signInWithEmailAndPassword(firebaseAuth, state.email, state.password);
            navigation.navigate("Tab");
            console.log('User logged in successfully!');
        } catch (error) {
            const firebaseError = error as { code?: string; message?: string };
            console.error('Login error:', firebaseError);
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: firebaseError.message || 'Login failed. Please try again.' });
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '181652245187-t6m46i5o7jqcpv4udfjo9t04s290hr0u.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
    }, []);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { type, data } = await GoogleSignin.signIn();
            if (type === 'success') {
                const idToken = data.idToken;
                if (!idToken) {
                    throw new Error("ID Token is missing");
                }
                console.log("User Info:", data.user);
                console.log("ID Token:", idToken);
                const name = data.user?.name || null;
                const photo = data.user?.photo || null;
                console.log("Name:", name);
                console.log("Photo URL:", photo);
                dispatch({ type: 'SET_USER_INFO', payload: { name, photo } });
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                await auth().signInWithCredential(googleCredential);
                navigation.navigate("Tab");
            } else if (type === 'cancelled') {
                console.log("Sign-in was cancelled.");
                return;
            }
        } catch (error: any) {
            console.error("Sign-In Error:", error);
            Alert.alert('Error', error.message || 'Failed to sign in. Please try again.');
        }
    };

    return {
        name: state.name,
        photo: state.photo,
        email: state.email,
        password: state.password,
        errorMessage: state.errorMessage,
        showPassword: state.showPassword,
        handleLogin,
        validateEmail,
        validatePassword,
        signInWithGoogle,
        setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
        setPassword: (password: string) => dispatch({ type: 'SET_PASSWORD', payload: password }),
        togglePasswordVisibility: () => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' }),
        setErrorMessage: (message: string) => dispatch({ type: 'SET_ERROR_MESSAGE', payload: message }),
    };
}

export default useLogin;