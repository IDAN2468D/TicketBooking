import { useReducer } from 'react';
import { auth } from '../api/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
        ? ""
        : "The email format is incorrect.";
}

const validatePassword = (password: string): string => {
    if (password.length < 8) {
        return "The password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "The password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "The password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(password)) {
        return "The password must contain at least one digit.";
    }
    return "";
}

interface State {
    name: string;
    email: string;
    password: string;
    errorMessage: string;
    showPassword: boolean;
    successMessage: string;
    registeredUserName: string;
}

type ActionType =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: 'SET_ERROR_MESSAGE'; payload: string }
    | { type: 'SET_SUCCESS_MESSAGE'; payload: string }
    | { type: 'SET_REGISTERED_USER_NAME'; payload: string };

const initialState: State = {
    name: '',
    email: '',
    password: '',
    showPassword: false,
    errorMessage: '',
    successMessage: '',
    registeredUserName: ''
};

const registerReducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, showPassword: !state.showPassword };
        case 'SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload };
        case 'SET_SUCCESS_MESSAGE':
            return { ...state, successMessage: action.payload };
        case 'SET_REGISTERED_USER_NAME':
            return { ...state, registeredUserName: action.payload };
        default:
            return state;
    }
};

const useRegister = (navigation: any) => {
    const [state, dispatch] = useReducer(registerReducer, initialState);

    const handleRegister = async () => {
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' });
        dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: '' });

        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);

        if (emailError) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: emailError });
            return;
        }
        if (passwordError) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: passwordError });
            return;
        }

        if (!state.name) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'Please fill in your name.' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            const user = userCredential.user;

            if (user) {
                console.log('User logged in:', user);
                await updateProfile(user, { displayName: state.name });
                dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: 'Registration successfully completed!' });
                dispatch({ type: 'SET_REGISTERED_USER_NAME', payload: state.name });
                navigation.navigate("Login");
            } else {
                console.log('No user found logged in after creating the account.');
            }
        } catch (error) {
            const firebaseError = error as { code?: string; message?: string };
            console.error('שגיאת הרשמה:', firebaseError);
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: firebaseError.message || 'Registration failed. Please try again.' });
        }
    };

    return {
        ...state,
        setName: (name: string) => dispatch({ type: 'SET_NAME', payload: name }),
        setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
        setPassword: (password: string) => dispatch({ type: 'SET_PASSWORD', payload: password }),
        togglePasswordVisibility: () => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' }),
        handleRegister,
        validateEmail,
        validatePassword
    };
};

export default useRegister;