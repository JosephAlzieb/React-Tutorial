import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { movieAPI } from '../services/movieAPI';
import type { Genre } from '../types/movie';

interface GenreFilterProps {
  onGenreSelect: (genreId: number | null) => void;
  selectedGenre: number | null;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onGenreSelect, selectedGenre }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await movieAPI.getGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };

    loadGenres();
  }, []);

  const handleGenreClick = (genreId: number) => {
    if (selectedGenre === genreId) {
      onGenreSelect(null);
    } else {
      onGenreSelect(genreId);
    }
  };

  const selectedGenreName = genres.find(genre => genre.id === selectedGenre)?.name;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-dark-800 text-gray-300 rounded-lg hover:bg-dark-700 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>{selectedGenreName || 'Filter by Genre'}</span>
        {selectedGenre && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGenreSelect(null);
            }}
            className="ml-2 p-1 hover:bg-dark-600 rounded"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-dark-800 border border-dark-600 rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-sm text-gray-400 mb-2 px-2">Select Genre</div>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedGenre === genre.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-dark-700'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default GenreFilter;
