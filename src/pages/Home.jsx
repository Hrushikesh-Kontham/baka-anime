import { useState, useEffect } from 'react'
import { getTrending, getPopularThisSeason, getAllTimePopular } from '../services/anilist'
import { Link } from 'react-router-dom'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

function Home() {
  const [trending, setTrending] = useState([])
  const [seasonal, setSeasonal] = useState([])
  const [popular, setPopular] = useState([])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, seasonalRes, popularRes] = await Promise.all([
          getTrending(),
          getPopularThisSeason(),
          getAllTimePopular(),
        ])
        setTrending(trendingRes.Page.media)
        setSeasonal(seasonalRes.Page.media)
        setPopular(popularRes.Page.media)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (trending.length === 0) return
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [trending])

  if (error) {
    return <ErrorState message="Failed to load anime" onRetry={() => { setError(false); setLoading(true) }} />
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: window.innerWidth < 768 ? '20px 12px' : '40px 32px' }}>
        <div style={{ height: '520px', backgroundColor: '#1a1a1a', borderRadius: '8px', marginBottom: '40px', background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
        <SkeletonGrid count={12} />
      </div>
    )
  }

  const featured = trending[featuredIndex]

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      {/* Hero Section */}
      {featured && (
        <div style={{ position: 'relative', width: '100%', height: window.innerWidth < 768 ? '380px' : '520px', overflow: 'hidden' }}>

          {/* Banner Image */}
                  <img
          key={featuredIndex}
          src={featured.bannerImage || featured.coverImage.extraLarge}
          alt={featured.title.english || featured.title.romaji}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.6)',
            animation: 'fadeIn 0.8s ease'
          }}
        />
          {/* <img
            key={featuredIndex}
            src={featured.bannerImage || featured.coverImage.extraLarge}
            alt={featured.title.english || featured.title.romaji}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.45)',
              transition: 'opacity 0.8s ease'
            }}
          /> */}

          {/* Gradients */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.1) 100%)'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0a0a0a 0%, transparent 50%)'
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: window.innerWidth < 768 ? '0 20px' : '0 48px',
            maxWidth: window.innerWidth < 768 ? '100%' : '620px'
          }}>
            <p style={{
              color: '#e50914',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Trending Now
            </p>
            <h1 style={{
              color: '#ffffff',
              fontSize: window.innerWidth < 768 ? '20px' : featured.title.english?.length > 30 || featured.title.romaji?.length > 30 ? '32px' : '46px',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '12px'
            }}>
              {featured.title.english || featured.title.romaji}
            </h1>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              {featured.averageScore && (
                <span style={{ color: '#f5c518', fontWeight: '700', fontSize: '14px' }}>
                  ★ {(featured.averageScore / 10).toFixed(1)}
                </span>
              )}
              <span style={{ color: '#aaa', fontSize: '13px' }}>
                {featured.episodes ? featured.episodes + ' Episodes' : 'Ongoing'}
              </span>
              <span style={{ color: '#aaa', fontSize: '13px' }}>
                {featured.format}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {featured.genres.slice(0, 3).map(genre => (
                <span key={genre} style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ccc',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {genre}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link
                to={'/anime/' + featured.id + '?source=anilist'}
                style={{
                  backgroundColor: '#e50914',
                  color: '#fff',
                  padding: '11px 26px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                  padding: window.innerWidth < 768 ? '8px 16px' : '11px 26px',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                }}
              >
                View Details
              </Link>
              <Link
                to="/top"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '11px 26px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                  padding: window.innerWidth < 768 ? '8px 16px' : '11px 26px',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                }}
              >
                Browse All
              </Link>
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '48px',
            display: 'flex',
            gap: '8px'
          }}>
            {trending.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIndex(i)}
                style={{
                  width: i === featuredIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: i === featuredIndex ? '#e50914' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>

        </div>
      )}

      {/* Content Sections */}
      <div style={{ padding: '40px 32px' }}>

        {/* Trending */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingRight: window.innerWidth < 768 ? '8px' : '0' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', borderLeft: '3px solid #e50914', paddingLeft: '12px' }}>
              Trending Now
            </h2>
            <Link to="/top" style={{ color: '#e50914', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2,1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {trending.slice(0, 18).map(anime => (
              <AniCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        {/* Popular This Season */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' , paddingRight: window.innerWidth < 768 ? '8px' : '0' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', borderLeft: '3px solid #e50914', paddingLeft: '12px' }}>
              Popular This Season
            </h2>
            <Link to="/seasonal" style={{ color: '#e50914', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2,1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {seasonal.slice(0, 18).map(anime => (
              <AniCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        {/* All Time Popular */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' , paddingRight: window.innerWidth < 768 ? '8px' : '0' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', borderLeft: '3px solid #e50914', paddingLeft: '12px' }}>
              All Time Popular
            </h2>
            <Link to="/top" style={{ color: '#e50914', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2,1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {popular.slice(0, 18).map(anime => (
              <AniCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

function AniCard({ anime }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={'/anime/' + anime.id + '?source=anilist'} style={{ textDecoration: 'none' }}>
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
        <img
          src={anime.coverImage.extraLarge}
          alt={anime.title.english || anime.title.romaji}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.7) 20%, transparent 60%)',
          transition: 'background 0.3s ease'
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
          padding: '12px',
          opacity: hovered ? 1 : 0.9,
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {anime.title.english || anime.title.romaji}
          </h3>
          <span style={{ color: '#aaa', fontSize: '11px' }}>
            {anime.episodes ? anime.episodes + ' eps' : 'Ongoing'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Home