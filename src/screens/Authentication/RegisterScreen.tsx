import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useRegister from '../../hooks/useRegister';

const RegisterScreen = ({ navigation }: any) => {
    const { handleRegister,
        setEmail,
        setPassword,
        setName,
        email,
        password,
        name,
        errorMessage,
        showPassword,
        togglePasswordVisibility
    } = useRegister(navigation);

    return (
        <View className="flex-1 bg-white px-5">
            <StatusBar barStyle="dark-content" />
            <View className="items-center mt-10 mb-5">
                <Icon name="ticket" size={32} color="#FF5524" />
                <Text className="text-2xl font-bold mt-2">Ticket Booking</Text>
                <Text className="text-base text-gray-600 mt-1 text-center">
                    Create an account to book your favorite movie tickets easily.
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-2xl font-bold mb-2">Sign Up</Text>
                <Text className="text-base text-gray-600 mb-7">Please fill in your details to create an account</Text>
                {/* Name Input */}
                <View className="mb-5 relative">
                    <View className="border border-gray-300 rounded-lg flex-row items-center py-1 px-2">
                        <TextInput
                            className="flex-1 ml-2 text-base"
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                        <Icon name="account" size={20} color="#666" />
                    </View>
                </View>
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
                {/* Error Message */}
                {errorMessage && <Text className="text-red-600 mb-2">{errorMessage}</Text>}
                {/* Sign Up Button */}
                <TouchableOpacity className="bg-orange-600 rounded-lg p-4 items-center mt-1" onPress={handleRegister} activeOpacity={0.5}>
                    <Text className="text-white text-lg font-bold">Sign Up</Text>
                </TouchableOpacity>
                {/* Alternative Sign Up Options */}
                <Text className="text-center text-gray-600 my-3">or</Text>
                <TouchableOpacity activeOpacity={0.5} className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4 mb-4">
                    <FontAwesome name="google" size={24} color="#000" />
                    <Text className="ml-2 text-lg">Sign up with Google</Text>
                </TouchableOpacity>
                {/* Sign In Link */}
                <View className="flex-row justify-center mt-5">
                    <Text className="text-base text-gray-600">Already have an account?{" "}
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Login")}>
                            <Text className="text-orange-600 font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RegisterScreen;