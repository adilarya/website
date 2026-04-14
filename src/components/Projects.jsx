import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Github, ArrowUpRight, CheckCircle } from 'lucide-react'

// ─── Project data ─────────────────────────────────────────────────────────────
// `completed` projects get distinct visual treatment:
//   - full opacity, no "in progress" pulse badge
//   - emerald "Completed" chip
//   - working GitHub link rendered prominently
const PROJECTS = [
  {
    title: 'Ray Tracer',
    status: 'Completed',
    completed: true,
    tags: ['C++', 'Computer Graphics', 'Rendering'],
    description:
      'Built a ray tracer from scratch as part of Computer Graphics coursework. Implements ray–object intersection, Phong shading, reflections, and physically-based lighting from first principles.',
    color: 'from-orange-500/25 to-rose-500/10',
    border: 'border-orange-500/30',
    accent: 'text-orange-400',
    github: 'https://github.com/adilarya/raytracer',
  },
  {
    title: 'Retail Planogram Pipeline',
    status: 'In Progress',
    completed: false,
    tags: ['YOLOv12', 'OCR', 'Python', 'C++'],
    description:
      'Production-ready CV pipeline transforming 4K/60fps multi-angle video into structured retail planograms. Handles ~630k product class classifications.',
    color: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400',
    github: null,
  },
  {
    title: 'ML Curriculum — AI Club',
    status: 'In Progress',
    completed: false,
    tags: ['Teaching', 'PyTorch', 'Notebooks'],
    description:
      'Developing hands-on ML workshop series for 200+ members. Covers foundations through advanced topics: CNNs, transformers, fine-tuning.',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    github: null,
  },
]

export default function Projects() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="relative py-20 section-divider">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-baseline justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-500/50" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Built &amp; building <span className="text-gradient">in public</span>
            </h2>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`relative flex flex-col p-5 rounded-xl border bg-gradient-to-br transition-all duration-300 ${project.color} ${project.border} ${
                project.completed ? 'hover:border-orange-500/50' : 'hover:border-opacity-60'
              }`}
            >
              {/* Status badge row */}
              <div className="flex items-center justify-between mb-3">
                {project.completed ? (
                  // ── Completed badge — distinct from "In Progress" ──
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                    <CheckCircle size={9} strokeWidth={2.5} />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-400">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    {project.status}
                  </span>
                )}

                {/* GitHub link — prominent on completed projects, muted on WIPs */}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${project.accent} opacity-80 hover:opacity-100`}
                    aria-label="View on GitHub"
                  >
                    <Github size={12} />
                    <ArrowUpRight size={10} />
                  </a>
                ) : (
                  <Github size={13} className="text-gray-700" />
                )}
              </div>

              {/* Title */}
              <h3 className={`text-sm font-bold mb-2 ${project.completed ? 'text-white' : 'text-gray-100'}`}>
                {project.title}
              </h3>

              {/* Description */}
              <p className={`text-xs leading-relaxed mb-3 flex-1 ${project.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      project.completed
                        ? 'bg-white/8 text-gray-400'
                        : 'bg-white/5 text-gray-500'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Completed project: full GitHub CTA at bottom */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold transition-all group ${project.accent} opacity-70 hover:opacity-100`}
                >
                  <Github size={12} />
                  github.com/adilarya/raytracer
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-xs text-center text-gray-700"
        >
          More coming soon · GitHub:{' '}
          <a
            href="https://github.com/adilarya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            github.com/adilarya
          </a>
        </motion.p>
      </div>
    </section>
  )
}
