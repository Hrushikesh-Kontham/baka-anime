import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const location = useLocation()

useEffect(() => {
  if (isMobile) setSidebarOpen(false)
}, [location])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ minHeight: '100vh',
      backgroundColor:'#0a0a0a',
      color: '#fff' }}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div style={{ display: 'flex', paddingTop: '60px' }}>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 30,
              top: '60px'
            }}
          />
        )}

        <Sidebar isOpen={sidebarOpen} isMobile={isMobile} />

        <main style={{
          flex: 1,
          marginLeft: isMobile ? '0px' : sidebarOpen ? '240px' : '60px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden'
        }}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Layout