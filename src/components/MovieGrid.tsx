import { useEffect, useRef } from 'react'
import MovieCard from './MovieCard'
import type { Movie } from '@/utils/types'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MovieGridProps {
  movies: Movie[]
  isLoading: boolean
  onMovieSelect: (movie: Movie) => void
  onLoadMore: () => void
  hasMore: boolean
  searchQuery: string
  error?: string | null
  onRetry?: () => void
}

const MovieGrid:React.FC<MovieGridProps> = ({  movies,
  isLoading,
  onMovieSelect,
  onLoadMore,
  hasMore,
  searchQuery,
  error,
  onRetry}) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore, searchQuery])

  if (movies.length === 0 && !isLoading && !error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">No Results Found</h2>
          <p className="text-muted-foreground max-w-md">
            Try searching with different keywords or adjust your filters
          </p>
        </div>
      </main>
    )
  }

  if (error && movies.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full mx-auto flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-destructive mb-2">Failed</h2>
            <p className="text-muted-foreground max-w-md mb-4">{error}</p>
          </div>
          <Button
            onClick={onRetry}
            disabled={isLoading}
            className="bg-accent hover:bg-accent/90"
          >
            {isLoading ? 'Retrying...' : 'Try Again'}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {movies.length > 0 && searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Results for "{searchQuery}"
            </h2>
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onMovieSelect(movie)}
            />
          ))}
        </div>

        <div ref={observerTarget} className="mt-12 flex justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <p className="text-muted-foreground">Loading more movies...</p>
            </div>
          )}
          {!hasMore && movies.length > 0 && !isLoading && (
            <p className="text-muted-foreground">No more movies to load</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default MovieGrid;
