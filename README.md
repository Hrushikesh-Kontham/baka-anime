# Baka — Anime Discovery Platform

A production-ready anime discovery platform built with React, Vite, AniList GraphQL API, and Jikan REST API. Users can explore trending, seasonal, and top-rated anime, view detailed anime information, watch trailers, browse genres, and manage personalized watchlists.

## Live Demo

🔗 https://baka-anime.vercel.app

## Overview

Baka is a modern anime discovery platform that aggregates data from AniList GraphQL and Jikan REST APIs. It enables users to discover trending, seasonal, top-rated, and genre-based anime while delivering a fast and responsive experience through caching, debounced search, lazy loading, and reusable React architecture.

## Engineering Highlights

- Integrated both AniList GraphQL and Jikan REST APIs to leverage the strengths of each data source.
- Implemented session-based caching to reduce redundant API requests and mitigate rate-limiting issues.
- Built a reusable component architecture using React and React Router.
- Optimized search performance with debouncing and request management.
- Designed responsive layouts for mobile and desktop experiences.
- Added loading, error, and empty states for a resilient user experience.

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

```text
src/
├── components/     # Reusable UI components
├── pages/          # Route-level screens
├── services/       # API abstraction layer
├── App.jsx
└── main.jsx
```

### Design Decisions

- Components handle presentation and UI behavior.
- Services centralize API communication and caching logic.
- Pages orchestrate data fetching and compose reusable components.
- React Router manages client-side navigation.

## Data Flow

User Action
    ↓
React Component
    ↓
Service Layer
    ↓
Session Cache Check
    ↓
AniList / Jikan API
    ↓
Response
    ↓
State Update
    ↓
UI Re-render


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

**Hrushikesh Kontham**

GitHub: https://github.com/Hrushikesh-Kontham