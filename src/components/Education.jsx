import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { EDUCATION } from '../data/education'
import { lockScroll, unlockScroll } from '../lib/scrollLock'

const Logo3D = lazy(() => import('./Logo3D'))

const SPRING = { type: 'spring', stiffness: 260, damping: 30 }

// Logo tile, shared between row and popup so it glides between them. Renders a
// 3D mark when `edu.logo3d` is set (no frame), else the 2D image in a tile.
function LogoTile({ edu, size = 'md' }) {
  const dim = size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const box = edu.logo3d ? '' : 'rounded-xl overflow-hidden border border-line bg-white'
  return (
    <motion.div
      layoutId={`edu-logo-${edu.slug}`}
      transition={SPRING}
      className={`flex-shrink-0 ${dim} ${box}`}
    >
      {edu.logo3d ? (
        <Suspense fallback={null}>
          <Logo3D kind={edu.logo3d} className="w-full h-full" />
        </Suspense>
      ) : (
        <>
          <img
            src={edu.logo}
            alt={edu.school}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          <span className="hidden w-full h-full items-center justify-center font-mono text-[11px] text-ink-soft">
            {edu.initials}
          </span>
        </>
      )}
    </motion.div>
  )
}

// A single label / value line in the popup's record.
function Fact({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">{label}</span>
      <span className="text-sm text-ink text-right">{value}</span>
    </div>
  )
}

export default function Education() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

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
    <section id="education" ref={ref} className="relative pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <h2 className="display text-3xl sm:text-[2.5rem]">Where I&apos;ve studied.</h2>
        </motion.div>

        <div className="border-t border-line">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <button
                onClick={() => setSelected(edu)}
                className="group w-full text-left flex items-center justify-between gap-6 py-6 border-b border-line"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <LogoTile edu={edu} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <motion.span
                        layoutId={`edu-school-${edu.slug}`}
                        transition={SPRING}
                        className="font-serif text-2xl sm:text-3xl font-semibold text-ink"
                      >
                        {edu.school}
                      </motion.span>
                      <ArrowUpRight
                        size={18}
                        className="text-ink-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </div>
                    <motion.div
                      layoutId={`edu-degree-${edu.slug}`}
                      transition={SPRING}
                      className="mt-1 text-sm sm:text-base text-ink-soft"
                    >
                      {edu.degree}
                    </motion.div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right pt-2">
                  <div className="font-mono text-sm uppercase tracking-[0.06em] text-ink-muted whitespace-nowrap">
                    {edu.period}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup — transcript-style record (deliberately different from the job popup) */}
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
            aria-label={`${selected.school} — ${selected.degree}`}
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
                <LogoTile edu={selected} size="lg" />
                <div className="min-w-0 pt-1">
                  <motion.span
                    layoutId={`edu-school-${selected.slug}`}
                    transition={SPRING}
                    className="block font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight"
                  >
                    {selected.school}
                  </motion.span>
                  <motion.div
                    layoutId={`edu-degree-${selected.slug}`}
                    transition={SPRING}
                    className="text-base text-ink-soft"
                  >
                    {selected.degree}
                  </motion.div>
                </div>
              </div>

              {/* record body fades in after the morph */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                className="mt-7"
              >
                <div>
                  <Fact label="Location" value={selected.location} />
                  {selected.gpa && <Fact label="GPA" value={selected.gpa} />}
                  {selected.concentration && <Fact label="Concentration" value={selected.concentration} />}
                </div>

                {selected.honors.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-2.5">Awards</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.honors.map(h => (
                        <span key={h} className="text-xs px-2.5 py-1 rounded-[2px] border border-ink/25 text-ink">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.clubs?.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-3">Clubs</p>
                    <div className="space-y-3">
                      {selected.clubs.map(c => (
                        <div key={c.name} className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-ink">{c.name}</div>
                            <div className="text-sm text-ink-soft">{c.position}</div>
                          </div>
                          <span className="font-mono text-[11px] text-ink-muted flex-shrink-0 pt-0.5">{c.period}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selected.description && (
                  <p className="mt-6 text-sm leading-relaxed text-ink-soft">{selected.description}</p>
                )}

                {selected.transcript && (
                  <a
                    href={selected.transcript}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-base btn-primary mt-6 px-5 py-2.5 text-sm"
                  >
                    View unofficial transcript
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
