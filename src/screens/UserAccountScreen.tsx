import React from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import { AppHeader, ButtonProfile, SignOutModal } from '../components';
import { ButtonText } from '../assets/data/ButtonInfoProfile';
import { useAuth } from '../hooks/useProfile';

const UserAccountScreen = ({ navigation }: any) => {
    const { userName, userPhoto, handleSignOut, confirmSignOut, closeModal, modalVisible } = useAuth(navigation);

    return (
        <View className="flex-1 bg-black">
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />
            <View className="mt-[70px]">
                <AppHeader header="My Profile" />
                <View className=" mt-7 items-center">
                    <Image
                        source={{
                            uri: userPhoto ? userPhoto : "https://neuroflash.com/wp-content/uploads/2022/12/feature-image-ai-avatar-maker.png"
                        }}
                        className="w-20 h-20 rounded-full mb-5"
                    />
                    <Text className="text-white text-lg font-poppins-medium">{userName || 'Guest User'}</Text>
                </View>
            </View>
            {/* כפתורי הפעולה */}
            <View className="mx-5 mt-16">
                {ButtonText.map((button) => (
                    <View key={button.id}>
                        <ButtonProfile
                            text={button.text}
                            icon={button.icon}
                            onPress={() => {
                                if (button.id === 'logout') {
                                    confirmSignOut()
                                } else if (button.id === 'offers') {
                                    navigation.navigate('CinemaPlace');
                                }
                            }}
                        />
                    </View>
                ))}
            </View>
            {/* מודל יציאה */}
            <SignOutModal
                visible={modalVisible}
                onClose={closeModal}
                onSignOut={handleSignOut}
            />
        </View>
    );
};

export default UserAccountScreen;
