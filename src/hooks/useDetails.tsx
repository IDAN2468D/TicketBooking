import { useEffect, useState } from 'react';
import { movieDetails, moviecastDetails } from '../api/apicalls';

const useDetails = (route: any) => {
    const [movieData, setMovieData] = useState<any>(undefined);
    const [movieCastData, setMovieCastData] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { movieid } = route.params || {}; // Destructure safely

        if (!movieid) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const movieUrl = movieDetails(movieid);
                const castUrl = moviecastDetails(movieid);
                console.log('Fetching movie details from URL:', movieUrl);
                console.log('Fetching cast details from URL:', castUrl);

                // Fetch movie data
                const movieResponse = await fetch(movieUrl);
                if (!movieResponse.ok) {
                    throw new Error('Failed to fetch movie data');
                }
                const movieData = await movieResponse.json();
                console.log('Fetched movie data:', movieData);
                setMovieData(movieData);

                // Fetch cast data
                const castResponse = await fetch(castUrl);
                if (!castResponse.ok) {
                    throw new Error('Failed to fetch cast data');
                }
                const castData = await castResponse.json();
                console.log('Fetched cast data:', castData);
                setMovieCastData(castData);

            } catch (error) {
                setError('Error fetching data');
                console.log('Error in fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [route.params]);

    // Log final data states after each update
    useEffect(() => {
        console.log('Updated movieData:', movieData);
        console.log('Updated movieCastData:', movieCastData);
    }, [movieData, movieCastData]);

    return { movieData, movieCastData, loading, error };
};

export default useDetails;
