import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'
import { useTakeover } from '../takeover'
import { HACKATHONS } from '../data/hackathons'

const Logo3D = lazy(() => import('./Logo3D'))
const GOLD = '#ffd24a'
const shortAward = (h) => (h.award === '1st' ? '1st place' : h.award === 'finalist' ? 'finalist' : null)
const findBuild = (q) => {
  const s = (q || '').replace(/\.md$/i, '').replace(/\/+$/, '').toLowerCase()
  return HACKATHONS.find((h) => h.slug.toLowerCase() === s || h.name.toLowerCase() === s) || null
}
const err = (t) => <span className="text-[#ff6b6b]/85">{t}</span>

const COMMANDS = ['ls', 'cat', 'clear', 'exit']
const FILES = HACKATHONS.map((h) => `${h.slug}.md`)
const COMMAND_LIST = [
  { cmd: 'ls', use: 'list all builds' },
  { cmd: 'cat <file>', use: 'read a build' },
  { cmd: 'clear', use: 'clear the screen' },
  { cmd: 'exit', use: 'leave the terminal' },
]
const commonPrefix = (arr) => {
  if (!arr.length) return ''
  let p = arr[0]
  for (const s of arr) while (!s.startsWith(p)) p = p.slice(0, -1)
  return p
}
const optsNode = (arr) => (
  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-white/55">
    {arr.map((m) => <span key={m}>{m}</span>)}
  </div>
)
const renderCmd = (cmd) =>
  cmd === 'cat <file>' ? <><span>cat </span><span className="text-white/35">&lt;file&gt;</span></> : cmd

function Prompt() {
  return (
    <span className="whitespace-pre">
      <span style={{ color: '#74c0fc' }}>visitor@adil</span>
      <span className="text-white/40">:~/builds$ </span>
    </span>
  )
}

function LsRoot() {
  return (
    <div className="space-y-0.5">
      {HACKATHONS.map((h) => (
        <div key={h.slug} className="flex gap-3">
          <span className="w-40 shrink-0 text-white/85">{h.slug}.md</span>
          {h.award !== 'none'
            ? <span style={{ color: GOLD }}>★ {shortAward(h)}</span>
            : <span className="text-white/25">—</span>}
        </div>
      ))}
    </div>
  )
}

// The pretty "file viewer" — opens to the right when you `cat` a build.
function PreviewPanel({ h, onClose }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute inset-0 z-20 flex flex-col bg-[#0a0a0c] md:static md:z-auto md:w-[380px] md:shrink-0 md:border-l md:border-white/10"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] text-white/40">{h.slug}.md</span>
        <button onClick={onClose} aria-label="Close preview" className="text-white/40 transition-colors hover:text-[#ff6b6b]">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto h-32 w-32">
          <Suspense fallback={null}>
            <Logo3D kind={h.logo3d} instant className="h-full w-full" />
          </Suspense>
        </div>
        <div className="mt-5 text-center text-lg text-white">{h.name}</div>
        <div className="mt-1 text-center text-[11px] uppercase tracking-[0.14em] text-white/45">{h.hackathon}</div>
        {h.award !== 'none' && (
          <div className="mt-2 text-center text-[11px] uppercase tracking-[0.14em]" style={{ color: GOLD }}>★ {h.awardLabel}</div>
        )}
        <div className="my-6 border-t border-white/10" />
        <p className="text-[13px] leading-relaxed text-white/70">{h.description}</p>
        <a
          href={h.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="mt-6 inline-flex items-center gap-1.5 text-white/55 transition-colors hover:text-white"
        >
          <Github size={16} /> <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.aside>
  )
}

const INITIAL = [
  { type: 'cmd', text: 'ls' },
  { type: 'out', node: <LsRoot /> },
]

export default function Terminal() {
  const enter = useTakeover()
  const [lines, setLines] = useState(INITIAL)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [focused, setFocused] = useState(true)
  const [openFile, setOpenFile] = useState(null)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const runCommand = (raw) => {
    const cmd = raw.trim()
    const echo = { type: 'cmd', text: raw }
    if (!cmd) { setLines((l) => [...l, echo]); return }

    const parts = cmd.split(/\s+/)
    const name = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ')
    let node = null

    if (name === 'clear') { setLines([]); return }
    else if (name === 'ls' || name === 'dir') node = <LsRoot />
    else if (name === 'exit' || name === 'quit' || name === 'logout') {
      setLines((l) => [...l, echo, { type: 'out', node: 'logging out…' }])
      enter({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, '/projects')
      return
    }
    else if (name === 'cat') {
      if (!arg) node = err('cat: usage: cat <file>  (try `ls`)')
      else {
        const b = findBuild(arg)
        if (!b) node = err(`cat: no such file: ${arg}`)
        else { setOpenFile(b); node = <span className="text-white/40">→ opened {b.slug}.md in preview</span> }
      }
    }
    else node = err(`command not found: ${parts[0]} — try 'ls'`)

    setLines((l) => (node != null ? [...l, echo, { type: 'out', node }] : [...l, echo]))
  }

  const complete = () => {
    const parts = input.split(/ +/)
    const cur = parts[parts.length - 1]
    let candidates = []
    if (parts.length === 1) candidates = COMMANDS
    else if (parts[0].toLowerCase() === 'cat') candidates = FILES
    const matches = candidates.filter((c) => c.startsWith(cur.toLowerCase()))
    if (matches.length === 0) return
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0]
      setInput(parts.join(' ') + (parts.length === 1 ? ' ' : ''))
      return
    }
    const cp = commonPrefix(matches)
    if (cp.length > cur.length) {
      parts[parts.length - 1] = cp
      setInput(parts.join(' '))
    } else {
      setLines((l) => [...l, { type: 'out', node: optsNode(matches) }])
    }
  }

  const navHistory = (dir) => {
    if (history.length === 0) return
    let idx = histIdx === -1 ? history.length : histIdx
    idx += dir
    if (idx < 0) idx = 0
    if (idx >= history.length) { setHistIdx(-1); setInput(''); return }
    setHistIdx(idx)
    setInput(history[idx])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = input
      runCommand(v)
      if (v.trim()) setHistory((h) => [...h, v])
      setHistIdx(-1)
      setInput('')
    } else if (e.key === 'Tab') { e.preventDefault(); complete() }
    else if (e.key === 'ArrowUp') { e.preventDefault(); navHistory(-1) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); navHistory(1) }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]) }
  }

  // Clicking a command in the top bar: run it, or prefill `cat ` for files.
  const onPanel = (cmd) => {
    if (cmd === 'cat <file>') { setInput('cat '); inputRef.current?.focus(); return }
    runCommand(cmd)
    if (cmd !== 'clear') setHistory((h) => [...h, cmd])
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-black font-mono">
      {/* commands — always visible up top, on one line */}
      <header className="shrink-0 border-b border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] sm:px-6 sm:text-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          {COMMAND_LIST.map((c) => (
            <button key={c.cmd} onClick={() => onPanel(c.cmd)} className="group focus-visible-ring">
              <span className="text-white/90 transition-colors group-hover:text-white">{renderCmd(c.cmd)}</span>
              <span className="ml-2 text-white/40">{c.use}</span>
            </button>
          ))}
        </div>
      </header>

      {/* body: terminal | preview */}
      <div className="relative flex min-h-0 flex-1">
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-4 text-[13px] leading-relaxed text-white/80 selection:bg-white/20 sm:px-6 sm:py-6 sm:text-sm"
        >
          {lines.map((ln, i) =>
            ln.type === 'cmd' ? (
              <div key={i} className="flex flex-wrap">
                <Prompt />
                <span className="whitespace-pre-wrap break-all text-white">{ln.text}</span>
              </div>
            ) : (
              <div key={i} className="max-w-4xl py-0.5">{ln.node}</div>
            )
          )}

          <div className="relative flex flex-wrap">
            <Prompt />
            <span className="whitespace-pre-wrap break-all text-white">{input}</span>
            {focused && <span className="term-cursor" aria-hidden="true" />}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="terminal input"
              className="absolute inset-0 h-full w-full cursor-text opacity-0"
            />
          </div>

          <div className="h-6" />
        </div>

        <AnimatePresence>
          {openFile && (
            <PreviewPanel
              h={openFile}
              onClose={() => { setOpenFile(null); inputRef.current?.focus() }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
