import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchAniList } from '../services/anilist'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

function Search() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(false)

  const query = searchParams.get('q') || ''

  const fetchResults = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    setError(false)
    try {
      const res = await searchAniList(query)
      setResults(res.Page.media)
    } catch (error) {
      console.error('Error searching:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [query])

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
        {query ? `Results for "${query}"` : 'Browse Anime'}
      </h1>
      {/* Mobile search bar */}
      {window.innerWidth < 768 && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const val = e.target.querySelector('input').value.trim()
            if (val) window.location.href = '/search?q=' + val
          }}
          style={{ display: 'flex', gap: '0', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}
        >
          <input
            type="text"
            defaultValue={query}
            placeholder="Search anime..."
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', padding: '10px 16px', outline: 'none', fontSize: '14px' }}
          />
          <button type="submit" style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', padding: '10px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            Go
          </button>
        </form>
      )}

      {error && <ErrorState message="Search failed" onRetry={fetchResults} />}
      {loading && <SkeletonGrid count={12} />}

      {!loading && !error && searched && results.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ color: '#666', fontSize: '18px' }}>No results found for "{query}"</p>
        </div>
      )}

      {!loading && !error && !searched && (
        <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
          <p style={{ color: '#444', fontSize: '16px' }}>Use the search bar above to find anime</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
            {results.length} results found
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px'
          }}>
            {results.map(anime => (
              <Link
                key={anime.id}
                to={'/anime/' + anime.id + '?source=anilist'}
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
                    src={anime.coverImage.extraLarge}
                    alt={anime.title.english || anime.title.romaji}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 25%, transparent 60%)'
                  }} />
                  {anime.averageScore && (
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
                      ★ {(anime.averageScore / 10).toFixed(1)}
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
                      {anime.title.english || anime.title.romaji}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#aaa', fontSize: '11px' }}>
                        {anime.episodes ? anime.episodes + ' eps' : 'Ongoing'}
                      </span>
                      <span style={{ color: '#666', fontSize: '11px' }}>{anime.format}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search