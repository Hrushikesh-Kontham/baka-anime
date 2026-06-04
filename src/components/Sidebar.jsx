import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAnimeGenres } from '../services/api'

const mainLinks = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    )
  },
  {
    path: '/search',
    label: 'Browse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    )
  },
  {
    path: '/seasonal',
    label: 'Seasonal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
      </svg>
    )
  },
  {
    path: '/top',
    label: 'Top Anime',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    )
  },
  {
    path: '/watchList',
    label: 'Watchlist',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    )
  },
]

function Sidebar({ isOpen, isMobile }) {
  const [genres, setGenres] = useState([])
  const [tooltip, setTooltip] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getAnimeGenres()
        setGenres(res.data.data.slice(0, 15))
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    fetchGenres()
  }, [])

  const sidebarWidth = isMobile ? '240px' : isOpen ? '240px' : '60px'
  const sidebarLeft = isMobile && !isOpen ? '-240px' : '0px'

  return (
    <aside style={{
      position: 'fixed',
      left: sidebarLeft,
      top: '60px',
      height: 'calc(100vh - 60px)',
      width: sidebarWidth,
      backgroundColor: '#141414',
      transition: 'left 0.3s ease, width 0.3s ease',
      zIndex: isMobile ? 35 : 10,
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>

      {/* Main Navigation */}
      <div style={{ paddingTop: '0px', paddingBottom: '16px' }}>
        {mainLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <div key={link.path} style={{ position: 'relative' }}>
              <Link
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 18px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#e50914' : 'transparent',
                  color: isActive ? '#fff' : '#888',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#1f1f1f'
                    e.currentTarget.style.color = '#fff'
                  }
                  if (!isOpen && !isMobile) setTooltip(link.path)
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#888'
                  }
                  setTooltip(null)
                }}
              >
                <span style={{ minWidth: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}>
                  {link.icon}
                </span>
                {(isOpen || isMobile) && (
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    {link.label}
                  </span>
                )}
              </Link>

              {/* Tooltip — desktop only */}
              {!isOpen && !isMobile && tooltip === link.path && (
                <div style={{
                  position: 'absolute',
                  left: '64px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1f1f1f',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  zIndex: 100,
                  border: '1px solid #333',
                  pointerEvents: 'none'
                }}>
                  {link.label}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Genres */}
      {(isOpen || isMobile) && genres.length > 0 && (
        <div style={{ borderTop: '1px solid #222', paddingTop: '16px', paddingBottom: '16px' }}>
          <p style={{
            color: '#444',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '0 18px',
            marginBottom: '8px'
          }}>
            Genres
          </p>
          {genres.map((genre) => (
            <Link
              key={genre.mal_id}
              to={'/genre/' + genre.mal_id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 18px',
                textDecoration: 'none',
                color: '#888',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1f1f1f'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#888'
              }}
            >
              <span>{genre.name}</span>
              <span style={{ color: '#444', fontSize: '11px' }}>
                {genre.count?.toLocaleString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  )
}

export default Sidebar