import { useEffect, useState } from 'react';
import { movieDetails, moviecastDetails } from '../api/apicalls';
import { ScrollView, View } from 'react-native';

const useDetails = (route: any) => {
    const [movieData, setMovieData] = useState<any>(undefined);
    const [movieCastData, setMovieCastData] = useState<any>(undefined);

    useEffect(() => {
        fetch(movieDetails(route.params.movieid))
            .then(response => response.json())
            .then(setMovieData)
            .then(() => fetch(moviecastDetails(route.params.movieid)))
            .then(response => response.json())
            .then(setMovieCastData)
            .catch(error => console.log('Error in fetching data', error));
    }, [route.params.movieid]);


    return { movieData, movieCastData };
};

export default useDetails;