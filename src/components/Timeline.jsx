import { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Date helpers ─────────────────────────────────────────────────────────────
const START    = new Date('2024-09-01')
const END      = new Date('2027-09-01')
const TOTAL_MS = END - START

const toPercent = (dateStr) => {
  const d   = new Date(dateStr)
  const raw = ((d - START) / TOTAL_MS) * 100
  return Math.max(0, Math.min(100, raw))
}

// ─── Year markers ─────────────────────────────────────────────────────────────
const YEAR_MARKERS = [
  { year: '2024', date: '2024-09-01' },
  { year: '2025', date: '2025-01-01' },
  { year: '2026', date: '2026-01-01' },
  { year: '2027', date: '2027-01-01' },
]

// ─── Timeline data ────────────────────────────────────────────────────────────
// Each item carries a `logo` path (relative to /public). null = no logo.
const LANES = [
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    rows: [
      [
        {
          id: 'umn',
          title: 'BS Computer Science',
          org: 'University of Minnesota',
          logo: '/logos/umn.jpg',
          start: '2024-09-01',
          end: '2026-05-31',
          color: 'from-indigo-500 to-indigo-400',
          glow: 'rgba(99,102,241,0.5)',
          badge: 'GPA 3.903',
          description:
            '15+ ML/CS courses: Machine Learning, Computer Vision, NLP, Advanced ML, Robotics, OS & more. Completing in 2 years.',
          ongoing: false,
        },
        {
          id: 'columbia',
          title: 'MS Artificial Intelligence',
          org: 'Columbia University',
          logo: '/logos/columbia.jpg',
          start: '2026-09-01',
          end: '2027-08-31',
          color: 'from-blue-400 to-sky-400',
          glow: 'rgba(59,130,246,0.5)',
          badge: 'Incoming',
          description:
            'Incoming Fall 2026. Pursuing graduate-level AI research at Columbia Engineering.',
          ongoing: true,
        },
      ],
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    rows: [
      [
        {
          id: 'divertica',
          title: 'Computer Vision Intern',
          org: 'Divertica Inc.',
          logo: '/logos/divertica.jpg',
          start: '2025-06-01',
          end: '2025-08-31',
          color: 'from-cyan-500 to-teal-400',
          glow: 'rgba(6,182,212,0.5)',
          badge: 'Internship',
          description:
            'Production CV pipeline: 4K/60fps video → retail planograms. YOLOv12, OCR, ~630k product classes, Python & C++.',
          ongoing: false,
        },
        {
          id: 'grit',
          title: 'Software Engineer Intern',
          org: 'Grit Financial',
          logo: '/logos/grit.jpg',
          start: '2026-02-01',
          end: '2027-09-01',
          color: 'from-emerald-500 to-green-400',
          glow: 'rgba(16,185,129,0.5)',
          badge: 'Present',
          description:
            'Full-stack engineering at a fintech startup. Building scalable software components and data pipelines.',
          ongoing: true,
        },
      ],
    ],
  },
  {
    id: 'extracurriculars',
    label: 'Extracurriculars',
    icon: '⚡',
    rows: [
      [
        {
          id: 'fitoor',
          title: 'Bass / Soloist',
          org: 'Minnesota Fitoor',
          logo: '/logos/fitoor.jpg',
          start: '2024-09-01',
          end: '2026-05-31',
          color: 'from-amber-500 to-orange-400',
          glow: 'rgba(245,158,11,0.5)',
          badge: 'A Cappella',
          description:
            '2nd place at Gathe Raho & Awaazein. Performed at A3. Competitive South Asian a cappella group.',
          ongoing: false,
        },
      ],
      [
        {
          id: 'ewb-local',
          title: 'Tables Subgroup Lead',
          org: 'EWB Local',
          logo: '/logos/ewb.jpg',
          start: '2024-09-01',
          end: '2025-01-31',
          color: 'from-lime-500 to-green-400',
          glow: 'rgba(132,204,22,0.45)',
          badge: 'Lead',
          description:
            'Led structural sub-team for UMN Engineering Without Borders local chapter.',
          ongoing: false,
        },
        {
          id: 'ewb-guatemala',
          title: 'Coding Subgroup Lead',
          org: 'EWB Guatemala',
          logo: '/logos/ewb.jpg',
          start: '2025-02-01',
          end: '2025-05-31',
          color: 'from-teal-500 to-emerald-400',
          glow: 'rgba(20,184,166,0.45)',
          badge: 'Lead',
          description:
            "Led software development team for UMN's humanitarian engineering project in Guatemala.",
          ongoing: false,
        },
      ],
      [
        {
          id: 'sesb',
          title: 'Member',
          org: 'Science & Engineering Board',
          logo: null,
          start: '2024-09-01',
          end: '2025-01-31',
          color: 'from-sky-500 to-blue-400',
          glow: 'rgba(14,165,233,0.45)',
          badge: 'Member',
          description:
            "Represented the CSE student body at UMN's Science & Engineering Student Board.",
          ongoing: false,
        },
        {
          id: 'ai-club',
          title: 'Technical Lead',
          org: 'UMN AI Club',
          logo: '/logos/aiclub.jpg',
          start: '2025-09-01',
          end: '2026-05-31',
          color: 'from-violet-500 to-purple-400',
          glow: 'rgba(139,92,246,0.5)',
          badge: 'Lead',
          description:
            'Organized ML workshops, led project teams, and drove technical curriculum for 200+ member club.',
          ongoing: false,
        },
      ],
    ],
  },
]

// ─── Portal tooltip ────────────────────────────────────────────────────────────
// AnimatePresence is always mounted inside the portal so exit animations fire
// correctly when tooltip clears. position:fixed + zIndex:9999 escapes every
// overflow / stacking-context on the page.
function TimelineTooltip({ tooltip }) {
  return createPortal(
    <AnimatePresence>
      {tooltip && <TooltipContent tooltip={tooltip} />}
    </AnimatePresence>,
    document.body,
  )
}

function TooltipContent({ tooltip }) {
  const { item, x, y } = tooltip
  const TOOLTIP_W  = 292
  const OFFSET_X   = 16
  const OFFSET_Y   = 18

  const left       = Math.min(x + OFFSET_X, window.innerWidth - TOOLTIP_W - 16)
  const spaceBelow = window.innerHeight - y
  const top        = spaceBelow < 170 ? y - OFFSET_Y - 130 : y + OFFSET_Y

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left,
        top,
        width: TOOLTIP_W,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="rounded-xl p-4 border border-white/10"
        style={{
          background: '#12121f',
          boxShadow: `0 16px 56px rgba(0,0,0,0.75), 0 0 28px ${item.glow}`,
        }}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-2.5 mb-1">
          {item.logo && (
            <img
              src={item.logo}
              alt={item.org}
              className="w-5 h-5 rounded object-contain opacity-90 flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
          )}
          <p className="text-sm font-bold text-white leading-snug break-words">
            {item.title}
          </p>
        </div>

        {/* Org + badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs text-gray-400 leading-none">{item.org}</span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${item.color}`}
          >
            {item.badge}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed break-words">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Individual bar ───────────────────────────────────────────────────────────
// Hardening notes:
//  • Uses width-based animation (not scaleX) so a transform-blocking
//    extension or partial Framer Motion failure can never leave the bar
//    at width 0. Final width is set inline as a hard guarantee.
//  • Solid background-color fallback before the gradient class so the bar
//    is always visible even if Tailwind's bg-gradient-to-r is overridden.
//  • min-width:6px ensures even ultra-short ranges render visibly.
function TimelineBar({ item, isVisible, onHover, onLeave }) {
  const left  = toPercent(item.start)
  const width = toPercent(item.end) - toPercent(item.start)
  const finalWidthPct = Math.max(width, 1.5)

  // Map color gradient to a solid fallback color (extracted from the
  // glow rgba) so the bar fill is visible without gradient support.
  const solidFallback = item.glow.replace(/rgba\(([^)]+),\s*[\d.]+\)/, 'rgb($1)')

  return (
    <div style={{ position: 'relative', height: '36px', overflow: 'visible' }}>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${left}%`,
          width: `${finalWidthPct}%`,
          minWidth: '6px',
          backgroundColor: solidFallback,
          zIndex: 1,
          borderRadius: '0.5rem',
        }}
        whileHover={{
          boxShadow: `0 2px 24px ${item.glow}, 0 0 48px ${item.glow.replace(/[\d.]+\)$/, '0.2)')}`,
          y: -2,
          transition: { duration: 0.15 },
        }}
        onMouseEnter={(e) => onHover(item, e.clientX, e.clientY)}
        onMouseMove={(e)  => onHover(item, e.clientX, e.clientY)}
        onMouseLeave={onLeave}
        className={`timeline-bar-fill bg-gradient-to-r ${item.color} cursor-pointer select-none`}
      >
        <div className="absolute inset-0 flex items-center px-2 gap-1.5 overflow-hidden rounded-lg min-w-safe">
          {item.logo && (
            <img
              src={item.logo}
              alt=""
              aria-hidden="true"
              className="flex-shrink-0 w-[15px] h-[15px] rounded-sm object-contain opacity-75"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <span className="text-white text-[10px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis leading-none flex-1 min-w-safe">
            {item.org}
          </span>
          {item.ongoing && (
            <span className="text-white/80 text-[11px] ml-0.5 flex-shrink-0">→</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main Timeline ────────────────────────────────────────────────────────────
export default function Timeline() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [tooltip, setTooltip] = useState(null)
  const handleHover = useCallback((item, x, y) => setTooltip({ item, x, y }), [])
  const handleLeave = useCallback(() => setTooltip(null), [])

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-24 section-divider bg-[#0c0c18]"
    >
      {/* Ambient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl" />
      </div>

      <TimelineTooltip tooltip={tooltip} />

      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">
              Activity Timeline
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Parallel <span className="text-gradient">Rigor</span>
          </h2>
          <p className="mt-2 text-sm max-w-lg text-gray-400 leading-relaxed">
            Multiple demanding commitments handled simultaneously — school, work, leadership, and performance.
          </p>
        </motion.div>

        {/* Gantt chart — no overflow:hidden on this wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl border border-hairline bg-[#0f0f1e]"
        >
          {/* Year header — overflow:hidden only here for rounded corners */}
          <div className="flex border-b border-hairline rounded-t-2xl overflow-hidden">
            <div className="flex-shrink-0 w-36 sm:w-44 border-r border-hairline px-4 py-3 flex items-center">
              <span className="text-xs font-semibold text-gray-600">Lane</span>
            </div>
            <div className="flex-1 relative py-3 px-2">
              <div className="relative h-5">
                {YEAR_MARKERS.map(({ year, date }) => (
                  <div
                    key={year}
                    className="absolute flex items-center"
                    style={{ left: `${toPercent(date)}%`, transform: 'translateX(-50%)' }}
                  >
                    <span className="text-xs font-bold tracking-wide text-gray-400">{year}</span>
                  </div>
                ))}
              </div>
              {YEAR_MARKERS.map(({ year, date }) => (
                <div
                  key={year}
                  className="absolute top-0 bottom-0 w-px bg-white/10"
                  style={{ left: `${toPercent(date)}%` }}
                />
              ))}
            </div>
          </div>

          {/* Lanes */}
          {LANES.map((lane, laneIdx) => (
            <div
              key={lane.id}
              className={laneIdx < LANES.length - 1 ? 'flex border-b border-hairline' : 'flex'}
            >
              <div className="flex-shrink-0 w-36 sm:w-44 border-r border-hairline px-4 py-4 flex items-center gap-2">
                <span className="text-base leading-none">{lane.icon}</span>
                <span className="text-xs font-bold tracking-wide text-gray-300">{lane.label}</span>
              </div>

              {/* overflow:visible — bars must not be clipped on hover */}
              <div className="flex-1 relative py-3 px-2 space-y-2 min-w-safe" style={{ overflow: 'visible' }}>
                {YEAR_MARKERS.map(({ year, date }) => (
                  <div
                    key={year}
                    className="absolute top-0 bottom-0 w-px bg-white/[0.06] pointer-events-none"
                    style={{ left: `${toPercent(date)}%` }}
                  />
                ))}
                {lane.rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    style={{ position: 'relative', minHeight: '36px', overflow: 'visible' }}
                  >
                    {row.map(item => (
                      <TimelineBar
                        key={item.id}
                        item={item}
                        isVisible={isInView}
                        onHover={handleHover}
                        onLeave={handleLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer: today marker */}
          <div className="flex border-t border-hairline rounded-b-2xl overflow-hidden">
            <div className="flex-shrink-0 w-36 sm:w-44 border-r border-hairline px-4 py-2" />
            <div className="flex-1 relative py-2 px-2">
              {(() => {
                const today = new Date()
                const pct   = toPercent(today.toISOString().split('T')[0])
                if (pct <= 0 || pct >= 100) return null
                return (
                  <div
                    className="absolute top-0 bottom-0 flex flex-col items-center"
                    style={{ left: `${pct}%` }}
                  >
                    <div className="w-px h-full bg-gradient-to-b from-indigo-400 to-transparent opacity-60" />
                    <span className="absolute -top-3 -translate-x-1/2 text-[9px] font-bold text-indigo-400 whitespace-nowrap">
                      TODAY
                    </span>
                  </div>
                )
              })()}
              <p className="text-[10px] text-right pr-2 text-gray-700">
                Hover bars for details · Ongoing items extend →
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex flex-wrap gap-4 justify-end"
        >
          {[
            { label: 'Education',        color: 'from-indigo-500 to-indigo-400' },
            { label: 'Experience',       color: 'from-cyan-500 to-teal-400' },
            { label: 'Extracurriculars', color: 'from-amber-500 to-orange-400' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-5 h-2.5 rounded-full bg-gradient-to-r ${color}`} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
