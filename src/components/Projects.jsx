import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ArrowUpRight, CheckCircle } from 'lucide-react'

// ─── Project data ─────────────────────────────────────────────────────────────
// `completed` projects are visually elevated:
//   • Emerald "Completed" badge with CheckCircle icon (vs amber pulse for WIPs)
//   • Full white title + gray-400 description (vs dimmer gray-100 / gray-500)
//   • Coloured hover border + shadow matched to the card accent
//   • Working GitHub link as a bottom CTA
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
    hoverBorder: 'hover:border-orange-500/55',
    hoverShadow: 'hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)]',
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
    hoverBorder: 'hover:border-cyan-500/40',
    hoverShadow: 'hover:shadow-[0_8px_32px_rgba(6,182,212,0.1)]',
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
    hoverBorder: 'hover:border-amber-500/40',
    hoverShadow: 'hover:shadow-[0_8px_32px_rgba(245,158,11,0.1)]',
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.015 }}
              className={`relative flex flex-col p-5 rounded-xl border bg-[#14142a] bg-gradient-to-br
                         cursor-default transition-all duration-250
                         ${project.color} ${project.border}
                         ${project.hoverBorder} ${project.hoverShadow}`}
            >
              {/* Status row */}
              <div className="flex items-center justify-between mb-3">
                {project.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider
                                   px-2 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                    <CheckCircle size={9} strokeWidth={2.5} />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider
                                   px-2 py-1 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-400">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    {project.status}
                  </span>
                )}

                {/* Icon-only GitHub link on completed; muted icon on WIPs */}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-0.5 opacity-60 hover:opacity-100
                               transition-opacity duration-200 ${project.accent}`}
                    aria-label="View on GitHub"
                  >
                    <Github size={13} />
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
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium cursor-default
                               transition-colors duration-200
                               ${project.completed
                                 ? 'bg-white/[0.08] text-gray-400 hover:bg-white/[0.13] hover:text-gray-300'
                                 : 'bg-white/5 text-gray-500 hover:bg-white/[0.08] hover:text-gray-400'
                               }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Full GitHub CTA — only on completed projects */}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold
                             opacity-60 hover:opacity-100 transition-opacity duration-200 ${project.accent}`}
                >
                  <Github size={12} />
                  github.com/adilarya/raytracer
                  <ArrowUpRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  />
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
            className="text-indigo-500 hover:text-indigo-400 transition-colors duration-200"
          >
            github.com/adilarya
          </a>
        </motion.p>
      </div>
    </section>
  )
}
