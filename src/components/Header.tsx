import { useEffect } from "react"

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterOptions } from "@/utils/types"
import { GENRES, RATINGS, YEARS } from "@/utils/constants"

interface HeaderProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterOptions) => void
  filters: FilterOptions
  searchQuery: string
  setSearchQuery: (query: string) => void
}


const Header: React.FC<HeaderProps> = ({
  onSearch,
  onFilterChange,
  filters,
  searchQuery,
  setSearchQuery,
}) => {
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const normalizedValue = 
      (value === 'all' || value === 'all-years' || value === 'all-ratings') 
        ? '' 
        : value
    const newFilters = { ...filters, [key]: normalizedValue }
    onFilterChange(newFilters)
    setShowFilters(false)
  }

  useEffect(()=>{
    if(!searchQuery){
      return
    }
      const timer = setTimeout(()=>{
          onSearch(searchQuery)
      },500)
      return () => {
          clearTimeout(timer)
      }
  },[searchQuery])

  return (
    <header className="sticky top-0 z-40 bg-linear-to-b from-secondary to-secondary/50 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold">🎬</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">MovieVerse</h1>
        </div>

        <div className="relative flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border hover:border-primary/50 focus:border-primary transition-colors"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="border-border hover:bg-muted"
          >
            { showFilters ? <X className="w-5 h-5"/> : <Filter className="w-5 h-5" /> }
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-4 bg-card rounded-lg border border-border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Genre</label>
              <Select value={filters.genre || 'all'} onValueChange={(v) => handleFilterChange('genre', v)}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {GENRES.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Release Year</label>
              <Select value={filters.year || 'all-years'} onValueChange={(v) => handleFilterChange('year', v)}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Rating</label>
              <Select value={filters.rating || 'all-ratings'} onValueChange={(v) => handleFilterChange('rating', v)}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {RATINGS.map((rating) => (
                    <SelectItem key={rating.value} value={rating.value}>
                      {rating.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
