import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// NOTE: This copy is a strong first draft in your voice — edit freely.
const FACTS = [
  { k: 'Currently',  v: 'SWE intern at Grit Financial' },
  { k: 'Up next',    v: 'MS in AI at Columbia, Fall ’26' },
  { k: 'On stage',   v: 'Bass / soloist, Minnesota Fitoor' },
  { k: 'Earned',     v: 'Eagle Scout' },
  { k: 'Based in',   v: 'Minneapolis → New York' },
]

export default function WhoIAm() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="whoami" ref={ref} className="relative pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <span className="eyebrow">Who I am</span>
          <h2 className="display text-3xl sm:text-[2.5rem] mt-5 max-w-2xl">
            I like building things that have to actually work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 text-[1.05rem] leading-relaxed text-ink-soft"
          >
            <p>
              I&apos;m compressing a computer-science degree into two years — not to rush it, but
              because I&apos;d rather be doing the work than waiting to. Most of that work lives where
              machine learning meets real systems: a computer-vision pipeline at Divertica that turned
              raw video into something a business could actually use, and full-stack engineering at a
              fintech startup where the code has to hold up under real money and real users.
            </p>
            <p>
              Before any of the engineering, there was music. I sing bass and solo with{' '}
              <span className="text-ink">Minnesota Fitoor</span>, a competitive a cappella group —
              we&apos;ve placed second at Gathe Raho and Awaazein and performed at A3. Standing on a
              stage in front of a few thousand people teaches you something that debugging never will:
              how to stay composed when there&apos;s no undo button.
            </p>
            <p>
              The rest of who I am is mostly about showing up. I&apos;m an Eagle Scout. I led the coding
              team for an Engineers Without Borders project in Guatemala, and I teach machine learning
              to a 200-plus-member club because the fastest way to understand something is to explain it
              to someone else.
            </p>
            <p className="text-ink">
              I&apos;m looking for research and engineering work where the goal is something real — and
              the bar is whether it holds up.
            </p>
          </motion.div>

          {/* Facts */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="border-t border-ink/15">
              {FACTS.map(f => (
                <div key={f.k} className="py-4 border-b border-line">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {f.k}
                  </div>
                  <div className="mt-0.5 text-[0.95rem] text-ink">{f.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
