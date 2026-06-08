import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ContactModal from './ContactModal'

const navLinks = [
  { label: 'Projects & Research', to: '/projects' },
  { label: 'Experience',          to: '/experience' },
  { label: 'Education',           to: '/education' },
]

// Warm the Three.js chunk when the user hovers/focuses the Experience link, so
// the 3D logos are usually ready by the time the page mounts.
const prefetchLogo3D = () => { import('./Logo3D') }

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        data-fixed-bar
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || pathname !== '/'
            ? 'border-b border-line supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:backdrop-blur-md bg-white'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2 flex-shrink-0">
            <span className="font-serif text-lg font-medium tracking-tight text-ink">Adil Arya</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onMouseEnter={link.to === '/experience' || link.to === '/education' ? prefetchLogo3D : undefined}
                  onFocus={link.to === '/experience' || link.to === '/education' ? prefetchLogo3D : undefined}
                  className={`link-underline pb-0.5 text-sm transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-ink link-underline-active' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="btn-base btn-primary hidden md:inline-flex px-4 py-2 text-sm whitespace-nowrap"
            >
              Get in touch
            </button>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg text-ink hover:bg-ink/5 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 p-4 bg-white border-b border-line md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-lg text-sm text-ink-soft hover:bg-ink/5 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setContactOpen(true) }}
                className="btn-base btn-primary mt-2 justify-center px-4 py-3 text-sm"
              >
                Get in touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
