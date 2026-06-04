import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSeasonalAnime } from '../services/anilist'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

function Seasonal() {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await getSeasonalAnime()
      setAnime(res.Page.media)
    } catch (error) {
      console.error('Error:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ padding: window.innerWidth < 768 ? '20px 12px' : '40px 32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: '800',
          borderLeft: '4px solid #e50914',
          paddingLeft: '12px',
          marginBottom: '8px'
        }}>
          {new Date().toLocaleString('default', { month: 'long' }).includes('Jan') || new Date().getMonth() < 3 ? 'Winter' : new Date().getMonth() < 6 ? 'Spring' : new Date().getMonth() < 9 ? 'Summer' : 'Fall'} {new Date().getFullYear()}
        </h1>
        <p style={{ color: '#666', fontSize: '14px', paddingLeft: '16px' }}>
          Currently airing this season
        </p>
      </div>

      {error && <ErrorState message="Failed to load seasonal anime" onRetry={fetchData} />}
      {loading && <SkeletonGrid count={25} />}

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px'
        }}>
          {anime.map(item => (
            <Link
              key={item.id}
              to={'/anime/' + item.id + '?source=anilist'}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  aspectRatio: '2/3',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={item.coverImage.extraLarge}
                  alt={item.title.english || item.title.romaji}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 25%, transparent 60%)'
                }} />
                {item.nextAiringEpisode && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#e50914',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '3px 7px',
                    borderRadius: '4px'
                  }}>
                    EP {item.nextAiringEpisode.episode}
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title.english || item.title.romaji}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.averageScore && (
                      <span style={{ color: '#e50914', fontSize: '11px', fontWeight: '700' }}>
                        ★ {(item.averageScore / 10).toFixed(1)}
                      </span>
                    )}
                    <span style={{ color: '#888', fontSize: '11px' }}>{item.format}</span>
                  </div>
                  {item.nextAiringEpisode && (
                    <p style={{ color: '#666', fontSize: '10px', marginTop: '4px' }}>
                      Ep {item.nextAiringEpisode.episode} in {Math.floor(item.nextAiringEpisode.timeUntilAiring / 86400)}d
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Seasonal