import { useState, useEffect, useMemo } from 'react'

// A full-screen grid of black squares that pop in (mode 'in') from a click
// origin to swallow the page, or pop out (mode 'out') to reveal it. The radial
// per-cell delay makes the blocks march outward in all directions.
const CELL = 46
const DUR = 130   // ms per square
const SPREAD = 460 // ms radial wave

function buildGrid(origin) {
  const vw = window.innerWidth, vh = window.innerHeight
  const cols = Math.ceil(vw / CELL) + 1
  const rows = Math.ceil(vh / CELL) + 1
  const maxDist = Math.max(
    Math.hypot(origin.x, origin.y),
    Math.hypot(vw - origin.x, origin.y),
    Math.hypot(origin.x, vh - origin.y),
    Math.hypot(vw - origin.x, vh - origin.y),
  ) || 1
  const cells = []
  let maxDelay = 0
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2
      const delay = (Math.hypot(cx - origin.x, cy - origin.y) / maxDist) * SPREAD
      if (delay > maxDelay) maxDelay = delay
      cells.push({ x: c * CELL, y: r * CELL, delay })
    }
  }
  return { cells, maxDelay }
}

export default function BlockTransition({ mode, origin, onComplete }) {
  const grid = useMemo(() => buildGrid(origin), [origin.x, origin.y])
  const [active, setActive] = useState(false)
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced) { const t = setTimeout(onComplete, 60); return () => clearTimeout(t) }
    // paint the initial state, then flip to run the transition
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setActive(true)))
    const t = setTimeout(onComplete, grid.maxDelay + DUR + 80)
    return () => { cancelAnimationFrame(raf); clearTimeout(t) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 'in' goes empty→filled; 'out' starts filled→empty.
  const filled = mode === 'in' ? active : !active

  if (reduced) {
    return <div className="fixed inset-0 z-[100] bg-black" aria-hidden="true" />
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true" style={{ pointerEvents: 'auto' }}>
      {grid.cells.map((cell, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: cell.x,
            top: cell.y,
            width: CELL + 1,
            height: CELL + 1,
            background: '#000',
            transformOrigin: 'center',
            transform: `scale(${filled ? 1 : 0})`,
            transition: `transform ${DUR}ms ease-out`,
            transitionDelay: `${cell.delay}ms`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
