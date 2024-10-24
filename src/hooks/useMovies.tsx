import { useState, useEffect } from 'react';
import { upcomingMovies, newPlayingMovies, popularMovies, baseImagePath } from '../api/apicalls';

const useMoviesData = (navigation: any) => {
    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
    const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let [nowPlayingResponse, popularResponse, upcomingResponse] = await Promise.all([
                    fetch(newPlayingMovies),
                    fetch(popularMovies),
                    fetch(upcomingMovies),
                ]);

                let [nowPlayingJson, popularJson, upcomingJson] = await Promise.all([
                    nowPlayingResponse.json(),
                    popularResponse.json(),
                    upcomingResponse.json(),
                ]);
                setNowPlayingMoviesList([{ id: "dummy1" }, ...nowPlayingJson.results, { id: "dummy2" }]);
                setPopularMoviesList(popularJson.results);
                setUpcomingMoviesList(upcomingJson.results);
            } catch (error) {
                console.log("Something went wrong in useMoviesData Hook", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const genres: any = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentry',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystry',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
    };

    const searchMoviesFunction = () => {
        navigation.navigate("Search")
    }

    return {
        baseImagePath,
        searchMoviesFunction,
        nowPlayingMoviesList,
        popularMoviesList,
        upcomingMoviesList,
        loading,
        genres
    };
};

export default useMoviesData;