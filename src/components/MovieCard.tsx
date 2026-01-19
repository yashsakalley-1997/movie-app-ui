import { returnMovieGenres } from '@/lib/helpers'
import type { Movie } from '@/utils/types'
import { Star } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}


const MovieCard:React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 h-full flex flex-col"
    >
      <div className="relative w-full aspect-2/3 overflow-hidden bg-muted">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-accent/90 backdrop-blur rounded-full p-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Star className="w-4 h-4 fill-accent-foreground text-accent-foreground" />
          <span className="text-sm font-bold text-accent-foreground">{movie.rating}</span>
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-semibold transition-colors">
            View Details
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-accent transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{movie.releaseYear}</p>
        </div>
        {movie.genre.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {returnMovieGenres(movie.genre).slice(0, 2).map((g, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full line-clamp-1"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard;