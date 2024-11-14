export const ApiKey = "01495650fdf4285e1dd890fb6717a935"

export const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
export const newPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${ApiKey}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ApiKey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}`;
export const searchMovies = (keyword: string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${keyword}`
}
export const movieDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}`
}
export const moviecastDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}`
}