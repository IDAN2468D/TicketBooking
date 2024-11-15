import { Text, FlatList, View } from 'react-native';
import React from 'react';
import { usePersonDetails } from '../hooks/usePersonDetails';
import PersonDetailItem from '../components/PersonDetailItem';

const PersonDetailsScreen = ({ route }: any) => {
    const { personId } = route.params;
    const { loading, error, data, isExpanded, toggleBiography } = usePersonDetails(personId);

    if (loading) return <Text className="text-lg text-center text-gray-500 mt-12">Loading...</Text>;
    if (error) return <Text className="text-lg text-center text-red-500 mt-12">Error: {error}</Text>;
    if (!data) return <Text className="text-lg text-center text-red-500 mt-12">Data not available for this person.</Text>;

    return (
        <FlatList
            data={[data]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View className="flex-1 bg-gray-100 p-5 pb-12">
                    <PersonDetailItem
                        profilePath={item.profile_path}
                        name={item.name}
                        biography={item.biography}
                        birthday={item.birthday}
                        placeOfBirth={item.place_of_birth}
                        knownForDepartment={item.known_for_department}
                        isExpanded={isExpanded}
                        toggleBiography={toggleBiography}
                    />
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default PersonDetailsScreen;