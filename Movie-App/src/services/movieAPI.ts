import axios from 'axios';
import type { MovieResponse, MovieDetails, GenresResponse } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieAPI = {
  // Get trending movies
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'week'): Promise<MovieResponse> => {
    const response = await apiClient.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },

  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await apiClient.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await apiClient.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await apiClient.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const response = await apiClient.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  },

  // Get movie genres
  getGenres: async (): Promise<GenresResponse> => {
    const response = await apiClient.get('/genre/movie/list');
    return response.data;
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MovieResponse> => {
    const response = await apiClient.get('/discover/movie', {
      params: { 
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
      },
    });
    return response.data;
  },
};

// Helper function to get image URL
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to format rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};
