import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    icon: '{ }',
    color: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/20',
    labelColor: 'text-indigo-400',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'C++', level: 4 },
      { name: 'Java', level: 3 },
      { name: 'JavaScript', level: 3 },
      { name: 'SQL', level: 3 },
    ],
  },
  {
    category: 'AI / ML Frameworks',
    icon: '⚡',
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    labelColor: 'text-cyan-400',
    skills: [
      { name: 'PyTorch', level: 4 },
      { name: 'OpenCV', level: 5 },
      { name: 'YOLOv12', level: 5 },
      { name: 'scikit-learn', level: 4 },
      { name: 'TensorFlow', level: 3 },
      { name: 'NumPy / Pandas', level: 4 },
      { name: 'HuggingFace', level: 3 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠',
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20',
    labelColor: 'text-violet-400',
    skills: [
      { name: 'Git / GitHub', level: 4 },
      { name: 'Linux', level: 4 },
      { name: 'Jupyter', level: 4 },
      { name: 'VS Code', level: 4 },
      { name: 'React', level: 3 },
      { name: 'Vite', level: 3 },
    ],
  },
  {
    category: 'Concepts',
    icon: '🧠',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
    labelColor: 'text-amber-400',
    skills: [
      { name: 'Computer Vision', level: 5 },
      { name: 'NLP / LLMs', level: 4 },
      { name: 'RAG Systems', level: 3 },
      { name: 'ML Pipelines', level: 5 },
      { name: 'Algorithms & DS', level: 4 },
      { name: 'Robotics', level: 3 },
      { name: 'OS Internals', level: 3 },
    ],
  },
]

function SkillPip({ filled }) {
  return (
    <div className={`w-1.5 h-1.5 rounded-full transition-all ${
      filled
        ? 'bg-gradient-to-r from-indigo-400 to-cyan-400'
        : 'bg-white/10'
    }`} />
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-24 section-divider bg-[#0b0b16]">
      {/* Background detail */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/4 blur-[100px]" />
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
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Technical <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        {/* Skill groups grid — intentionally asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              whileHover={{ y: -2 }}
              className={`p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:border-opacity-60 ${group.color} ${group.border}`}
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg leading-none">{group.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${group.labelColor}`}>
                  {group.category}
                </span>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.04 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(pip => (
                        <SkillPip key={pip} filled={pip <= skill.level} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex items-center justify-end gap-4 text-xs text-gray-700"
        >
          <span>Proficiency:</span>
          {[
            { label: 'Familiar', level: 1 },
            { label: 'Proficient', level: 3 },
            { label: 'Expert', level: 5 },
          ].map(({ label, level }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(pip => (
                  <SkillPip key={pip} filled={pip <= level} />
                ))}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
