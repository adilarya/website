import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────
// Each achievement carries a `logo` (shown in the icon tile) and an `iconColor`
// fallback gradient used if the image fails to load.
const ACHIEVEMENTS = [
  {
    title: 'Tau Beta Pi',
    subtitle: 'Engineering Honor Society',
    date: 'Nov 2025',
    issuer: 'David A. Blank',
    logo: '/logos/umn.jpg',
    iconFallback: 'τβΠ',
    iconColor: 'from-indigo-500 to-violet-500',
    description:
      'Inducted for ranking among the top engineering students in academic performance and character. Highly selective GPA-based national honor society.',
  },
  {
    title: "Dean's List",
    subtitle: 'CSE Term Honor · 4×',
    date: 'Fall 2024 – Fall 2025',
    issuer: 'Andrew G. Alleyne',
    logo: '/logos/umn.jpg',
    iconFallback: '★',
    iconColor: 'from-amber-400 to-yellow-400',
    description:
      'Awarded four consecutive terms: Fall 2024, Spring 2025, Summer 2025, and Fall 2025. Requires semester GPA ≥ 3.666 with no N grades.',
  },
  {
    title: 'Eagle Scout',
    subtitle: 'BSA Highest Rank',
    date: 'Jul 2023',
    issuer: 'Golden Gate Area Council',
    logo: '/logos/bsa.jpg',
    iconFallback: '🦅',
    iconColor: 'from-emerald-400 to-teal-400',
    description:
      'Highest rank in scouting — earned through advancing ranks, completing merit badges, and executing community service projects. Recognized nationally as a milestone of accomplishment.',
  },
]

// Each certification carries a `logo` and a `color`/`bg`/`border` set that
// tints the card. The `iconFallback` text is shown only if the image errors.
const CERTIFICATIONS = [
  {
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft & LinkedIn',
    date: 'Oct 2023',
    logo: '/logos/microsoft.jpg',
    iconFallback: 'MS',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn',
    date: 'Sep 2023',
    logo: '/logos/microsoft.jpg',
    iconFallback: 'AI',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'LinkedIn Learning',
    date: 'Sep 2023',
    logo: '/logos/linkedin.jpg',
    iconFallback: 'Li',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    title: 'AI Foundations: Machine Learning',
    issuer: 'LinkedIn Learning',
    date: 'Sep 2023',
    logo: '/logos/linkedin.jpg',
    iconFallback: 'Li',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
]

// ─── Shared logo tile component ───────────────────────────────────────────────
// object-cover + overflow-hidden → image fills the container edge-to-edge.
// Falls back to text if the image errors, so layout never breaks.
function LogoTile({ logo, fallback, size = 'lg', fallbackClassName = '' }) {
  const dim =
    size === 'lg'
      ? 'w-14 h-14 rounded-2xl'   // achievement icon tile
      : 'w-10 h-10 rounded-xl'    // certification icon tile

  return (
    <div
      className={`flex-shrink-0 ${dim} overflow-hidden`}
      style={{
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.removeProperty('display')
        }}
      />
      {/* Fallback text — hidden until image errors */}
      <span
        className={`hidden w-full h-full items-center justify-center font-black text-sm ${fallbackClassName}`}
        style={{ display: 'none' }}
      >
        {fallback}
      </span>
    </div>
  )
}

export default function Achievements() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" ref={ref} className="relative py-24 section-divider">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-600/[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Achievements &amp;{' '}
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">

          {/* ─ Achievements (left) ─ */}
          <div className="space-y-4">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ x: 4 }}
                className="flex gap-5 p-5 rounded-2xl border transition-all duration-300 bg-white/[0.03] border-white/8 hover:border-amber-500/25"
              >
                {/* Logo tile — fully fills the 56×56 box */}
                <LogoTile
                  logo={item.logo}
                  fallback={item.iconFallback}
                  size="lg"
                  fallbackClassName={`bg-gradient-to-br ${item.iconColor} bg-clip-text text-transparent`}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm leading-snug text-white break-words">
                        {item.title}
                      </h3>
                      <div className="text-xs font-medium mt-0.5 text-gradient">
                        {item.subtitle}
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-[10px] font-mono text-gray-700 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mt-2 text-gray-500 break-words">
                    {item.description}
                  </p>
                  <div className="mt-1.5 text-[10px] text-gray-700">
                    Issued by {item.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─ Certifications (right) ─ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-gray-600">
                Certifications
              </p>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    whileHover={{ x: 3 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:border-opacity-60 ${cert.bg} ${cert.border}`}
                  >
                    {/* Logo tile — fully fills the 40×40 box */}
                    <LogoTile
                      logo={cert.logo}
                      fallback={cert.iconFallback}
                      size="sm"
                      fallbackClassName={cert.color}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-snug text-gray-200 break-words">
                        {cert.title}
                      </p>
                      <p className="text-[10px] mt-0.5 text-gray-600">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>

                    {/* Accent dot */}
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full opacity-60 ${cert.color.replace('text-', 'bg-')}`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Beyond the Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 p-5 rounded-2xl border bg-gradient-to-br from-violet-900/20 to-indigo-900/10 border-violet-500/20"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-violet-400">
                Beyond the Resume
              </p>
              <p className="text-xs leading-relaxed text-gray-400 break-words">
                Eagle Scout · Competitive a cappella singer · Engineering humanitarian volunteer ·
                The through-line: commitment, craft, and showing up even when it's hard.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
