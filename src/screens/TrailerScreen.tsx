import React from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import useTrailer from '../hooks/useTrailer'; // ייבוא של ה-hook

const { width, height } = Dimensions.get('window');

const TrailerModal = ({ route }: { route: any }) => {
    const { movieData } = route.params;

    const { state, closeTrailer } = useTrailer(movieData?.id);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={"black"} barStyle={"light-content"} />
            <Modal visible={state.isTrailerVisible} animationType="slide" onRequestClose={closeTrailer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                    {state.loading ? (
                        <ActivityIndicator size="large" color="#ff6347" />
                    ) : state.trailerKey ? (
                        <YoutubePlayer
                            width={width - 40}
                            height={height / 2}
                            play={true}
                            videoId={state.trailerKey}
                            onError={(e) => console.error('Error loading YouTube video:', e)}
                            onChangeState={(newState) => {
                                if (newState === 'ended') {
                                    closeTrailer();
                                }
                            }}
                        />
                    ) : (
                        <Text style={{ color: 'white', fontSize: 16 }}>{state.error || 'Trailer not available'}</Text>
                    )}
                    <TouchableOpacity onPress={closeTrailer} style={{ marginTop: 20, padding: 10, backgroundColor: '#ff6347', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default TrailerModal;
