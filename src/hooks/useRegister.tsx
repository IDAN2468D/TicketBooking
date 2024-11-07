import { useReducer } from 'react';
import { auth } from '../api/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
        ? ""
        : "פורמט האימייל אינו תקין.";
}

const validatePassword = (password: string): string => {
    if (password.length < 8) {
        return "הסיסמה חייבת להיות לפחות 8 תווים.";
    }
    if (!/[A-Z]/.test(password)) {
        return "הסיסמה חייבת לכלול לפחות אות אחת גדולה.";
    }
    if (!/[a-z]/.test(password)) {
        return "הסיסמה חייבת לכלול לפחות אות אחת קטנה.";
    }
    if (!/\d/.test(password)) {
        return "הסיסמה חייבת לכלול לפחות ספרה אחת.";
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

        // אימות אימייל וסיסמה
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

        // בדיקה ששדה השם מלא
        if (!state.name) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'אנא מלא את השם שלך.' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            const user = userCredential.user;

            if (user) {
                console.log('משתמש מחובר:', user);
                await updateProfile(user, { displayName: state.name });
                dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: 'הרשמה בוצעה בהצלחה!' });
                dispatch({ type: 'SET_REGISTERED_USER_NAME', payload: state.name });
                navigation.navigate("Login");
            } else {
                console.log('לא נמצא משתמש מחובר לאחר יצירת החשבון.');
            }
        } catch (error) {
            const firebaseError = error as { code?: string; message?: string };
            console.error('שגיאת הרשמה:', firebaseError);
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: firebaseError.message || 'הרשמה נכשלה. אנא נסה שוב.' });
        }
    };

    return {
        ...state,
        setName: (name: string) => dispatch({ type: 'SET_NAME', payload: name }),
        setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
        setPassword: (password: string) => dispatch({ type: 'SET_PASSWORD', payload: password }),
        togglePasswordVisibility: () => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' }),
        handleRegister
    };
};

export default useRegister;