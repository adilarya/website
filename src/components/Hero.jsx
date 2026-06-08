import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Linkedin, ArrowUpRight } from 'lucide-react'
import PhotoCarousel from './PhotoCarousel'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">

          <div>
            <motion.div {...rise(0.05)} className="mb-6">
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#6f6f6f]">
                Open to research &amp; internships
              </span>
            </motion.div>

            <motion.h1 {...rise(0.12)} className="display text-[3.25rem] sm:text-7xl lg:text-[5.25rem]">
              Adil Arya
            </motion.h1>

            <motion.p {...rise(0.2)} className="mt-5 text-lg sm:text-xl text-ink-soft max-w-measure leading-relaxed">
              AI-focused Computer Science student building machine-learning systems at the
              intersection of <span className="text-ink italic font-serif">research</span> and{' '}
              <span className="text-ink italic font-serif">engineering</span>.
            </motion.p>

            <motion.p {...rise(0.28)} className="mt-5 max-w-measure text-[0.95rem] leading-relaxed text-ink-soft border-l border-ink/25 pl-4">
              I build production computer-vision and ML systems (YOLO, OCR, ~630K classes) and
              award-winning hackathon projects — and write the fundamentals from scratch to really
              understand them. Finished a CS degree in two years, attending Columbia for an MS in AI.
            </motion.p>

            <motion.div {...rise(0.36)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-base btn-primary px-6 py-3 text-sm">
                See my work
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-ghost px-6 py-3 text-sm"
              >
                Résumé
                <ArrowUpRight size={15} />
              </a>
            </motion.div>

            <motion.div {...rise(0.44)} className="mt-7 flex items-center gap-4 text-ink-soft">
              <a
                href="https://github.com/adilarya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-ink transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/adilarya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-ink transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
          </div>

          <div className="order-first lg:order-last">
            <PhotoCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
