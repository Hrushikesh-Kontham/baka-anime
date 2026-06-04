function SkeletonCard() {
    return (
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        aspectRatio: '2/3',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }} />
      </div>
    )
  }
  
  export function SkeletonGrid({ count = 12 }) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px'
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }
  
  export default SkeletonCard