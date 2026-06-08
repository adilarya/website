import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Github, ArrowUpRight, FileText, X } from 'lucide-react'
import { PAPERS, PROJECTS } from '../data/projects'
import HackerHallEntry from './HackerHallEntry'
import { useTakeover } from '../takeover'
import { lockScroll, unlockScroll } from '../lib/scrollLock'

const SPRING = { type: 'spring', stiffness: 260, damping: 30 }

function CategoryHeader({ label }) {
  return (
    <div className="pb-2 border-b border-ink/20">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink">{label}</h3>
    </div>
  )
}

// One list row (papers + projects share this). `kind` drives the layoutId + sub-line.
function Row({ kind, item, onOpen }) {
  const sub = kind === 'paper' ? item.venue : item.tags?.join('  ·  ')
  return (
    <button
      onClick={onOpen}
      className="group w-full text-left flex items-start justify-between gap-6 py-6 border-b border-line"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <motion.span
            layoutId={`${kind}-${item.slug}`}
            transition={SPRING}
            className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-snug"
          >
            {item.title}
          </motion.span>
          <ArrowUpRight
            size={16}
            className="flex-shrink-0 text-ink-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          />
        </div>
        {sub && <div className="mt-1.5 text-sm text-ink-soft">{sub}</div>}
      </div>
      <div className="flex-shrink-0 pt-1.5">
        <span className="font-mono text-sm uppercase tracking-[0.06em] text-ink-muted whitespace-nowrap">{item.year}</span>
      </div>
    </button>
  )
}

function LinkRow({ links }) {
  if (!links) return null
  const A = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink link-underline pb-0.5">
      {children}
    </a>
  )
  return (
    <div className="mt-5 flex flex-wrap gap-5">
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-ink-soft transition-colors"
        >
          <Github size={15} /> <ArrowUpRight size={13} />
        </a>
      )}
      {links.pdf    && <A href={links.pdf}><FileText size={14} /> PDF</A>}
      {links.arxiv  && <A href={links.arxiv}>arXiv <ArrowUpRight size={13} /></A>}
      {links.doi    && <A href={links.doi}>DOI <ArrowUpRight size={13} /></A>}
      {links.demo   && <A href={links.demo}>Live demo <ArrowUpRight size={13} /></A>}
    </div>
  )
}

function Tags({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
      {tags.map(t => <span key={t} className="font-mono text-[11px] text-ink-muted">{t}</span>)}
    </div>
  )
}

export default function Projects() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null) // { kind, item }
  const enter = useTakeover()

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
    <section id="projects" ref={ref} className="relative pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="display text-3xl sm:text-[2.5rem]">What I&apos;ve built.</h2>
        </motion.div>

        <div className="space-y-16">
          {/* Hacker Hall — glitch entry → blocky takeover */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <HackerHallEntry onEnter={(e) => enter({ x: e.clientX, y: e.clientY }, '/terminal')} />
          </motion.div>

          {/* Research Papers */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <CategoryHeader label="Research Papers" />
            {PAPERS.length > 0 ? (
              PAPERS.map(p => (
                <Row key={p.slug} kind="paper" item={p} onOpen={() => setSelected({ kind: 'paper', item: p })} />
              ))
            ) : (
              <div className="py-7">
                <p className="font-serif text-xl text-ink-soft">Coming soon.</p>
              </div>
            )}
          </motion.div>

          {/* 02 — Hacker Hall: special interactive section, built next. */}

          {/* 03 — Other Projects */}
          {PROJECTS.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <CategoryHeader label="Other Projects" />
              {/* show ~3, scroll within the section for the rest */}
              <div className="max-h-[360px] overflow-y-auto overscroll-contain pr-1">
                {PROJECTS.map(p => (
                  <Row key={p.slug} kind="project" item={p} onOpen={() => setSelected({ kind: 'project', item: p })} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <p className="mt-12 text-sm text-ink-muted">
          More on{' '}
          <a href="https://github.com/adilarya" target="_blank" rel="noopener noreferrer" className="text-ink link-underline pb-0.5">
            github.com/adilarya
          </a>
        </p>
      </div>

      {/* Popup — shares the title with the row above via layoutId */}
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
            aria-label={selected.item.title}
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

              <motion.span
                layoutId={`${selected.kind}-${selected.item.slug}`}
                transition={SPRING}
                className="block font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight pr-8"
              >
                {selected.item.title}
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
              >
                {selected.kind === 'paper' ? (
                  <>
                    {selected.item.authors && <p className="mt-2 text-sm text-ink-soft">{selected.item.authors}</p>}
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                      {selected.item.venue} · {selected.item.year}
                    </p>
                    {selected.item.abstract && (
                      <p className="mt-5 text-[0.95rem] leading-relaxed text-ink">{selected.item.abstract}</p>
                    )}
                    <Tags tags={selected.item.tags} />
                    <LinkRow links={selected.item.links} />
                  </>
                ) : (
                  <>
                    {selected.item.description && (
                      <p className="mt-5 text-[0.95rem] leading-relaxed text-ink">{selected.item.description}</p>
                    )}
                    <Tags tags={selected.item.tags} />
                    <LinkRow links={selected.item.links} />
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
