import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { TakeoverProvider } from './takeover'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import WhoIAm from './components/WhoIAm'
import HackerHall from './components/HackerHall'

// Jump to top whenever the route changes (so each "page" starts at the top).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Home() {
  return <Hero />
}

function App() {
  const { pathname } = useLocation()
  const isHall = pathname === '/terminal'

  return (
    <TakeoverProvider>
      <div className={`min-h-screen antialiased ${isHall ? 'bg-black text-white' : 'bg-paper text-ink'}`}>
        <ScrollToTop />
        {!isHall && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/about" element={<WhoIAm />} />
            <Route path="/terminal" element={<HackerHall />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </TakeoverProvider>
  )
}

export default App
