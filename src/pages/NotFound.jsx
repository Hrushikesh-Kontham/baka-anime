import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      padding: '32px'
    }}>
      <h1 style={{
        fontSize: '120px',
        fontWeight: '900',
        color: '#e50914',
        lineHeight: '1',
        marginBottom: '16px'
      }}>
        404
      </h1>
      <p style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
        Page Not Found
      </p>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{
        backgroundColor: '#e50914',
        color: '#fff',
        padding: '12px 28px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '14px'
      }}>
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound