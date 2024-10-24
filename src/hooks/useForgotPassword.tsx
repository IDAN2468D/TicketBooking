import { useState } from 'react';
import auth from '@react-native-firebase/auth';

const useForgotPassword = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleForgotPassword = async (email: string) => {
        setErrorMessage(null); // נקה את הודעת השגיאה בהתחלה
        setSuccessMessage(null); // נקה את הודעת ההצלחה בהתחלה
        
        if (!email) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        try {
            await auth().sendPasswordResetEmail(email);
            setSuccessMessage("A password reset email has been sent.");
        } catch (error) {
            setErrorMessage("Failed to send reset email. Please check the email and try again.");
        }
    };

    return {
        handleForgotPassword,
        errorMessage,
        successMessage,
    };
};

export default useForgotPassword;
