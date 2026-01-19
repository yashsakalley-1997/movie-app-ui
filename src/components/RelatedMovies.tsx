import type { Movie } from '@/utils/types'
import MovieCard from './MovieCard'
import { Loader2 } from 'lucide-react'

interface RelatedMoviesProps {
  movies: Movie[]
  onMovieSelect: (movie: Movie) => void
  isLoading: boolean
}

const RelatedMovies:React.FC<RelatedMoviesProps> = ({ movies, onMovieSelect, isLoading }) => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Similar Movies</h2>
        <p className="text-muted-foreground">You might also like these titles</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieSelect(movie)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default RelatedMovies;

