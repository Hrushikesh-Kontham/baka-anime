import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getAnimeById, getAnimeCharacters } from '../services/api'
import { getAniListAnimeById } from '../services/anilist'
import ErrorState from '../components/ErrorState'

function AnimeDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const source = searchParams.get('source')
  const [anime, setAnime] = useState(null)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [watchlistMsg, setWatchlistMsg] = useState('')

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true)
      try {
        if (source === 'anilist') {
          const res = await getAniListAnimeById(parseInt(id))
          const data = res.Media
          setAnime({
            mal_id: data.id,
            title: data.title.english || data.title.romaji,
            title_japanese: data.title.native,
            images: { jpg: { large_image_url: data.coverImage.extraLarge } },
            bannerImage: data.bannerImage,
            score: data.averageScore ? (data.averageScore / 10).toFixed(1) : null,
            episodes: data.episodes,
            status: data.status,
            type: data.format,
            year: data.seasonYear,
            synopsis: data.description ? data.description.replace(/<[^>]*>/g, '') : '',
            genres: data.genres.map((g, i) => ({ mal_id: i, name: g })),
            trailer: data.trailer && data.trailer.site === 'youtube' ? { embed_url: 'https://www.youtube.com/embed/' + data.trailer.id } : null,
            studios: data.studios ? data.studios.nodes.filter(s => s.isAnimationStudio).map(s => s.name) : [],
            relations: data.relations ? data.relations.edges : [],
            recommendations: data.recommendations ? data.recommendations.nodes.filter(n => n.mediaRecommendation).map(n => n.mediaRecommendation) : [],
            nextAiring: data.nextAiringEpisode
          })
          
        } else {
          const animeRes = await getAnimeById(id)
          const data = animeRes.data.data
          setAnime({
            mal_id: data.mal_id,
            title: data.title,
            title_japanese: data.title_japanese,
            images: data.images,
            bannerImage: null,
            score: data.score,
            episodes: data.episodes,
            status: data.status,
            type: data.type,
            year: data.year,
            synopsis: data.synopsis,
            genres: data.genres,
            trailer: data.trailer && data.trailer.embed_url ? { embed_url: data.trailer.embed_url } : null,
            studios: data.studios ? data.studios.map(s => s.name) : [],
            relations: [],
            nextAiring: null
          })
          await new Promise(resolve => setTimeout(resolve, 600))
          const charRes = await getAnimeCharacters(id)
          setCharacters(charRes.data.data.slice(0, 12))
        }
      } catch (error) {
        console.error('Error:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchAnime()
  }, [id, source])

  const handleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const exists = watchlist.find(item => item.mal_id === anime.mal_id)
    if (exists) {
      setWatchlistMsg('Already in your watchlist')
    } else {
      watchlist.push(anime)
      localStorage.setItem('watchlist', JSON.stringify(watchlist))
      setWatchlistMsg('Added to watchlist!')
    }
    setTimeout(() => setWatchlistMsg(''), 3000)
  }
  if (error) {
    return <ErrorState message="Failed to load anime details" onRetry={() => { setError(false); setLoading(true) }} />
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0a0a0a' }}>
        <p style={{ color: '#fff', fontSize: '24px' }}>Loading...</p>
      </div>
    )
  }

  if (!anime) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: '#fff', fontSize: '24px' }}>Anime not found</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ position: 'relative', width: '100%', height: window.innerWidth < 768 ? '250px' : '420px', overflow: 'hidden' }}>
        <img
          src={anime.bannerImage || anime.images.jpg.large_image_url}
          alt={anime.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: anime.bannerImage ? 'brightness(0.4)' : 'blur(3px) brightness(0.3)', transform: 'scale(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }} />
      </div>

      <div style={{ maxWidth: '1100px', margin: window.innerWidth < 768 ? '-80px auto 0' : '-180px auto 0', padding:  window.innerWidth < 768 ? '0 16px 40px' : '0 32px 60px', position: 'relative', zIndex: 1 }}>
      <button
      onClick={() => window.history.back()}
      style={{
        background: 'none',
        border: '1px solid #333',
        color: '#aaa',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#e50914'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
    >
      ← Back
    </button>
        <div style={{ display: window.innerWidth < 768 ? 'block' : 'flex', gap: '32px', marginBottom: '48px' }}>
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            style={{ width: window.innerWidth < 768 ? '160px' : '260px', height: window.innerWidth < 768 ? '240px' : '380px', marginBottom: window.innerWidth < 768 ? '20px' : '0', objectFit: 'cover', borderRadius: '12px', flexShrink: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
          />
          <div style={{ flex: 1, paddingTop: window.innerWidth < 768 ? '20px' : '80px' }}>
            <h1 style={{ color: '#fff', fontSize: window.innerWidth < 768 ? '24px' : '40px', fontWeight: '900', marginBottom: '6px', lineHeight: '1.1' }}>{anime.title}</h1>
            {anime.title_japanese && <p style={{ color: '#666', fontSize: '15px', marginBottom: '16px' }}>{anime.title_japanese}</p>}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {anime.score && <span style={{ backgroundColor: '#e50914', color: '#fff', padding: '5px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '700' }}>★ {anime.score}</span>}
              {[anime.episodes ? anime.episodes + ' Episodes' : 'Ongoing', anime.status, anime.type, anime.year].filter(Boolean).map((stat, i) => (
                <span key={i} style={{ backgroundColor: '#1a1a1a', color: '#aaa', padding: '5px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid #2a2a2a' }}>{stat}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {anime.genres.map(genre => (
                <span key={genre.mal_id} style={{ backgroundColor: 'rgba(229,9,20,0.15)', color: '#e50914', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(229,9,20,0.3)' }}>{genre.name}</span>
              ))}
            </div>
            {anime.studios && anime.studios.length > 0 && (
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>Studio: <span style={{ color: '#aaa' }}>{anime.studios.join(', ')}</span></p>
            )}
            {anime.nextAiring && (
              <p style={{ color: '#e50914', fontSize: '13px', marginBottom: '20px' }}>
                Next Episode {anime.nextAiring.episode} in {Math.floor(anime.nextAiring.timeUntilAiring / 86400)}d {Math.floor((anime.nextAiring.timeUntilAiring % 86400) / 3600)}h
              </p>
            )}
            <button onClick={handleWatchlist} style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>
              + Add to Watchlist
            </button>
            {watchlistMsg && <p style={{ color: '#aaa', fontSize: '13px', marginTop: '8px' }}>{watchlistMsg}</p>}
          </div>
        </div>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', borderLeft: '4px solid #e50914', paddingLeft: '12px', marginBottom: '16px' }}>Synopsis</h2>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.8', maxWidth: '800px' }}>{anime.synopsis}</p>
        </section>

        {anime.trailer && anime.trailer.embed_url && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', borderLeft: '4px solid #e50914', paddingLeft: '12px', marginBottom: '16px' }}>Trailer</h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, maxWidth: '800px', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe src={anime.trailer.embed_url} title={anime.title} allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} />
            </div>
          </section>
        )}

        {anime.relations && anime.relations.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', borderLeft: '4px solid #e50914', paddingLeft: '12px', marginBottom: '20px' }}>Related</h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {anime.relations.filter(rel => rel.node.type === 'ANIME').slice(0, 6).map(rel => (
                <a key={rel.node.id} href={'/anime/' + rel.node.id + '?source=anilist'} style={{ textDecoration: 'none', width: '120px' }}>
                  <img src={rel.node.coverImage.extraLarge} alt={rel.node.title.english || rel.node.title.romaji} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                  <p style={{ color: '#aaa', fontSize: '11px', textAlign: 'center' }}>{rel.relationType}</p>
                  <p style={{ color: '#fff', fontSize: '12px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rel.node.title.english || rel.node.title.romaji}</p>
                </a>
              ))}
            </div>
          </section>
        )}
        {/* Recommendations */}
        {anime.recommendations && anime.recommendations.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', borderLeft: '4px solid #e50914', paddingLeft: '12px', marginBottom: '20px' }}>
              Recommended
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '16px'
            }}>
              {anime.recommendations.map(rec => (
               
                <a  
                key={rec.id}
                  href={'/anime/' + rec.id + '?source=anilist'}
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
                      src={rec.coverImage.extraLarge}
                      alt={rec.title.english || rec.title.romaji}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 25%, transparent 60%)'
                    }} />
                    {rec.averageScore && (
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
                        ★ {(rec.averageScore / 10).toFixed(1)}
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '10px'
                    }}>
                      <p style={{
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '2px'
                      }}>
                        {rec.title.english || rec.title.romaji}
                      </p>
                      <p style={{ color: '#888', fontSize: '11px' }}>
                        {rec.format}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}


        {characters.length > 0 && (
          <section>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', borderLeft: '4px solid #e50914', paddingLeft: '12px', marginBottom: '20px' }}>Characters</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px' }}>
              {characters.map(char => (
                <div key={char.character.mal_id} style={{ textAlign: 'center' }}>
                  <img src={char.character.images.jpg.image_url} alt={char.character.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{char.character.name}</p>
                  <p style={{ color: '#666', fontSize: '11px' }}>{char.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default AnimeDetail


