function ErrorState({ message = 'Something went wrong', onRetry }) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'rgba(229,9,20,0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
          {message}
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          This could be a network issue or API rate limit. Try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              backgroundColor: '#e50914',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px'
            }}
          >
            Try Again
          </button>
        )}
      </div>
    )
  }
  
  export default ErrorState