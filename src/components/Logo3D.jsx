import { useEffect, useRef, useState } from 'react'
import { createLogoInstance } from '../lib/logo3d'

// Renders a 3D logo mark (kind = 'grit' | 'divertica') into a tile. Continuous
// flat spin + drag-to-spin. Lazy-loaded so Three.js only ships on the
// Experience page. Fades itself in once the first frame has rendered, so it
// never pops or flashes the 2D logo.
export default function Logo3D({ kind, className, instant, spinOnHover }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    let inst
    let raf1, raf2
    try {
      inst = createLogoInstance(ref.current, kind, { spinOnHover })
      // Reveal once a frame has painted so we never show a blank canvas.
      // `instant` skips the fade (used in the popup so the morph doesn't load-in).
      raf1 = requestAnimationFrame(() => {
        if (instant) setReady(true)
        else raf2 = requestAnimationFrame(() => setReady(true))
      })
    } catch (e) {
      console.error('3D logo failed to init:', kind, e)
      setReady(true)
    }
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      inst?.dispose()
    }
  }, [kind, instant, spinOnHover])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative ${instant ? '' : 'transition-opacity duration-300'} ${ready ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
    />
  )
}
