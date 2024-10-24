import { useState } from 'react';
import { searchMovies } from './../api/apicalls';

const useSearch = () => {
    const [searchList, setSearchList] = useState<any>([]);

    const searchMoviesFunction = async (name: string) => {
        try {
            const response = await fetch(searchMovies(name));
            const json = await response.json();
            setSearchList(json.results);
        } catch (error) {
            console.log("Something went wrong in searchMoviesFunction");
        }
    };

    return [searchList, searchMoviesFunction];

}

export default useSearch;
