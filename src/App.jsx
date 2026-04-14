import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Dark mode only — the `dark` class is also set on <html> in index.html
// (class="dark") so there is never a flash of light mode on first paint.
// This effect is a belt-and-suspenders guarantee for hydration edge cases.
function App() {
  useEffect(() => {
    // Ensure dark class is always present; never remove it.
    document.documentElement.classList.add('dark')
    // Remove any system-preference or persisted light-mode class that might
    // have been applied by a browser extension or cached service worker.
    document.documentElement.classList.remove('light')
  }, [])

  return (
    <div className="min-h-screen bg-[#09090f] text-gray-100">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
