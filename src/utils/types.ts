export interface Movie {
  id: string
  title: string
  poster: string
  backdrop?: string
  releaseYear: number
  rating: number
  genre: number[]
  overview: string
  duration?: number
  director?: string
  cast?: string[]
  popularity?: number
}

export interface FilterOptions {
  genre: string
  year: string
  rating: string
}

export interface MovieResult {
  movies: Movie[]
  hasMore: boolean
  total: number
}
