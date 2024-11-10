import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const SignOutModal = ({ visible, onClose, onSignOut }: any) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-6 rounded-lg items-center w-5/6">
                    <Text className="text-xl font-bold mb-4">exit</Text>
                    <Text className="text-lg mb-6 text-center">Are you sure you want to go out?</Text>
                    <View className="flex-row justify-between w-full">
                        <TouchableOpacity onPress={onClose} className="flex-1 bg-gray-400 p-3 rounded-lg mr-2">
                            <Text className="text-white font-bold text-center">No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSignOut} className="flex-1 bg-red-500 p-3 rounded-lg">
                            <Text className="text-white font-bold text-center">Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SignOutModal;