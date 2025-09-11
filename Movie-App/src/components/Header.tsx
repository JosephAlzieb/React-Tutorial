import React from 'react';
import { Search, Film } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery }) => {
  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary-500" />
            <h1 className="text-2xl font-bold gradient-text">
              MovieHub
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#trending" className="text-gray-300 hover:text-white transition-colors">
              Trending
            </a>
            <a href="#popular" className="text-gray-300 hover:text-white transition-colors">
              Popular
            </a>
            <a href="#top-rated" className="text-gray-300 hover:text-white transition-colors">
              Top Rated
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
