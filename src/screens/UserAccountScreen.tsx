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
            <View className="mx-4 mt-[70px]">
                <AppHeader name="close" header="My Profile" />
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
            <View className="mx-5 mt-1">
                {ButtonText.map((button) => (
                    <View key={button.id} className="mt-5">
                        <ButtonProfile
                            text={button.text}
                            subtext={button.subtext}
                            subtext_2={button.subtext_2}
                            icon={button.icon}
                            onPress={button.id === 'logout' ? confirmSignOut : undefined}
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
