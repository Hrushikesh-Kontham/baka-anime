import { Link } from 'react-router-dom'
import { useState } from 'react'

function AnimeCard({ anime }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
          cursor: 'pointer',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          aspectRatio: '2/3'
        }}
      >
        {/* Image */}
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Gradient overlay - always present, stronger on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.7) 20%, transparent 60%)',
          transition: 'background 0.3s ease'
        }} />

        {/* Score badge */}
        {anime.score && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: '#e50914',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            padding: '3px 7px',
            borderRadius: '4px'
          }}>
            ⭐ {anime.score}
          </div>
        )}

        {/* Info at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px',
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          opacity: hovered ? 1 : 0.85,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {anime.title}
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#e50914', fontSize: '12px', fontWeight: '600' }}>
              {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
            </span>
            <span style={{ color: '#aaa', fontSize: '11px' }}>
              {anime.type || 'TV'}
            </span>
          </div>
          {hovered && anime.genres && anime.genres.length > 0 && (
            <p style={{
              color: '#888',
              fontSize: '11px',
              marginTop: '4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {anime.genres.slice(0, 2).map(g => g.name).join(' · ')}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard