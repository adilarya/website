import { ArrowUpRight } from 'lucide-react'

export default function HackerHallEntry({ onEnter }) {
  return (
    <div className="inline-flex items-center">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink">Browse Hackathon projects on the</span>

      <button
        type="button"
        onClick={onEnter}
        aria-label="Enter the Terminal"
        className="group ml-2.5 inline-flex items-center gap-1.5 rounded-[2px] bg-[#0a0a0c] px-2.5 py-1.5 focus-visible-ring"
      >
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-white">Terminal</span>
        <ArrowUpRight size={13} className="text-white" />
      </button>
    </div>
  )
}
