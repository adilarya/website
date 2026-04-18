import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react'

const LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mr.adil.arya@gmail.com',
    href: 'mailto:mr.adil.arya@gmail.com',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/50',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/adilarya',
    href: 'https://www.linkedin.com/in/adilarya/',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    hoverBorder: 'hover:border-sky-500/50',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/adilarya',
    href: 'https://github.com/adilarya',
    color: 'text-gray-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
    hoverBorder: 'hover:border-white/30',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 section-divider overflow-hidden bg-[#0c0c18]"
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-indigo-600/8 blur-[80px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">

          {/* Left: CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-500/50" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400">Contact</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6 text-white">
              Let's build<br />
              <span className="text-gradient">something</span><br />
              together.
            </h2>

            <p className="text-sm leading-relaxed mb-8 max-w-sm text-gray-400">
              I'm actively looking for research opportunities, ML/AI internships, and
              interesting collaborations. Whether you have a project idea or just want to
              talk AI — reach out.
            </p>

            <motion.a
              href="mailto:mr.adil.arya@gmail.com"
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(129,140,248,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200"
            >
              <Mail size={16} />
              Send me an email
              <ArrowUpRight size={14} className="opacity-70" />
            </motion.a>

            <p className="mt-4 text-xs text-gray-700">
              I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right: Contact links */}
          <div className="space-y-3">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ x: -4, scale: 1.01 }}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${link.bg} ${link.border} ${link.hoverBorder}`}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${link.bg} border ${link.border}`}>
                  <link.icon size={18} className={link.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-widest mb-0.5 text-gray-600">
                    {link.label}
                  </div>
                  <div className="text-sm font-medium truncate text-gray-200">
                    {link.value}
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${link.color}`}
                />
              </motion.a>
            ))}

            {/* Location note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-4 rounded-xl border text-xs text-center bg-[#14142a] border-hairline text-gray-500"
            >
              📍 Based in Minneapolis · Moving to New York, Fall 2026
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
