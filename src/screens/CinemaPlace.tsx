import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useCinemaSearch } from '../hooks/useCinemaSearch';

const CinemaScreen = () => {
    const {
        searchQuery,
        filteredCinemas,
        mapRef,
        handleSearch,
        focusOnCinema
    } = useCinemaSearch();

    const renderCinemaItem = ({ item }: any) => (
        <TouchableOpacity
            className="bg-white p-4 my-2 rounded-lg shadow-md flex-row items-center"
            onPress={() => focusOnCinema(item.location)}
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-500">{item.address} - {item.distance}</Text>
            </View>
            <Image
                source={{ uri: item.image }}
                className="w-[100px] h-[100px] rounded-md ml-4"
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100 p-4">
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Text className="text-2xl font-bold text-center my-4">Nearby cinemas</Text>

            <TextInput
                className="bg-white rounded-lg p-3 mb-2 shadow-sm"
                placeholder="Search for a cinema by name or city..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <FlatList
                data={filteredCinemas}
                renderItem={renderCinemaItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <MapView
                ref={mapRef}
                className="h-72 mt-4 overflow-hidden"
                initialRegion={{
                    latitude: 32.0853,
                    longitude: 34.7818,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {filteredCinemas.map((cinema) => (
                    <Marker
                        key={cinema.id}
                        coordinate={cinema.location}
                        title={cinema.name}
                        description={cinema.address}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default CinemaScreen;