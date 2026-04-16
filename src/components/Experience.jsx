import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCE = [
  {
    company: 'Grit Financial',
    role: 'Software Engineer Intern',
    period: 'Feb 2026 – Present',
    type: 'Fintech · Internship',
    logo: '/logos/grit.jpg',
    initials: 'GF',
    logoColor: 'from-emerald-500 to-green-400',
    current: true,
    bullets: [
      'Building scalable software systems at a fintech startup focused on democratizing financial access.',
      'Collaborating on full-stack engineering and data pipeline architecture.',
    ],
  },
  {
    company: 'Divertica Inc.',
    role: 'Computer Vision Intern',
    period: 'Jun 2025 – Aug 2025',
    type: 'Computer Vision · Internship',
    logo: '/logos/divertica.jpg',
    initials: 'DV',
    logoColor: 'from-cyan-500 to-teal-400',
    current: false,
    bullets: [
      'Built a production-ready pipeline converting 4K/60-fps multi-angle video streams into structured retail planograms via video stitching, YOLOv12 object detection, and OCR.',
      'Benchmarked model variants against ~630k product classes; improved classification accuracy through systematic evaluation and hardware-aware optimization.',
      'Strengthened Python & C++ engineering practices; delivered ML outputs as robust, measurable software components with actionable metrics.',
    ],
  },
]

const EDUCATION = [
  {
    school: 'Columbia University',
    degree: 'MS Artificial Intelligence',
    period: 'Sept 2026 –',
    logo: '/logos/columbia.jpg',
    initials: 'CU',
    logoColor: 'from-blue-400 to-sky-400',
    status: 'Incoming',
    detail: 'Graduate-level AI research at Columbia Engineering. Focusing on applied ML and research.',
  },
  {
    school: 'University of Minnesota',
    degree: 'BS Computer Science',
    period: 'Sept 2024 – May 2026',
    logo: '/logos/umn.jpg',
    initials: 'UMN',
    logoColor: 'from-indigo-500 to-indigo-400',
    status: 'GPA 3.903',
    detail:
      '15+ specialized courses: ML, CV, NLP, Robotics, Advanced ML, OS, and more. Completed in accelerated 2-year track.',
  },
]

// ─── Logo badge ───────────────────────────────────────────────────────────────
// object-cover + overflow-hidden on the container = image always fills the box
// with no empty space or padding. onError falls back to gradient initials so a
// missing file never breaks the layout.
function LogoBadge({ logo, initials, logoColor, size = 'lg' }) {
  const dim          = size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-11 h-11 rounded-xl'
  const initialsSize = size === 'lg' ? 'text-sm' : 'text-xs'

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
        alt={initials}
        // object-cover fills the container edge-to-edge; opacity-90 at rest,
        // full opacity on hover. No padding — the image IS the container.
        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'flex'
        }}
      />
      {/* Fallback — hidden until image errors */}
      <span
        className={`hidden w-full h-full items-center justify-center font-black bg-gradient-to-br ${logoColor} bg-clip-text text-transparent ${initialsSize}`}
      >
        {initials}
      </span>
    </div>
  )
}

// ─── Small inline logo (leadership rows, 20 px) ───────────────────────────────
// Same object-cover / overflow-hidden pattern, just smaller.
function SmallLogo({ src, alt }) {
  return (
    <div
      className="flex-shrink-0 w-5 h-5 rounded overflow-hidden"
      style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-200"
        onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
      />
    </div>
  )
}

export default function Experience() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="relative py-24 section-divider">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0">

          {/* ─ Work Experience ─ */}
          <div className="lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/50" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400">Experience</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">Work</h2>
            </motion.div>

            <div className="space-y-6">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                  whileHover={{ x: 4 }}
                  className="relative p-5 rounded-2xl border transition-all duration-300 bg-[#14142a] border border-hairline hover:border-indigo-500/30"
                >
                  {exp.current && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <LogoBadge {...exp} />
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug text-white break-words">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-gradient">{exp.company}</div>
                      <div className="text-xs mt-0.5 text-gray-600 break-words">
                        {exp.period} · {exp.type}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-1 text-xs flex-shrink-0">▸</span>
                        <span className="text-xs leading-relaxed text-gray-400 break-words">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-white/15" />

          {/* ─ Education ─ */}
          <div className="lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-500/50" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">Education</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">Academic</h2>
            </motion.div>

            <div className="space-y-5">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  whileHover={{ x: -4 }}
                  className="p-5 rounded-2xl border transition-all duration-300 bg-[#14142a] border border-hairline hover:border-indigo-500/30"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <LogoBadge {...edu} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold leading-snug text-white break-words">
                          {edu.school}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            edu.status === 'Incoming'
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                              : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                      <div className="text-sm font-semibold mt-0.5 text-gray-300 break-words">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-gray-600">{edu.period}</div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500 break-words">{edu.detail}</p>
                </motion.div>
              ))}

              {/* Campus Leadership */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="tinted-indigo p-5 rounded-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-indigo-400">
                  Campus Leadership
                </p>
                <div className="space-y-2.5">
                  {[
                    { role: 'Technical Lead',       org: 'UMN AI Club',      logo: '/logos/aiclub.jpg',  period: '2025–2026' },
                    { role: 'Coding Subgroup Lead',  org: 'EWB Guatemala',    logo: '/logos/ewb.jpg',     period: '2025' },
                    { role: 'Tables Subgroup Lead',  org: 'EWB Local',        logo: '/logos/ewb.jpg',     period: '2024–2025' },
                    { role: 'Bass / Soloist',        org: 'Minnesota Fitoor', logo: '/logos/fitoor.jpg',  period: '2024–2026' },
                  ].map(item => (
                    <div key={item.org} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <SmallLogo src={item.logo} alt={item.org} />
                        <span className="text-xs font-medium text-gray-300 break-words">
                          {item.role}{' '}
                          <span className="text-gray-600">@ {item.org}</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-700 flex-shrink-0">
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
