import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BlockTransition from './components/BlockTransition'

// enter(origin, dest): black blocks swallow the screen from `origin`, the route
// changes to `dest` at full black, then the blocks recede to reveal it.
const TakeoverCtx = createContext(() => {})
export const useTakeover = () => useContext(TakeoverCtx)

export function TakeoverProvider({ children }) {
  const navigate = useNavigate()
  const [t, setT] = useState(null) // { phase: 'in' | 'out', origin, dest }

  const enter = useCallback((origin, dest) => {
    setT({ phase: 'in', origin, dest })
  }, [])

  // Defined in render so its closure has the current `t`. The overlay is keyed
  // by phase, so the 'out' instance remounts with this turn's handler.
  const handleComplete = () => {
    if (!t) return
    if (t.phase === 'in') {
      navigate(t.dest)
      setT({ ...t, phase: 'out' })
    } else {
      setT(null)
    }
  }

  return (
    <TakeoverCtx.Provider value={enter}>
      {children}
      {t && (
        <BlockTransition key={t.phase} mode={t.phase} origin={t.origin} onComplete={handleComplete} />
      )}
    </TakeoverCtx.Provider>
  )
}
