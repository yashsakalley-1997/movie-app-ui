🎬 Movie Explorer (TMDB)

A responsive movie browsing app built with React + TypeScript + Vite, powered by TMDB APIs.
Users can explore trending movies of the week and search across movies, TV shows, and people.

✅ Setup Instructions

This is a TypeScript-based Vite application.

1) Clone the repository
git clone <your-repo-url>
cd <your-project-folder>

2) Install dependencies
npm install

3) Add Environment Variables

Create a .env file in the root folder.

Example:

VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY


✅ The .env values will be shared separately via email.

4) Start the development server
npm run dev


App will run at:

http://localhost:5173

5) Build for production
npm run build

6) Preview production build
npm run preview

🎥 Chosen Movie API

This project uses TMDB (The Movie Database) APIs.

✅ Home Page (Trending Movies of the Week)

Trending content for the current running week is fetched using:

/trending/all/week?page=<page_number>

✅ Search (Multi Search)

Search functionality is implemented using:

/search/multi?query=<search_text>

🏗 Architecture Overview

The application follows a clean and modular structure to keep the codebase readable and scalable.

Main Layers

Pages

Top-level screens (ex: Home, Movie Detail)

Responsible for layout + page-level logic

Components

Reusable UI blocks (MovieCard, MovieList, Filters, SearchInput, etc.)

Services

API layer responsible for calling TMDB endpoints

Keeps API logic separate from UI code

Utils / Helpers

Helper functions for formatting, filtering, and mapping values

Example: converting genre IDs into readable genre names

Types

TypeScript interfaces and types for consistent data handling

Data Flow (High Level)

UI Interaction → State Update → API Call (Service Layer) → Render Components

🎨 UI / Design

UI is built using Tailwind CSS

Used shadcn/ui components for:

Filters

Input fields

Buttons

Home Page UX

Displays Trending Movies for the current week

Card-based UI for a clean browsing experience

Search UX

Search uses 500ms debouncing

This prevents unnecessary API calls while the user is typing and improves performance

🔑 Key Design Decisions / Assumptions
✅ State Management

Used React’s built-in useState for state management

Reason: small app scope, keeps things simple and avoids introducing unnecessary complexity like Redux

✅ Debounced Search

Implemented 500ms debounce

Reason: better user experience and reduces API request load

✅ UI Component Choice

Tailwind + shadcn was used for faster development and consistent UI patterns

⚠️ Known Limitations

No caching implemented (repeated requests may refetch the same data)

/search/multi can return mixed entity types (movies, TV shows, and people)
which may require extra filtering depending on future improvements

Genre data from TMDB is ID-based and may require additional mapping logic for full coverage

Error handling and loading states can be further improved for edge cases

Pagination (if included) is basic and can be enhanced for a smoother browsing experience

✅ Tech Stack: React • TypeScript • Vite • Tailwind CSS • shadcn/ui • TMDB API
