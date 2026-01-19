import { useEffect, useState } from 'react'
import type { Movie } from '@/utils/types'
import { getRelatedMovies } from '@/services/api.service'
import { X, Star, Clock, Users, Briefcase } from 'lucide-react'
import RelatedMovies from './RelatedMovies'
import { returnMovieGenres } from '@/lib/helpers'

interface MovieDetailProps {
  movie: Movie
  onClose: () => void
  onRelatedMovieSelect: (movie: Movie) => void
}


const MovieDetail:React.FC<MovieDetailProps> = ({ movie,
  onClose,
  onRelatedMovieSelect, }) => {
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true)
      const related = await getRelatedMovies(
        movie.genre,
        movie.id
      )
      setRelatedMovies(related)
      setIsLoading(false)
    }

    fetchRelated()
  }, [movie.id, movie.genre])
  
  
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-96 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-background" />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative -mt-48 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="relative w-full ounded-lg overflow-hidden shadow-2xl">
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="object-cover"
                loading="lazy"
              />
            </div>
            
          </div>

          <div className="md:col-span-3 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              <p className="text-lg text-muted-foreground">{movie.releaseYear}</p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="text-xl font-bold text-foreground">{movie.rating}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>

              {movie.duration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration} min</span>
                </div>
              )}

              {movie.popularity && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>{Math.round(movie.popularity)} trending</span>
                </div>
              )}
            </div>

            {movie.genre.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {returnMovieGenres(movie.genre).map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {movie.director && (
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Director
                  </h3>
                  <p className="text-foreground">{movie.director}</p>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Cast
                  </h3>
                  <p className="text-foreground">{movie.cast.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedMovies.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <RelatedMovies
              movies={relatedMovies}
              onMovieSelect={onRelatedMovieSelect}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail;
