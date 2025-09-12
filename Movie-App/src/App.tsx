import React, { useState, useEffect, useCallback } from 'react';
import type { Movie, MovieDetails } from './types/movie';
import { movieAPI } from './services/movieAPI';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MovieDetailsModal';
import GenreFilter from './components/GenreFilter';
import { FavoritesProvider, useFavorites } from './contexts/FavoritesContext';

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Main App Component (without context)
const AppContent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'trending' | 'popular' | 'top-rated' | 'search' | 'favorites'>('trending');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { favorites } = useFavorites();

  // Load movies based on current section
  const loadMovies = useCallback(async (section: string, query?: string) => {
    setLoading(true);
    try {
      let response;
      switch (section) {
        case 'trending':
          response = await movieAPI.getTrendingMovies();
          break;
        case 'popular':
          response = await movieAPI.getPopularMovies();
          break;
        case 'top-rated':
          response = await movieAPI.getTopRatedMovies();
          break;
        case 'search':
          if (query) {
            response = await movieAPI.searchMovies(query);
          } else {
            response = { results: [] };
          }
          break;
        case 'favorites':
          response = { results: favorites };
          break;
        default:
          response = await movieAPI.getTrendingMovies();
      }
      
      // Apply genre filter if selected
      let filteredMovies = response.results;
      if (selectedGenre && section !== 'favorites') {
        filteredMovies = response.results.filter(movie => 
          movie.genre_ids.includes(selectedGenre)
        );
      }
      
      setMovies(filteredMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [favorites, selectedGenre]);

  // Load movies when section changes
  useEffect(() => {
    if (currentSection === 'search') {
      if (debouncedSearchQuery.trim()) {
        loadMovies('search', debouncedSearchQuery);
      } else {
        setMovies([]);
      }
    } else if (currentSection === 'favorites') {
      setMovies(favorites);
      setLoading(false);
    } else {
      loadMovies(currentSection);
    }
  }, [currentSection, debouncedSearchQuery, loadMovies, favorites]);

  // Reload movies when genre filter changes
  useEffect(() => {
    if (currentSection !== 'favorites') {
      loadMovies(currentSection, debouncedSearchQuery);
    }
  }, [selectedGenre]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentSection('search');
    } else {
      setCurrentSection('trending');
    }
  };

  // Handle movie click
  const handleMovieClick = async (movie: Movie) => {
    try {
      const details = await movieAPI.getMovieDetails(movie.id);
      setSelectedMovie(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error loading movie details:', error);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // Get section title
  const getSectionTitle = () => {
    switch (currentSection) {
      case 'trending':
        return 'Trending Movies';
      case 'popular':
        return 'Popular Movies';
      case 'top-rated':
        return 'Top Rated Movies';
      case 'search':
        return searchQuery ? `Search Results for "${searchQuery}"` : 'Search Movies';
      case 'favorites':
        return `My Favorites (${favorites.length})`;
      default:
        return 'Movies';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="pt-4">
        {/* Section Navigation */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentSection('trending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentSection === 'trending'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setCurrentSection('popular')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentSection === 'popular'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setCurrentSection('top-rated')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentSection === 'top-rated'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                Top Rated
              </button>
              <button
                onClick={() => setCurrentSection('favorites')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentSection === 'favorites'
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                My Favorites ({favorites.length})
              </button>
            </div>
            
            {/* Genre Filter */}
            {currentSection !== 'favorites' && (
              <GenreFilter
                onGenreSelect={setSelectedGenre}
                selectedGenre={selectedGenre}
              />
            )}
          </div>
        </div>

        {/* Movies Grid */}
        <MovieGrid
          movies={movies}
          onMovieClick={handleMovieClick}
          loading={loading}
          title={getSectionTitle()}
        />

        {/* Empty State for Search */}
        {currentSection === 'search' && !searchQuery && !loading && (
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="text-gray-400 text-lg mb-4">
              Search for your favorite movies
            </div>
            <p className="text-gray-500">
              Use the search bar above to find movies by title
            </p>
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

// Main App Component with Provider
const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
};

export default App;
