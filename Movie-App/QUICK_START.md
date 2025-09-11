# 🚀 Quick Setup Guide

## Step 1: Get Your TMDb API Key
1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Go to **Settings** → **API**
4. Request an API key (it's completely free!)
5. Copy your API key

## Step 2: Create Environment File
Create a file named `.env.local` in the root directory with:

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your real API key.

## Step 3: Start the App
```bash
npm run dev
```

## Step 4: Open Your Browser
Navigate to `http://localhost:5173`

## 🎉 You're Done!

Your movie app should now be running with:
- ✅ Beautiful dark theme
- ✅ Real movie data from TMDb
- ✅ Search functionality
- ✅ Favorites system
- ✅ Genre filtering
- ✅ Responsive design
- ✅ Smooth animations

## 🎬 Features to Try:
1. **Search** for your favorite movies
2. **Click** on movie cards to see details
3. **Add** movies to favorites (heart icon)
4. **Filter** by genre using the dropdown
5. **Browse** different categories (Trending, Popular, Top Rated)

Enjoy your new movie app! 🍿
