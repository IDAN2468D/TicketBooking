import { useReducer } from 'react';
import { auth } from '../api/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Define action types
type ActionType =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_ERROR_MESSAGE'; payload: string }
    | { type: 'SET_SUCCESS_MESSAGE'; payload: string }
    | { type: 'SET_REGISTERED_USER_NAME'; payload: string };

// Use any type instead of defining the state explicitly
const initialState: any = {
    name: '',
    email: '',
    password: '',
    errorMessage: '',
    successMessage: '',
    registeredUserName: ''
};

// Reducer function
const registerReducer = (state: any, action: ActionType): any => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
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

        if (!state.name || !state.email || !state.password) {
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'אנא מלא את כל השדות: שם, כתובת דוא"ל וסיסמה.' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            const user = userCredential.user;
            navigation.navigate("Login");

            if (user) {
                console.log('משתמש מחובר:', user);
                await updateProfile(user, { displayName: state.name });
                dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: 'הרשמה בוצעה בהצלחה!' });
            } else {
                console.log('לא נמצא משתמש מחובר לאחר יצירת החשבון.');
            }
        } catch (error) {
            const firebaseError = error as { code?: string; message?: string };
            console.error('שגיאת הרשמה:', firebaseError);
            dispatch({ type: 'SET_ERROR_MESSAGE', payload: firebaseError.message || 'הרשמה נכשלה. אנא נסה שוב.' });
        }

        const user = auth.currentUser;
        if (user) {
            await updateProfile(user, { displayName: state.name });
            console.log('שם המשתמש המעודכן:', user.displayName);
            dispatch({ type: 'SET_REGISTERED_USER_NAME', payload: state.name });
        } else {
            console.log('משתמש לא מחובר');
        }
    };

    return {
        ...state,
        setName: (name: string) => dispatch({ type: 'SET_NAME', payload: name }),
        setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
        setPassword: (password: string) => dispatch({ type: 'SET_PASSWORD', payload: password }),
        handleRegister
    };
};

export default useRegister;