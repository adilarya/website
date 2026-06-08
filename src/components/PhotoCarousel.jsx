import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react'

// Photos live in public/album/. Ordered most-recent → oldest.
// `pos` is object-position (horizontal vertical) controlling the square crop.
const PHOTOS = [
  { file: 'university of minnesota graduation.JPG',   caption: 'University of Minnesota Graduation', date: 'May 2026',  pos: '50% 18%' },
  { file: "late night sf trip in winter 25'.jpeg",    caption: 'Late Night SF Trip',                date: 'Dec 2025',  pos: '50% 82%' },
  { file: "playing song at mom's 50th birthday.jpg", caption: "Singing at Mom’s 50th Birthday",     date: 'Sept 2025', pos: '50% 50%' },
  { file: 'boujee in the burj.jpeg',                  caption: 'Boujee in the Burj',                date: 'Jan 2025',  pos: '50% 72%' },
  { file: "fitoor 24' photoshoot.jpg",                caption: 'Fitoor Photoshoot',                 date: 'Sept 2024', pos: '50% 50%' },
]

const N = PHOTOS.length
const CARD = 250
const AUTOPLAY_MS = 4500
const srcOf = (file) => `/album/${encodeURIComponent(file)}`
const mod = (n, m) => ((n % m) + m) % m
const btn = 'flex-shrink-0 p-1.5 rounded-[2px] border border-line text-ink-soft hover:text-ink hover:border-ink/40 transition-colors'

export default function PhotoCarousel() {
  const [[index, dir], setState] = useState([0, 0])
  const [playing, setPlaying] = useState(true)
  const photo = PHOTOS[mod(index, N)]

  const paginate = useCallback((d) => setState(([i]) => [i + d, d]), [])

  // Auto-advance while playing; navigation resets the timer naturally.
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => paginate(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [playing, index, paginate])

  // Signed offset of card i from the active card, wrapped onto the circle.
  const offsetOf = (i) => {
    let o = i - mod(index, N)
    if (o > N / 2) o -= N
    if (o < -N / 2) o += N
    return o
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto w-[340px] sm:w-[400px]"
    >
      {/* 3D coverflow stage */}
      <div className="relative" style={{ height: CARD, perspective: 1200 }}>
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {PHOTOS.map((p, i) => {
            const o = offsetOf(i)
            const hidden = Math.abs(o) > 1
            return (
              <motion.div
                key={i}
                onClick={() => o !== 0 && setState(([cur]) => [cur + o, Math.sign(o)])}
                animate={{
                  x: o * 150,
                  z: -Math.abs(o) * 80,
                  rotateY: -o * 18,
                  scale: 1 - Math.abs(o) * 0.13,
                  opacity: hidden ? 0 : (o === 0 ? 1 : 0.5),
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: CARD,
                  height: CARD,
                  marginLeft: -CARD / 2,
                  transformStyle: 'preserve-3d',
                  zIndex: 30 - Math.abs(o) * 10,
                  pointerEvents: hidden ? 'none' : 'auto',
                  cursor: o !== 0 ? 'pointer' : 'default',
                }}
                className="rounded-[2px] overflow-hidden border border-line bg-paper-sunk shadow-[0_18px_45px_-22px_rgba(20,20,20,0.55)]"
              >
                <img
                  src={srcOf(p.file)}
                  alt={p.caption}
                  style={{ objectPosition: p.pos }}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Caption: description + date, centered */}
      <div className="mt-6 text-center">
        <p className="text-[13px] text-ink leading-snug">{photo.caption}</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">{photo.date}</p>
      </div>

      {/* Controls: prev · play/pause · next */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <button onClick={() => paginate(-1)} aria-label="Previous photo" className={btn}>
          <ArrowLeft size={15} />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className={btn}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button onClick={() => paginate(1)} aria-label="Next photo" className={btn}>
          <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  )
}
