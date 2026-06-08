import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { EXPERIENCE } from '../data/experience'
import { lockScroll, unlockScroll } from '../lib/scrollLock'

// Three.js only loads when an Experience logo that needs it actually renders.
const Logo3D = lazy(() => import('./Logo3D'))

const SPRING = { type: 'spring', stiffness: 260, damping: 30 }

// Logo tile — shared between the list row and the popup so it can glide
// between them. Renders a 3D mark when `exp.logo3d` is set, else the 2D image.
function LogoTile({ exp, size = 'md' }) {
  const dim = size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  // 3D mark floats with no frame; 2D logos keep the bordered tile.
  const box = exp.logo3d ? '' : 'rounded-xl overflow-hidden border border-line bg-white'
  return (
    <motion.div
      layoutId={`logo-${exp.slug}`}
      transition={SPRING}
      className={`flex-shrink-0 ${dim} ${box}`}
    >
      {exp.logo3d ? (
        // Empty fallback (not the 2D jpg) so the original logo never flashes
        // while Three.js loads; the 3D mark fades itself in when ready.
        <Suspense fallback={null}>
          <Logo3D kind={exp.logo3d} className="w-full h-full" />
        </Suspense>
      ) : (
        <>
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          <span className="hidden w-full h-full items-center justify-center font-mono text-[11px] text-ink-soft">
            {exp.initials}
          </span>
        </>
      )}
    </motion.div>
  )
}

export default function Experience() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  // Esc to close + lock background scroll while a popup is open.
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    lockScroll()
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [selected])

  return (
    <section id="experience" ref={ref} className="relative pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <h2 className="display text-3xl sm:text-[2.5rem]">Where I&apos;ve worked.</h2>
        </motion.div>

        <div className="border-t border-line">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <button
                onClick={() => setSelected(exp)}
                className="group w-full text-left flex items-center justify-between gap-6 py-6 border-b border-line"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <LogoTile exp={exp} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <motion.span
                        layoutId={`company-${exp.slug}`}
                        transition={SPRING}
                        className="font-serif text-2xl sm:text-3xl font-semibold text-ink"
                      >
                        {exp.company}
                      </motion.span>
                      <ArrowUpRight
                        size={18}
                        className="text-ink-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </div>
                    <motion.div
                      layoutId={`role-${exp.slug}`}
                      transition={SPRING}
                      className="mt-1 text-sm sm:text-base text-ink-soft"
                    >
                      {exp.role}
                    </motion.div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right pt-1">
                  <div className="font-mono text-sm uppercase tracking-[0.06em] text-ink-muted whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup — shares logo / company / role with the row above via layoutId */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.company} — ${selected.role}`}
          >
            <div className="absolute inset-0 bg-ink/40 supports-[backdrop-filter]:backdrop-blur-sm" />

            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white border border-ink/15 rounded-[2px] shadow-[0_30px_80px_-30px_rgba(20,20,20,0.5)] p-6 sm:p-8"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-[2px] text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors z-10"
              >
                <X size={18} />
              </button>

              {/* shared header */}
              <div className="flex items-start gap-4 pr-8">
                <LogoTile exp={selected} size="lg" />
                <div className="min-w-0 pt-1">
                  <motion.span
                    layoutId={`company-${selected.slug}`}
                    transition={SPRING}
                    className="block font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight"
                  >
                    {selected.company}
                  </motion.span>
                  <motion.div
                    layoutId={`role-${selected.slug}`}
                    transition={SPRING}
                    className="text-base text-ink-soft"
                  >
                    {selected.role}
                  </motion.div>
                </div>
              </div>

              {/* the rest fades in once the shared elements have moved */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
              >
                {selected.summary && (
                  <p className="mt-6 text-[1.05rem] leading-relaxed text-ink">{selected.summary}</p>
                )}

                <ul className="mt-4 space-y-2.5">
                  {selected.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-ink/40" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
