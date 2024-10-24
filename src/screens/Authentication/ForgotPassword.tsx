import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useForgotPassword from '../../hooks/useForgotPassword';

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const { handleForgotPassword, errorMessage, successMessage } = useForgotPassword();

    return (
        <View className="flex-1 bg-white px-5">
            <StatusBar barStyle="dark-content" />
            <View className="items-center mt-10 mb-5">
                <Icon name="ticket" size={32} color="#FF5524" />
                <Text className="text-2xl font-bold mt-2">Ticket Booking</Text>
                <Text className="text-base text-gray-600 mt-1 text-center">
                    Enter your email to reset your password.
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-2xl font-bold mb-2">Forgot Password</Text>
                <Text className="text-base text-gray-600 mb-7">Please enter your registered email to receive password reset instructions</Text>
                {/* Email Input */}
                <View className="mb-5 relative">
                    <View className="border border-gray-300 rounded-lg flex-row items-center py-1 px-2">
                        <TextInput
                            className="flex-1 ml-2 text-base"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Icon name="email-outline" size={20} color="#666" />
                    </View>
                </View>
                {/* Error or Success Message */}
                {errorMessage && <Text className="text-red-600 mb-2">{errorMessage}</Text>}
                {successMessage && <Text className="text-green-600 mb-2">{successMessage}</Text>}
                {/* Reset Password Button */}
                <TouchableOpacity className="bg-orange-600 rounded-lg p-4 items-center mt-1" onPress={() => handleForgotPassword(email)} activeOpacity={0.5}>
                    <Text className="text-white text-lg font-bold">Reset Password</Text>
                </TouchableOpacity>
                {/* Go Back to Login */}
                <View className="flex-row justify-center mt-5">
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
                        <Text className="text-orange-600 font-bold">Back to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;
