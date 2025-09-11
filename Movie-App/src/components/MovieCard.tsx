import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Eye, Heart } from 'lucide-react';
import type { Movie } from '../types/movie';
import { getImageUrl, formatDate, formatRating } from '../services/movieAPI';
import { useFavorites } from '../contexts/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    toggleFavorite(movie);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="movie-card cursor-pointer group"
      onClick={() => onClick(movie)}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.jpg';
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-white">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-dark-900/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-white">
            {formatRating(movie.vote_average)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm rounded-full p-2 hover:bg-dark-700 transition-colors group/fav"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorite(movie.id) 
                ? 'text-red-500 fill-current' 
                : 'text-white group-hover/fav:text-red-400'
            }`} 
          />
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {movie.overview}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
