import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useLogin from '../../hooks/useLogin';

const LoginScreen = ({ navigation }: any) => {
    const {
        handleLogin,
        setEmail,
        setPassword,
        email,
        password,
        errorMessage,
        showPassword,
        togglePasswordVisibility,
        signInWithGoogle,
    } = useLogin(navigation);
    return (
        <View className="flex-1 bg-white px-5">
            <StatusBar barStyle="dark-content" />
            <View className="items-center mt-10 mb-5">
                <Icon name="ticket" size={32} color="#FF5524" />
                <Text className="text-2xl font-bold mt-2">Ticket Booking</Text>
                <Text className="text-base text-gray-600 mt-1 text-center">
                    Buying tickets in a movie app is a fast and easy way to select a film and pay anytime, anywhere.
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-2xl font-bold mb-2">Sign In</Text>
                <Text className="text-base text-gray-600 mb-7">Please fill your detail to access the application</Text>
                {/* Email Input */}
                <View className="mb-5 relative">
                    <View className="border border-gray-300 rounded-lg flex-row items-center py-1 px-2">
                        <TextInput
                            className="flex-1 ml-2 text-base"
                            placeholder="Add your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Icon name="email-outline" size={20} color="#666" />
                    </View>
                </View>
                {/* Password Input */}
                <View className="mb-5 relative">
                    <View className="border border-gray-300 rounded-lg flex-row items-center py-1 px-2">
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#666" />
                        </TouchableOpacity>
                        <TextInput
                            className="flex-1 ml-2 text-base"
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={showPassword}
                        />
                        <Icon name="lock" size={20} color="#666" />
                    </View>
                </View>
                {/* Remember Me and Forgot Password */}
                <View className="flex-row justify-between items-center mb-7">
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ForgetPassword")}>
                        <Text className="text-orange-600 text-base">Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                {/* Error Message */}
                {errorMessage && <Text className="text-red-600 mb-2">{errorMessage}</Text>}
                {/* Sign In Button */}
                <TouchableOpacity className="bg-orange-600 rounded-lg p-4 items-center mt-1" onPress={handleLogin} activeOpacity={0.5}>
                    <Text className="text-white text-lg font-bold">Sign In</Text>
                </TouchableOpacity>
                {/* Alternative Sign In Options */}
                <Text className="text-center text-gray-600 my-3">or</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={signInWithGoogle} className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4 mb-4">
                    <FontAwesome name="google" size={24} color="#000" />
                    <Text className="ml-2 text-lg">Sign in with Google</Text>
                </TouchableOpacity>
                {/* Sign Up Link */}
                <View className="flex-row justify-center mt-5">
                    <Text className="text-base text-gray-600">Don't have an account?{" "}
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Register")}>
                            <Text className="text-orange-600 font-bold">Sign up</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;