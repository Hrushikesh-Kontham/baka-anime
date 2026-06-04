import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AnimeCard from '../components/AnimeCard'
import axios from 'axios'

function Genre() {
  const { id } = useParams()
  const [anime, setAnime] = useState([])
  const [genreName, setGenreName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenreAnime = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime?genres=${id}&order_by=score&sort=desc`)
        setAnime(res.data.data)
        if (res.data.data.length > 0) {
          const genre = res.data.data[0].genres.find(g => g.mal_id === parseInt(id))
          if (genre) setGenreName(genre.name)
        }
      } catch (error) {
        console.error('Error fetching genre anime:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGenreAnime()
  }, [id])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: '#fff', fontSize: '24px' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ padding:  window.innerWidth < 768 ? '20px 12px' :'40px 32px' }}>
      <h1 style={{
        color: '#fff',
        fontSize: '32px',
        fontWeight: '800',
        borderLeft: '4px solid #e50914',
        paddingLeft: '12px',
        marginBottom: '32px'
      }}>
        {genreName || 'Genre'} Anime
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px'
      }}>
        {anime.map((item) => (
          <AnimeCard key={item.mal_id} anime={item} />
        ))}
      </div>
    </div>
  )
}

export default Genre