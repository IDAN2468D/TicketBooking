// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7QZfirIePan2uSwJgJPblBRtvEMNzSR4",
    authDomain: "ticket-booking-bd316.firebaseapp.com",
    projectId: "ticket-booking-bd316",
    storageBucket: "PROJECT_ID.appspot.com",
    appId: "1:181652245187:android:15bb52c5849df0420f7076",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Export auth for use in other files
export { auth };
