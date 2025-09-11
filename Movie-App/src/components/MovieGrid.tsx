import React from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  loading?: boolean;
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  onMovieClick, 
  loading = false, 
  title 
}) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {title && (
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-80 bg-dark-700"></div>
              <div className="p-4">
                <div className="h-4 bg-dark-700 rounded mb-2"></div>
                <div className="h-3 bg-dark-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {title && (
          <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        )}
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No movies found</div>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-6"
        >
          {title}
        </motion.h2>
      )}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MovieCard movie={movie} onClick={onMovieClick} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieGrid;
