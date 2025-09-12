# 🎬 MovieHub - React Movies App

A beautiful, modern React application for browsing and discovering movies using the TMDb API. Built with TypeScript, TailwindCSS, and Framer Motion for smooth animations.

![MovieHub Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=MovieHub+Preview)

## ✨ Features

- 🔍 **Real-time Search** - Search movies with debounced input for optimal performance
- 🎭 **Multiple Categories** - Browse Trending, Popular, and Top Rated movies
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern UI/UX** - Dark theme with gradient accents and smooth animations
- ⚡ **Fast Performance** - Optimized with React hooks and efficient state management
- 🎬 **Movie Details** - Detailed modal with comprehensive movie information
- 🖼️ **Image Optimization** - Fallback images for missing posters
- ♿ **Accessibility** - Semantic HTML and proper alt texts

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDb API key (free at [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JosephAlzieb/React-Tutorial.git
   cd movie-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   To get your TMDb API key:
   - Go to [themoviedb.org](https://www.themoviedb.org/)
   - Create an account
   - Go to Settings > API
   - Request an API key
   - Copy your API key to the `.env.local` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the app in action!

## 🌐 Live Demo

You can try the app online here: [https://tmdb-moviesss.vercel.app/](https://tmdb-moviesss.vercel.app/)

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation and search bar
│   ├── MovieCard.tsx    # Individual movie card
│   ├── MovieGrid.tsx    # Grid layout for movies
│   └── MovieDetailsModal.tsx # Movie details modal
├── services/            # API services
│   └── movieAPI.ts      # TMDb API integration
├── types/               # TypeScript type definitions
│   └── movie.ts         # Movie-related types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and TailwindCSS
```

## 🎨 Design Features

- **Dark Theme** - Cinematic dark color scheme
- **Gradient Accents** - Beautiful gradient text and buttons
- **Card-based Layout** - Clean movie cards with hover effects
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Grid** - Adapts from 1 to 5 columns based on screen size
- **Glass Effects** - Modern backdrop blur effects

## 📝 TODO

- Add user ratings and reviews for movies
- Implement a personal favorites/watchlist feature
- Add advanced search and filter options (genre, year, rating, etc.)
- Integrate movie trailers (e.g., YouTube API)
- Show recommendations based on user activity
- Add user authentication for personalized features
- Support multiple languages (i18n)
- Add a toggle for dark/light mode
- Show streaming platform availability for each movie

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Search Functionality
- Debounced search input (500ms delay)
- Real-time results as you type
- Automatic fallback to trending when search is cleared

### Movie Categories
- **Trending** - Currently popular movies
- **Popular** - Most popular movies overall
- **Top Rated** - Highest rated movies

### Movie Details Modal
- Full movie information
- Production company logos
- Budget and revenue data
- Genre tags
- Beautiful backdrop images

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
To deploy this app to Vercel:

1. Register at [Vercel](https://vercel.com/).
2. Connect your GitHub account and import your repository.
3. Add your required environment variables (e.g., `VITE_TMDB_API_KEY`) in the Vercel dashboard under Project Settings > Environment Variables.
4. Click "Deploy" to build and launch your app.

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variable in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for the amazing movie database API
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using React, TypeScript, and TailwindCSS