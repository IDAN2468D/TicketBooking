import { useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { cinemas } from '../assets/data/cinemas'

export const useCinemaSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCinemas, setFilteredCinemas] = useState(cinemas);
    const mapRef = useRef<MapView>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = cinemas.filter((cinema) =>
            cinema.name.toLowerCase().includes(query.toLowerCase()) ||
            cinema.address.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCinemas(filtered);
    };

    const focusOnCinema = (location: { latitude: number; longitude: number }) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        }
    };

    return {
        searchQuery,
        setSearchQuery,
        filteredCinemas,
        mapRef,
        handleSearch,
        focusOnCinema,
    };
};