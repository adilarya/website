import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { checkContactRate, recordContactSend } from '../lib/rateLimit'

// ─── Message delivery ───────────────────────────────────────────────────────────
// Default: Web3Forms (no backend — submissions land in your email inbox).
// 1. Go to https://web3forms.com, enter your email, copy the free access key.
// 2. Paste it below. That's it.
// (Prefer a Vercel serverless function + Resend instead? Say the word and I'll
//  swap this fetch for a POST to /api/contact.)
const WEB3FORMS_ACCESS_KEY = '9b9e6930-88e7-46f5-966c-77fda0c0e17d'

// ─── Bot protection: Cloudflare Turnstile (free, near-invisible captcha) ──────
// 1. Create a Turnstile widget at https://dash.cloudflare.com → Turnstile.
// 2. Paste the SITE key below (public — safe to commit).
// 3. Paste the SECRET key into your Web3Forms dashboard → your form →
//    Spam Protection → Cloudflare Turnstile, so it verifies server-side.
// Leave blank to disable (the form still works without it).
const TURNSTILE_SITE_KEY = '0x4AAAAAADgnvJJmmLS_tQVm'

function loadTurnstile() {
  return new Promise((resolve) => {
    if (window.turnstile) return resolve()
    const existing = document.querySelector('script[data-turnstile]')
    if (existing) return existing.addEventListener('load', () => resolve())
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.defer = true
    s.dataset.turnstile = '1'
    s.onload = () => resolve()
    document.head.appendChild(s)
  })
}

const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted mb-1.5">
        {label}
      </span>
      {children}
    </label>
  )
}

const INPUT_BASE =
  'w-full bg-white rounded-[2px] border px-3 py-2.5 text-sm text-ink ' +
  'placeholder:text-ink-muted focus:outline-none transition-colors'

export default function ContactModal({ open, onClose }) {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError]   = useState('')
  const [errors, setErrors] = useState({})     // per-field validity { name, email, ... }
  const [captchaToken, setCaptchaToken] = useState('')
  const firstFieldRef = useRef(null)
  const widgetRef = useRef(null)
  const widgetIdRef = useRef(null)

  // Reset to a clean slate each time it opens.
  useEffect(() => {
    if (open) {
      setForm(EMPTY)
      setStatus('idle')
      setError('')
      setErrors({})
      setCaptchaToken('')
      const t = setTimeout(() => firstFieldRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [open])

  // Esc to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  // Render the Turnstile widget while the modal is open (if a site key is set).
  useEffect(() => {
    if (!open || !TURNSTILE_SITE_KEY) return
    let cancelled = false
    loadTurnstile().then(() => {
      if (cancelled || !widgetRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setCaptchaToken(token),
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
      })
    })
    return () => {
      cancelled = true
      setCaptchaToken('')
      try { if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current) } catch { /* ignore */ }
      widgetIdRef.current = null
    }
  }, [open])

  const resetCaptcha = () => {
    setCaptchaToken('')
    try { window.turnstile?.reset?.(widgetIdRef.current) } catch { /* ignore */ }
  }

  const cls = (field) =>
    `${INPUT_BASE} ${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-ink/20 focus:border-ink'}`

  // Update a field, and clear its red highlight as soon as the user types.
  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(prev => (prev[k] ? { ...prev, [k]: false } : prev))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const errs = {}
    if (!form.name.trim())    errs.name = true
    if (!form.email.trim())   errs.email = true
    if (!form.subject.trim()) errs.subject = true
    if (!form.message.trim()) errs.message = true
    if (Object.keys(errs).length) {
      setErrors(errs)
      setError('Please fill in the highlighted fields.')
      return
    }
    if (!EMAIL_RE.test(form.email)) {
      setErrors({ email: true })
      setError('That email doesn’t look right.')
      return
    }
    setErrors({})

    const rate = checkContactRate(form.email)
    if (!rate.ok) {
      setError(rate.message)
      return
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Please complete the “I’m human” check below.')
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setError('The form isn’t connected yet — add your delivery key to enable sending.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Personal Website] ${form.subject}`,
          message: form.message,
          from_name: form.name,
          replyto: form.email,
          botcheck: '',
          'cf-turnstile-response': captchaToken,
        }),
      })
      const data = await res.json()
      if (data.success) {
        recordContactSend(form.email)
        setStatus('success')
      } else {
        setStatus('error')
        setError(data.message || 'Something went wrong. Please try again.')
        resetCaptcha()
      }
    } catch {
      setStatus('error')
      setError('Network error — please try again in a moment.')
      resetCaptcha()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-ink/40 supports-[backdrop-filter]:backdrop-blur-sm" />

          {/* panel */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md bg-white border border-ink/15 rounded-[2px] shadow-[0_30px_80px_-30px_rgba(20,20,20,0.5)] p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-[2px] text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="py-6 text-center">
                <h3 className="display text-2xl">Thanks — it’s on its way.</h3>
                <p className="mt-3 text-sm text-ink-soft">
                  I’ll get back to you at <span className="text-ink">{form.email}</span> soon.
                </p>
                <button onClick={onClose} className="btn-base btn-ghost mt-6 px-5 py-2.5 text-sm">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="display text-2xl sm:text-[1.75rem] mb-1">Get in touch.</h3>
                <p className="text-sm text-ink-soft mb-6">
                  Tell me a little about why you’re reaching out and I’ll reply by email.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <Field label="Preferred name">
                    <input
                      ref={firstFieldRef}
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="What should I call you?"
                      className={cls('name')}
                      aria-invalid={!!errors.name}
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      className={cls('email')}
                      aria-invalid={!!errors.email}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Subject">
                    <input
                      type="text"
                      value={form.subject}
                      onChange={set('subject')}
                      placeholder="What’s this about?"
                      className={cls('subject')}
                      aria-invalid={!!errors.subject}
                    />
                  </Field>

                  <Field label="Message">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="A few sentences is plenty."
                      className={`${cls('message')} resize-none`}
                      aria-invalid={!!errors.message}
                    />
                  </Field>

                  {error && (
                    <p className="text-sm text-red-600 border-l-2 border-red-500 pl-3" role="alert">
                      {error}
                    </p>
                  )}

                  {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="flex justify-center" />}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-base btn-primary w-full justify-center px-5 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
