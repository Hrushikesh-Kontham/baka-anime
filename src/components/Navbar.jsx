import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [query, setQuery] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()
  const debounceRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!query.trim()) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      navigate("/search?q=" + query)
    }, 500)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate("/search?q=" + query)
  }

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "60px",
      backgroundColor: "#0f0f0f",
      borderBottom: "1px solid #1f1f1f",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      zIndex: 1000,
      gap: "12px"
    }}>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "6px", borderRadius: "6px" }}
        >
          <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: "#aaa" }} />
          <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: "#aaa" }} />
          <span style={{ display: "block", width: "20px", height: "2px", backgroundColor: "#aaa" }} />
        </button>
        <a href="/" style={{ fontSize: isMobile ? "18px" : "22px", fontWeight: "900", color: "#e50914", textDecoration: "none", letterSpacing: "3px" }}>
          BAKA
        </a>
      </div>

      {!isMobile && (
        <form onSubmit={handleSearch} style={{
          flex: 1,
          maxWidth: "520px",
          display: "flex",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              padding: "10px 16px",
              outline: "none",
              fontSize: "14px"
            }}
          />
          <button type="submit" style={{
            backgroundColor: "#e50914",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px"
          }}>
            Search
          </button>
        </form>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {isMobile && (
          <button
            onClick={() => navigate("/search")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: "6px" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        )}

        
          <a href="/watchList"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#aaa",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "500",
            border: "1px solid #2a2a2a"
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#e50914" }}
          onMouseLeave={e => { e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "#2a2a2a" }}
        >
          {isMobile ? "♥" : "Watchlist"}
        </a>
      </div>
    </nav>
  )
}

export default Navbar