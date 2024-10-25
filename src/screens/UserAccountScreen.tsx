// UserAccountScreen.tsx
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppHeader, ButtonProfile } from '../components';
import { ButtonText } from '../assets/data/ButtonInfoProfile';
import { useAuth } from '../hooks/useProfile'; // Import the custom hook

const UserAccountScreen = ({ navigation }: any) => {
    const { userName, userPhoto, signOut } = useAuth(navigation);

    return (
        <View className='flex-1 bg-Black'>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"light-content"} />

            <View className='mx-space_16 mt-[70px]'>
                <AppHeader name="close" header="My Profile" />
            </View>
            <View className='flex-1 mt-7 items-center'>
                <Image
                    source={{
                        uri: userPhoto ? userPhoto : "https://neuroflash.com/wp-content/uploads/2022/12/feature-image-ai-avatar-maker.png"
                    }}
                    className='w-20 h-20 rounded-[80px] mb-5'
                />
                <Text className='text-White font-poppins_medium text-size_16'>{userName}</Text>
            </View>
            {/* Button Screen */}
            <View className=' mx-5'>
                {ButtonText.map((button, index) => (
                    <View key={index} className='justify-between w-full mt-5'>
                        <ButtonProfile text={button.text} subtext={button.subtext} subtext_2={button.subtext_2} icon={button.icon} onPress={signOut} />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default UserAccountScreen;
