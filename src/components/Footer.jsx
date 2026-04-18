import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative py-10 section-divider bg-[#09090f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              AA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-300">
                Adil Arya
              </p>
              <p className="text-xs text-gray-700">
                AI/ML Engineer · Minneapolis → New York
              </p>
            </div>
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-5 text-xs text-gray-700">
            {['Timeline', 'About', 'Experience', 'Skills', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors hover:text-gray-400"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right: Social + copyright */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/adilarya', icon: Github },
                { href: 'https://www.linkedin.com/in/adilarya/', icon: Linkedin },
                { href: 'mailto:mr.adil.arya@gmail.com', icon: Mail },
              ].map(({ href, icon: Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -1 }}
                  className="btn-ghost p-1.5 rounded-lg"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] text-gray-800">
              © {year} Adil Arya · Built with React + Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
