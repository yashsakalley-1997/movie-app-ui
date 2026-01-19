import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/Header';
import MovieGrid from '@/components/MovieGrid';
import MovieDetail from '@/components/MovieDetails';
import type { Movie, FilterOptions } from '@/utils/types'
import { searchMovies, getPopularMovies } from '@/services/api.service'
import { filterMovies } from '@/lib/helpers';


const LandingPage:React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    genre: '',
    year: '',
    rating: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchPopularMovies = useCallback(async (page: number) => {
    setIsLoading(true)
    setError(null);
    try{
        const data = await getPopularMovies(page);
        if (page === 1) {
            setMovies(filterMovies(data.movies,filters))
        } else {
            setMovies((prev) => filterMovies([...prev, ...data.movies],filters))
        }
        setPage(page)
        setHasMore(data.hasMore)
        setError(null);
    }
    catch (error) {
      console.error('Search failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch movies'
      setError(errorMessage)
      if (page === 1) {
        setMovies([])
      }
    } finally {
      setIsLoading(false)
    }
  },[filters])

  const handleSearch = useCallback(async (query: string, newPage = 1) => {
    if (!query.trim()) {
      setMovies([])
      setPage(1)
      setHasMore(true)
      setError(null)
      return
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query, newPage, filters)
      if (newPage === 1) {
        setMovies(filterMovies(result.movies,filters))
      } else {
        setMovies((prev) => filterMovies([...prev, ...result.movies],filters))
      }
      setPage(newPage)
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('Search failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch movies'
      setError(errorMessage)
      if (newPage === 1) {
        setMovies([])
      }
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const handleFilterChange = useCallback(
    (newFilters: FilterOptions) => {
      setFilters(newFilters)
      setPage(1)
    },
    [searchQuery, handleSearch, fetchPopularMovies]
  )

  const handleLoadMore = useCallback(() => {
    if(!isLoading && hasMore && !searchQuery){
        fetchPopularMovies(page+1)
    }
    else if(!isLoading && hasMore && searchQuery){
        handleSearch(searchQuery, page + 1)
    }
  }, [isLoading, hasMore, searchQuery, page, handleSearch, fetchPopularMovies])

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseDetail = () => {
    setSelectedMovie(null)
  }

  useEffect(()=>{
    if(!searchQuery){
      fetchPopularMovies(1)
    }
  },[searchQuery])

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, 1)
    } else {
      fetchPopularMovies(1)
    }
  }, [filters])

  const handleRetry = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery, page)
    }
    else{
      fetchPopularMovies(page)
    }
  }



  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {selectedMovie ? (
        <MovieDetail
          movie={selectedMovie}
          onClose={handleCloseDetail}
          onRelatedMovieSelect={handleMovieSelect}
        />
      ) : (
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            onMovieSelect={handleMovieSelect}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            searchQuery={searchQuery}
            error={error}
            onRetry={handleRetry}
          />
      )}
      
    </div>
  )
};

export default LandingPage;
