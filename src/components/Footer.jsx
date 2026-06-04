import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#141414',
      borderTop: '1px solid #222',
      padding: '48px 32px 24px',
      marginTop: '32px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {/* Brand */}
        <div>
          <h2 style={{
            color: '#e50914',
            fontSize: '22px',
            fontWeight: '900',
            letterSpacing: '2px',
            marginBottom: '12px'
          }}>
            BAKA
          </h2>
          <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.7' }}>
            Discover, explore and track your favorite anime. Powered by AniList & Jikan APIs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>
            Navigation
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/search', label: 'Browse' },
              { to: '/seasonal', label: 'Seasonal' },
              { to: '/top', label: 'Top Anime' },
              { to: '/watchList', label: 'Watchlist' },
            ].map((link) => (
              <Link key={link.to} to={link.to} style={{
                color: '#666',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#e50914'}
              onMouseLeave={e => e.currentTarget.style.color = '#666'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Data Source */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>
            Data Source
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: 'https://anilist.co', label: 'AniList API' },
              { href: 'https://jikan.moe', label: 'Jikan API' },
              // { href: 'https://myanimelist.net', label: 'MyAnimeList' },
            ].map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" style={{
                color: '#666',
                textDecoration: 'none',
                fontSize: '13px'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#e50914'}
              onMouseLeave={e => e.currentTarget.style.color = '#666'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div style={{
        borderTop: '1px solid #222',
        marginTop: '40px',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#444',
        fontSize: '12px'
      }}>
        © 2026 Baka. Built with React + AniList & Jikan APIs.
      </div>
    </footer>
  )
}

export default Footer