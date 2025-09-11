import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Clock, Globe, DollarSign } from 'lucide-react';
import type { MovieDetails } from '../types/movie';
import { getImageUrl, formatDate, formatRating } from '../services/movieAPI';

interface MovieDetailsModalProps {
  movie: MovieDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ 
  movie, 
  isOpen, 
  onClose 
}) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 z-50 overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-dark-800 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-dark-900/80 backdrop-blur-sm rounded-full p-2 hover:bg-dark-700 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                {/* Hero Section */}
                <div className="relative h-96">
                  <img
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-movie.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                  
                  {/* Movie Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                    <div className="flex items-center space-x-4 text-white/80">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{formatRating(movie.vote_average)}</span>
                        <span className="text-sm">({movie.vote_count} votes)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(movie.release_date)}</span>
                      </div>
                      {movie.runtime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{movie.runtime} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overview */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Production Companies */}
                    {movie.production_companies && movie.production_companies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Production Companies</h4>
                        <div className="space-y-2">
                          {movie.production_companies.map((company) => (
                            <div key={company.id} className="flex items-center space-x-2">
                              {company.logo_path && (
                                <img
                                  src={getImageUrl(company.logo_path, 'w200')}
                                  alt={company.name}
                                  className="h-6 w-auto"
                                />
                              )}
                              <span className="text-gray-300">{company.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Budget & Revenue */}
                    {(movie.budget > 0 || movie.revenue > 0) && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Financial Info</h4>
                        <div className="space-y-2">
                          {movie.budget > 0 && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-400" />
                              <span className="text-gray-300">
                                Budget: ${movie.budget.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {movie.revenue > 0 && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-400" />
                              <span className="text-gray-300">
                                Revenue: ${movie.revenue.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tagline */}
                  {movie.tagline && (
                    <div className="mt-6 p-4 bg-dark-700/50 rounded-lg">
                      <p className="text-primary-400 italic text-center font-medium">
                        "{movie.tagline}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailsModal;
