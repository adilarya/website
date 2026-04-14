import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const INTERESTS = [
  { label: 'Computer Vision', icon: '👁️' },
  { label: 'Natural Language Processing', icon: '💬' },
  { label: 'LLMs & RAG', icon: '🧠' },
  { label: 'ML Research', icon: '🔬' },
  { label: 'Robotics', icon: '🤖' },
  { label: 'Fintech', icon: '📈' },
]

const QUICK_STATS = [
  { value: '3.903', label: 'GPA', sub: 'University of Minnesota' },
  { value: '4×', label: "Dean's List", sub: 'CSE Term Honor' },
  { value: '15+', label: 'ML/CS Courses', sub: 'Advanced curriculum' },
  { value: '2 yrs', label: 'BS Completion', sub: 'Accelerated track' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 section-divider"
    >
      {/* Subtle background orb */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* LEFT: Personal intro */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">About</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-white">
                Building at the edge of<br />
                <span className="text-gradient">what's possible</span>
              </h2>

              {/* Highlighted pull quote */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mb-6 pl-5 py-1 border-l-2 border-indigo-500/60"
              >
                <p className="text-base leading-relaxed text-gray-300">
                  I'm an AI-focused CS student completing my BS at the University of Minnesota
                  in two years — then heading to Columbia for my MS in Artificial Intelligence.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm leading-loose mb-6 text-gray-400"
              >
                My work spans computer vision pipelines (YOLOv12 at Divertica), software
                engineering at a fintech startup (Grit Financial), and leadership in the
                classroom — as Technical Lead of UMN's AI Club and a Coding Subgroup
                Lead for Engineering Without Borders.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-sm leading-loose text-gray-400"
              >
                Outside of engineering, I'm a competitive a cappella singer (bass / soloist)
                with Minnesota Fitoor and an Eagle Scout — because balance isn't optional,
                it's a design principle.
              </motion.p>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-600">
                Research Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item, i) => (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border cursor-default transition-all bg-white/3 border-white/10 text-gray-300 hover:border-indigo-500/40 hover:bg-indigo-500/10"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Stats grid */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {QUICK_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-6 rounded-2xl border transition-all duration-300 bg-white/3 border-white/8 hover:border-indigo-500/30 hover:bg-indigo-500/5"
                >
                  <div className="text-3xl font-black text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold mb-0.5 text-gray-200">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coursework callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 p-5 rounded-2xl border bg-gradient-to-br from-indigo-900/20 to-cyan-900/10 border-indigo-500/20"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-indigo-400">
                Key Coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Machine Learning', 'Computer Vision', 'NLP', 'Robotics',
                  'Advanced ML', 'AI II', 'Robot Vision', 'OS',
                  'Algorithms', 'Computer Graphics',
                ].map(c => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded font-mono bg-white/5 text-gray-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
