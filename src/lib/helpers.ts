import { GENRES } from "@/utils/constants";
import type { FilterOptions, Movie } from "@/utils/types";

export const filterMovies = (movies: Movie[], filters: FilterOptions): Movie[] => {
  const ratingFilter = filters?.rating; 
  const genreFilter = filters?.genre;   
  const yearFilter = filters?.year;

  let filteredMovies: Movie[] = movies;

  if (ratingFilter) {
    const minRating = Number(ratingFilter);
    filteredMovies = filteredMovies.filter(
      (movie) => (movie.rating ?? 0) >= minRating
    );
  }

  if (genreFilter) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre?.includes(Number(genreFilter))
    );
  }

  if(yearFilter){
    const year = Number(yearFilter)
    filteredMovies = filteredMovies.filter((movie)=>movie?.releaseYear === year)
  }

  return filteredMovies;
};

export const returnMovieGenres = (genreIds: number[]) : string[] => {
    return genreIds.map((id) => GENRES.find((g) => Number(g.value) === Number(id))?.label)
    .filter((label): label is string => Boolean(label));
}