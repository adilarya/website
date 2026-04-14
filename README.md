# Adil Arya — Portfolio Website

A visually distinctive, recruiter-optimized personal portfolio built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Gantt-style timeline** showing parallel activities (Education, Experience, Extracurriculars)
- **Split-layout hero** with asymmetric design and floating accent badges
- **Dark / light mode** toggle with full system support
- **Framer Motion** animations throughout (on-scroll reveal, hover lifts, bar entry animations)
- **Mobile-first** responsive design
- **Production-quality** component structure

## 🚀 Quick Start

```bash
# 1. Navigate into the project folder
cd "Personal Website"

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open your browser to:
#    http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

## 🗂️ Project Structure

```
src/
├── App.jsx                  # Root app, dark/light mode state
├── main.jsx                 # React entry point
├── index.css                # Tailwind base + custom utilities
└── components/
    ├── Navbar.jsx            # Sticky navbar with scroll-aware active states
    ├── Hero.jsx              # Split hero: text left, avatar right
    ├── Timeline.jsx          # ★ Gantt-style multi-lane timeline (centerpiece)
    ├── About.jsx             # Asymmetric two-col with stats grid
    ├── Projects.jsx          # Minimal in-progress strip
    ├── Experience.jsx        # Work + education, logo badges
    ├── Skills.jsx            # Grouped skills with pip indicators
    ├── Achievements.jsx      # Awards + certifications
    ├── Contact.jsx           # Split layout CTA + links
    └── Footer.jsx            # Minimal footer
```

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components |
| Vite | Dev server + bundler |
| Tailwind CSS v3 | Styling |
| Framer Motion v11 | Animations |
| Lucide React | Icons |

## 🎨 Design System

**Colors (Dark Mode)**
- Background: `#09090f`
- Surface: `#12121e`
- Primary gradient: `indigo-400 → cyan-400` (`#818cf8 → #22d3ee`)
- Text: `gray-100` / `gray-400` / `gray-600`

**Typography**
- Body: Inter (Google Fonts)
- Code/mono: JetBrains Mono

**Key design decisions**
- Asymmetric layouts (no centered everything)
- Gantt chart as the layout centerpiece vs. typical card grids
- Glassmorphism-lite cards
- Subtle depth via layered shadows + glow effects

## 🗓️ Timeline Data

The Timeline component renders a true Gantt chart with date math:
- Start: September 2024
- End: September 2027
- Lanes: Education (2 rows), Experience (1 row), Extracurriculars (3 rows)
- Hover any bar for title, org, and description tooltip

To update timeline items, edit `src/components/Timeline.jsx` → `LANES` array.

## 📝 Adding Your Photo

Replace the `Avatar` component in `Hero.jsx`:

```jsx
// In Hero.jsx, replace the initials avatar with:
<img 
  src="/your-photo.jpg" 
  alt="Adil Arya" 
  className="w-full h-full object-cover rounded-full"
/>
```

Place your photo in the `/public` folder.

## 🌐 Deployment

**Vercel (recommended):**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Drag /dist folder to Netlify dashboard
```

**GitHub Pages:**
```bash
# Add to vite.config.js: base: '/repo-name/'
npm run build
# Push /dist to gh-pages branch
```
