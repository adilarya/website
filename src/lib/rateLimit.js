// Lightweight client-side rate limit for the contact form (no backend).
// Deters casual repeat/bot spam from a browser; not bulletproof (a determined
// bot can clear storage / switch device). For hard limits, use a backend/captcha.
const KEY = 'contact:sends'
const DAY = 24 * 60 * 60 * 1000
const COOLDOWN = 30 * 1000 // between any two sends
const MAX_PER_EMAIL = 3     // per email, per rolling 24h
const MAX_PER_DEVICE = 6    // total from this browser, per rolling 24h

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
const write = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list)) } catch { /* ignore */ }
}

export function checkContactRate(email) {
  const now = Date.now()
  const list = read().filter((e) => now - e.t < DAY)
  const last = list.reduce((m, e) => Math.max(m, e.t), 0)

  if (now - last < COOLDOWN) {
    const secs = Math.ceil((COOLDOWN - (now - last)) / 1000)
    return { ok: false, message: `Please wait ${secs}s before sending another message.` }
  }
  if (list.length >= MAX_PER_DEVICE) {
    return { ok: false, message: 'Too many messages from this device today — please try again tomorrow.' }
  }
  const mine = list.filter((e) => e.email === email.trim().toLowerCase()).length
  if (mine >= MAX_PER_EMAIL) {
    return { ok: false, message: 'You’ve hit the message limit for this email — please try again tomorrow.' }
  }
  return { ok: true }
}

export function recordContactSend(email) {
  const now = Date.now()
  const list = read().filter((e) => now - e.t < DAY)
  list.push({ email: email.trim().toLowerCase(), t: now })
  write(list)
}
