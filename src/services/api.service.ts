import apiClient from "@/configs/axios";
import type { Movie, FilterOptions, MovieResult } from "@/utils/types";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

const mapTmdbMovie = (tmdbMovie: any): Movie => ({
  id: tmdbMovie.id.toString(),
  title: tmdbMovie.title || tmdbMovie.name,
  poster: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}${tmdbMovie.poster_path}` : '/placeholder.png',
  backdrop: tmdbMovie.backdrop_path ? `${IMAGE_BASE_URL}${tmdbMovie.backdrop_path}` : undefined,
  releaseYear: new Date(tmdbMovie.release_date || tmdbMovie.first_air_date).getFullYear(),
  rating: Math.round(tmdbMovie.vote_average * 10) / 10,
  genre: tmdbMovie.genre_ids ?? [],
  overview: tmdbMovie.overview,
  popularity: tmdbMovie.popularity,
})


export const getPopularMovies = async (pageNumber:number): Promise<MovieResult> => {
    try{
        const { data } = await apiClient.get(`/trending/all/week?page=${pageNumber}`);
        const movies = data.results.filter((item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path)
        .map(mapTmdbMovie).sort((a:Movie,b:Movie)=>b?.releaseYear - a?.releaseYear);
        return {
            movies,
            hasMore: data.page < data.total_pages,
            total: data.total_results,
        }
    }
    catch(err:any){
        throw err;
    }
}


export const searchMovies = async (query: string, page: number, filters?: FilterOptions): Promise<MovieResult> => {
    try{
        const params = new URLSearchParams({
            query: query,
            page: page.toString()
        })

        if (filters?.year) {
            params.append('primary_release_year', filters.year)
        }
        const { data } = await apiClient.get(`/search/multi?${params}`);

        const movies = data.results.filter((item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path).map(mapTmdbMovie);

        return {
            movies,
            hasMore: data.page < data.total_pages,
            total: data.total_results,
        }
    }
    catch(err:any){
        throw err;
    }
}

export const getRelatedMovies = async (genreIds: number[], movieId: string): Promise<Movie[]> => {
    try{
        const params = new URLSearchParams({
            with_genres: genreIds.join(','),
            sort_by: 'popularity.desc',
            page: '1',
        })
        const { data } = await apiClient.get(`/discover/movie?${params}`);
        const movies = data.results.filter((item: any) => (item?.id?.toString() !== movieId)).map(mapTmdbMovie).slice(0,6);
        return movies;
    }
    catch(err){
        console.error('Related movies error:', err)
        throw err
    }
}
