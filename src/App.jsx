import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import AnimeDetail from './pages/AnimeDetail'
import WatchList from './pages/WatchList'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import Top from './pages/Top'
import Seasonal from './pages/Seasonal'
import Genre from './pages/Genre'

function TitleUpdater() {
  const location = useLocation()

  useEffect(() => {
    const titles = {
      '/': 'Baka — Anime Discovery',
      '/search': 'Baka — Search',
      '/top': 'Baka — Top Anime',
      '/seasonal': 'Baka — Seasonal',
      '/watchList': 'Baka — My Watchlist',
    }
    const title = titles[location.pathname] || 'Baka'
    document.title = title
  }, [location])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <TitleUpdater />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/watchList" element={<WatchList />} />
          <Route path="/top" element={<Top />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App