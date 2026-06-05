# Baka — Anime Discovery Platform

A production-ready anime discovery platform built with React, Vite, AniList GraphQL API, and Jikan REST API. Users can explore trending, seasonal, and top-rated anime, view detailed anime information, watch trailers, browse genres, and manage personalized watchlists.

## Live Demo

🔗 https://baka-anime.vercel.app

## Features

* Trending, Seasonal, and Top-Rated Anime Discovery
* Advanced Anime Search with Debouncing
* Detailed Anime Information Pages
* Trailer Integration
* Recommendation System
* Genre-Based Browsing
* Persistent Watchlist Management
* Session-Based API Caching
* Skeleton Loading States
* Error Handling and Retry Mechanisms
* Fully Responsive Mobile/Desktop Experience

## Tech Stack

### Frontend

* React 18
* Vite
* JavaScript
* Tailwind CSS
* React Router

### APIs

* AniList GraphQL API
* Jikan REST API

### Storage

* SessionStorage (Caching)
* localStorage (Watchlist Persistence)

### Deployment

* Vercel

## Architecture

src/
├── components/
├── pages/
├── services/
├── App.jsx
└── main.jsx

* Components: Reusable UI building blocks
* Pages: Route-level screens
* Services: API communication layer
* React Router: Client-side routing

## Performance Optimizations

### Session-Based Caching

API responses are cached using sessionStorage to reduce redundant requests and improve navigation speed.

### Debounced Search

Search requests are delayed by 500ms to prevent unnecessary API calls while users are typing.

### Lazy Loading

Images are loaded only when needed to improve page performance.

## API Integration

### AniList GraphQL API

Used for:

* Trending Anime
* Seasonal Anime
* Top Rated Anime
* Anime Details
* Recommendations
* Search

### Jikan REST API

Used for:

* Character Information
* Genre Data
* Genre-Based Anime Discovery

## Challenges Solved

### API Rate Limiting (429 Errors)

Implemented session-based caching and optimized request workflows to minimize redundant API calls and improve user experience.

### Cross-Device Responsiveness

Designed layouts that adapt seamlessly across mobile and desktop devices.

## Future Enhancements

* User Authentication
* Cloud-Synced Watchlists
* Ratings and Reviews
* Advanced Search Filters
* Pagination
* Airing Schedule Tracking

## Author

Hrushikesh Kontham

GitHub: https://github.com/Hrushikesh-Kontham
