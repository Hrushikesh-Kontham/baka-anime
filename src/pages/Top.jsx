import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTrending, getAllTimePopular, getTopRated } from '../services/anilist'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

const TABS = ['Trending', 'Popular', 'Top Rated']

function Top() {
  const [activeTab, setActiveTab] = useState('Trending')
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        let res
        if (activeTab === 'Trending') {
          res = await getTrending()
        } else if (activeTab === 'Popular') {
          res = await getAllTimePopular()
        } else if (activeTab === 'Top Rated') {
          res = await getTopRated()
        }
        setAnime(res.Page.media)
      } catch (error) {
        console.error('Error:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [activeTab])

  return (
    <div style={{ padding: window.innerWidth < 768 ? '20px 12px' : '40px 32px' }}>
      <h1 style={{
        color: '#fff',
        fontSize: '28px',
        fontWeight: '800',
        borderLeft: '4px solid #e50914',
        paddingLeft: '12px',
        marginBottom: '32px'
      }}>
        Top Anime
      </h1>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '32px',
        borderBottom: '1px solid #222',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: activeTab === tab ? '#fff' : '#666',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '700' : '500',
              padding: '10px 20px',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #e50914' : '2px solid transparent',
              marginBottom: '-1px',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <ErrorState message="Failed to load anime" onRetry={() => setActiveTab(activeTab)} />}
      {loading && <SkeletonGrid count={25} />}

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px'
        }}>
          {anime.map((item, index) => (
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
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: index < 3 ? '#e50914' : 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 7px',
                  borderRadius: '4px',
                  zIndex: 1
                }}>
                  #{index + 1}
                </div>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Top