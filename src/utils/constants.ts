export const GENRES = [
  { value: "all", label: "All Genres" },
  { value: "28", label: "Action" },
  { value: "12", label: "Adventure" },
  { value: "16", label: "Animation" },
  { value: "35", label: "Comedy" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentary" },
  { value: "18", label: "Drama" },
  { value: "10751", label: "Family" },
  { value: "14", label: "Fantasy" },
  { value: "36", label: "History" },
  { value: "27", label: "Horror" },
  { value: "10402", label: "Music" },
  { value: "9648", label: "Mystery" },
  { value: "10749", label: "Romance" },
  { value: "878", label: "Science Fiction" },
  { value: "10770", label: "TV Movie" },
  { value: "53", label: "Thriller" },
  { value: "10752", label: "War" },
  { value: "37", label: "Western" },
];


export const RATINGS = [
  { value: 'all-ratings', label: 'Any Rating' },
  { value: '9', label: '9.0+' },
  { value: '8', label: '8.0+' },
  { value: '7', label: '7.0+' },
  { value: '6', label: '6.0+' },
  { value: '5', label: '5.0+' },
]

export const YEARS = [
  { value: 'all-years', label: 'Any Year' },
  ...Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { value: year.toString(), label: year.toString() }
  }),
]
