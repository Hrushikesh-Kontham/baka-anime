import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function WatchList() {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]')
    setWatchlist(saved)
  }, [])

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((anime) => anime.mal_id !== id)
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  if (watchlist.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '64px', marginBottom: '16px' }}>📭</p>
        <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Your watchlist is empty
        </h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          Add anime from the detail page to track them here
        </p>
        <Link to="/" style={{
          backgroundColor: '#e50914',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '14px'
        }}>
          Browse Anime
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: window.innerWidth < 768 ? '20px 12px' : '40px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: '800',
          borderLeft: '4px solid #e50914',
          paddingLeft: '12px'
        }}>
          My Watchlist
        </h1>
        <span style={{ color: '#666', fontSize: '14px' }}>
          {watchlist.length} {watchlist.length === 1 ? 'anime' : 'animes'}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px'
      }}>
        {watchlist.map((anime) => (
          <div key={anime.mal_id} style={{ position: 'relative' }}>
            <Link to={'/anime/' + anime.mal_id} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                aspectRatio: '2/3',
                cursor: 'pointer'
              }}>
                <img
                  src={anime.images?.jpg?.large_image_url}
                  alt={anime.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '4px'
                  }}>
                    {anime.title}
                  </h3>
                  {anime.score && (
                    <span style={{ color: '#e50914', fontSize: '12px', fontWeight: '600' }}>
                      ★ {anime.score}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Remove Button */}
            <button
              onClick={() => removeFromWatchlist(anime.mal_id)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e50914'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WatchList