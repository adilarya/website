import { motion } from 'framer-motion'
import { MapPin, Github, Linkedin, ArrowDown, ExternalLink } from 'lucide-react'

// Shared entrance animation factory — used throughout the left column
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

// ─── Avatar ───────────────────────────────────────────────────────────────────
// Profile photo at /profile.jpg (public/ root → served as /profile.jpg).
//
// Key rendering decisions:
//  • object-cover + object-top  → fills the circle, biases crop toward face
//  • overflow-hidden on the circle div  → hard-clips photo to the border-radius
//  • Glow ring: blur-xl (softer, more diffuse) instead of blur-md; reduced
//    opacity so it reads as ambient light, not a hard ring
//  • Outer div gets an explicit box-shadow for a secondary depth halo that
//    extends beyond the gradient ring — this is what gives the "premium" look
//  • whileHover on the circle scales up slightly; the photo counter-scales
//    so the face stays steady while the glow/border animates
const Avatar = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: 40 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="relative flex justify-center items-center"
  >
    {/* Ambient glow blobs */}
    <div className="absolute w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl -top-6 -left-6 animate-pulse" />
    <div
      className="absolute w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl bottom-0 right-0 animate-pulse"
      style={{ animationDelay: '1s' }}
    />

    {/* Rotating dashed rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-indigo-500/20"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-cyan-500/10"
    />

    {/* ── Photo container ──────────────────────────────────────────────────
        Outer div carries the secondary depth shadow (box-shadow). This sits
        outside the overflow:hidden circle so it isn't clipped.
        The gradient ring is blur-xl now — softer halo vs the old blur-md.   */}
    <div
      className="relative w-[260px] h-[260px] mt-8"
      style={{
        filter: 'drop-shadow(0 0 32px rgba(99,102,241,0.35)) drop-shadow(0 0 64px rgba(34,211,238,0.12))',
      }}
    >
      {/* Glow ring — blur-xl gives a wide, soft ambient halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-50 blur-xl scale-105 pointer-events-none" />

      {/* Photo circle
          group  → CSS hover target for the inner img scale
          whileHover scale  → ring + border expand slightly; photo counter-scales
          so the face stays anchored                                           */}
      <motion.div
        className="group relative w-full h-full rounded-full border-2 border-indigo-400/50 overflow-hidden bg-[#12121e] cursor-default"
        whileHover={{ scale: 1.04, borderColor: 'rgba(129,140,248,0.7)' }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Profile photo — primary visual, fills the circle edge-to-edge */}
        <img
          src="/profile.jpg"
          alt="Adil Arya"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]
                     transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Gradient overlay — darkens edges very slightly for depth;
            heavy enough at the bottom to let the floating badges read.
            Kept transparent in the middle so the face is never obscured.    */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-indigo-950/35 via-transparent to-indigo-900/10 pointer-events-none" />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-6 px-3 py-1.5 rounded-full text-xs font-semibold border
                   backdrop-blur-sm bg-indigo-500/35 border-indigo-500/50 text-indigo-300 whitespace-nowrap"
      >
        GPA 3.903
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -left-8 px-3 py-1.5 rounded-full text-xs font-semibold border
                   backdrop-blur-sm bg-cyan-500/35 border-cyan-500/50 text-cyan-300 whitespace-nowrap"
      >
        Columbia '28 →
      </motion.div>

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-8 -right-10 px-3 py-1.5 rounded-full text-xs font-semibold border
                   backdrop-blur-sm bg-violet-500/35 border-violet-500/50 text-violet-300 whitespace-nowrap"
      >
        AI / CV / NLP
      </motion.div>
    </div>
  </motion.div>
)

// ─── Hero section ─────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-600/8 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(129, 140, 248, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(129, 140, 248, 1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          {/* LEFT: Text content */}
          <div className="space-y-6 lg:space-y-8">

            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to research &amp; internship opportunities
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="text-white">Adil</span>
                <br />
                <span className="text-gradient">Arya</span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.3)}>
              <p className="text-lg sm:text-xl font-medium text-gray-300 leading-snug">
                AI-focused Computer Science student
                <br />
                <span className="text-base font-normal text-gray-500">
                  building ML systems at the intersection of research and engineering
                </span>
              </p>
            </motion.div>

            <motion.p
              {...fadeUp(0.4)}
              className="text-sm leading-relaxed max-w-xl font-mono border-l-2 border-indigo-500/50 pl-4 text-gray-400"
            >
              Building production-grade CV pipelines (YOLOv12, OCR, 630k+ classes),
              taking coursework across ML, NLP, Robot Vision, and Advanced ML — while
              completing a CS degree in 2 years at 3.903 GPA.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex items-center gap-2">
              <MapPin size={14} className="text-indigo-400" />
              <span className="text-sm font-medium tracking-wide text-gray-400">
                Minneapolis
                <span className="mx-2 text-indigo-400">→</span>
                New York
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(129,140,248,0.4)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-shadow duration-200"
              >
                Contact Me
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="px-6 py-3 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all duration-200 border-white/15 text-gray-300 hover:border-indigo-500/50 hover:text-white hover:bg-white/5"
              >
                View Resume
                <ExternalLink size={13} />
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-4 pt-1">
              <motion.a
                href="https://github.com/adilarya"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-sm transition-colors duration-200 text-gray-500 hover:text-gray-200"
              >
                <Github size={16} />
                <span>adilarya</span>
              </motion.a>
              <span className="text-gray-700">·</span>
              <motion.a
                href="https://www.linkedin.com/in/adilarya/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-sm transition-colors duration-200 text-gray-500 hover:text-gray-200"
              >
                <Linkedin size={16} />
                <span>adilarya</span>
              </motion.a>
              <span className="text-gray-700">·</span>
              <a
                href="mailto:adil.arya.biz@gmail.com"
                className="text-sm transition-colors duration-200 text-gray-500 hover:text-gray-200"
              >
                adil.arya.biz@gmail.com
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Avatar */}
          <div className="flex justify-center lg:justify-end lg:pr-8">
            <Avatar />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} className="text-gray-600" />
          </motion.div>
          <span className="text-xs tracking-widest uppercase text-gray-700">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
