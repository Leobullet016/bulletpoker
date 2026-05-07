# CLAUDE.md — [PROJECT NAME] Website

## Project Context

**Company:** Bullet (bullet.cash) — blockchain-native fintech for the poker ecosystem. HQ in Vancouver, regulated by FINTRAC.

**Goal:** [TBD — define when site is chosen: landing page / product page / microsite / other]

**URL:** [TBD — e.g. poker.bullet.cash]

**Language:** [TBD — English / Portuguese / both]

**Central Value Proposition:** [TBD]

**Key Value Arguments:**
1. [TBD]
2. [TBD]
3. [TBD]

---

## Stack

- HTML5 + CSS3 + JavaScript vanilla
- NO build tools, NO frameworks, NO CMS, NO runtime dependencies
- Zero Node modules in production
- Hosting: Bullet's own server (static folder upload)

---

## Design System — Bullet Tokens

### Colors

| Token                    | Value     | Usage                    |
|--------------------------|-----------|--------------------------|
| `--color-bg-primary`     | `#161616` | Main background          |
| `--color-bg-secondary`   | `#0e0e0e` | Secondary background     |
| `--color-text-primary`   | `#F8F3E9` | Main text                |
| `--color-accent`         | `#C2F141` | CTAs, highlights, accent |

> Add project-specific tokens below if the design diverges from the standard Bullet palette.

### Typography

- **Font:** [TBD — Open Sans (locally served) or project-specific font]
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:** defined in `tokens.css`

### Aesthetic

- Dark mode, minimal, premium fintech
- Matte charcoal backgrounds
- Lime green accent (#C2F141)
- [TBD — visual direction: 3D renders / illustrations / photography / other]

---

## File Structure

```
[project-root]/
├── CLAUDE.md                    ← This file
├── README.md                    ← Dev instructions
├── .claude/
│   └── agents/
│       ├── frontend.md          ← HTML/CSS/animation specialist
│       ├── backend.md           ← Static infra/deployment specialist
│       ├── infra.md             ← Asset pipeline/optimization specialist
│       └── reviewer.md         ← Code review/best practices specialist
├── design-reference/
│   ├── claude-design-export/    ← Design handoff bundle (add here)
│   └── screenshots/             ← Reference screenshots (add here)
└── public/                      ← Deployable root (upload this folder)
    ├── index.html
    ├── 404.html
    ├── robots.txt
    ├── sitemap.xml
    ├── site.webmanifest
    ├── css/
    │   ├── tokens.css           ← CSS custom properties (design tokens)
    │   ├── reset.css            ← CSS reset/normalize
    │   ├── base.css             ← Typography, body defaults, @font-face
    │   ├── layout.css           ← Page layout, grid, section structure
    │   ├── components.css       ← UI components (buttons, cards, accordion)
    │   └── responsive.css       ← Media queries, breakpoint overrides
    ├── js/
    │   └── main.js              ← Vanilla JS (interactive components)
    ├── fonts/                   ← .woff2 files (add here)
    └── images/                  ← Visual assets (add here)
```

---

## Site Sections

> **[TBD — fill in when site is defined]**
>
> Template from LP_Bullet for reference:
>
> | # | Section | Description |
> |---|---------|-------------|
> | 1 | **Header** | Logo left, CTA button right |
> | 2 | **Hero** | Headline + subtitle + CTA + visual |
> | 3 | **[Section Name]** | [description] |
> | 4 | **[Section Name]** | [description] |
> | 5 | **[Section Name]** | [description] |
> | 6 | **[Section Name]** | [description] |
> | 7 | **FAQ** | Accordion with key questions |
> | 8 | **Footer** | Logo + columns + FINTRAC compliance |

---

## Development Rules

### HTML

- Always semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Use `aria-label` on all interactive elements without visible labels
- All images must have descriptive `alt` attributes (or `alt=""` if decorative)
- Use `<picture>` with WebP + fallback for all images
- First element in `<body>` must be a skip-to-content link

### CSS

- **Mobile-first**: base styles target 320px, override upward via `min-width` queries
- **Token-only values**: no hardcoded colors or sizes — always use CSS custom properties
- **Architecture**: load order is mandatory — `reset → tokens → base → layout → components → responsive`
- **Modern CSS only**: Grid, Flexbox, custom properties — no floats
- **Comment sections**: every CSS block must indicate which section it belongs to

### JavaScript

- Vanilla JS only — no libraries, no frameworks, no CDN scripts
- All `<script>` tags use `defer` attribute
- Use `addEventListener` — no inline event handlers
- Graceful degradation: site must be usable without JS

### Performance

- All fonts served locally (zero Google Fonts or CDN font requests)
- Preload critical fonts with `<link rel="preload">`
- Images: WebP with JPEG/PNG fallback via `<picture>`
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Videos: re-encode to H.264 + WebM, max 5MB per loop background, pause off-screen via IntersectionObserver

### Accessibility (WCAG 2.1 AA minimum)

- Color contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI components
- All interactive elements keyboard-navigable with visible focus styles
- FAQ accordion must follow ARIA disclosure pattern
- No content conveyed by color alone

### Asset Naming Convention

- **Always kebab-case**: `hero-phone.webp`, not `HeroPhone.webp` or `hero_phone.webp`
- **No spaces** in filenames — breaks URL encoding
- **No double extensions**: `.png.png`, `.jpg.jpeg` are bugs, not features
- **No typos**: double-check filenames before referencing in HTML

### SEO Baseline (lessons from LP_Bullet)

- `og:image` must exist as a real file (1200×630px) before launch — broken previews on LinkedIn/WhatsApp/Slack
- `FAQPage` JSON-LD schema enables rich results and LLM extraction — implement alongside FAQ section
- `privacy-policy.html` and `terms.html` must be in `sitemap.xml`
- Include `/llms.txt` and `/llms-full.txt` for AI crawler readability
- All CTA `href` values must point to real destinations — never ship with `href="#"`
- Instagram/social handles must be consistent across all pages and in `Organization` schema

---

## Using the Agents

| Agent | Invoke | Handles |
|-------|--------|---------|
| `frontend` | `/frontend` | HTML, CSS, animations, responsiveness |
| `backend` | `/backend` | Server config, robots, sitemap, deployment |
| `infra` | `/infra` | Asset pipeline, image optimization, WebP conversion, file integrity, cache busting |
| `reviewer` | `/reviewer` | Code review, best practices, accessibility, performance |

> Copy (text content) is provided directly by you — no agent needed.

---

## Project Phases

| Phase | Status | Description |
|-------|--------|-------------|
| **0 — Briefing** | ⬜ | Define site goal, sections, copy, visual direction |
| **1 — Setup** | ✅ Done | Folder structure, CLAUDE.md, agents, CSS scaffolds |
| **2 — Tokens & Reset** | ⬜ | CSS custom properties, reset, base typography, @font-face |
| **3 — Hero & Header** | ⬜ | Sections 1–2, first visual implementation |
| **4 — Content Sections** | ⬜ | Body sections, all content |
| **5 — FAQ & Footer** | ⬜ | Accordion JS, footer layout |
| **6 — Polish & Deploy** | ⬜ | Performance, SEO, accessibility audit, production deploy |

---

## Useful Commands

```bash
# Serve locally
python -m http.server 8080 --directory public

# Or with Node
npx serve public

# Validate HTML
# https://validator.w3.org/

# Run Lighthouse
# Chrome DevTools → Lighthouse → Generate report
```

---

## Known Pitfalls (documented from LP_Bullet build)

| Issue | What went wrong | Rule |
|---|---|---|
| `og-image.png` missing | File declared in meta but never added to `public/images/` | Always create the OG image as the first asset |
| Double extensions | `wallet.png.png`, `Backgroundhero.png.png` — broke `<picture>` fallback | infra agent must scan for double extensions before every deploy |
| Video size | 66MB total video, 33MB in the first fold — LCP > 8s on mobile | Max 5MB per background loop; always provide `.webm` alongside `.mp4` |
| `href="#"` CTAs | All 3 "Join now" CTAs had no destination at launch | CTA href is a required field — define destination in Phase 0 |
| Social handle mismatch | `instagram.com/minhabullet` in index, `instagram.com/bullet.borderless` in manifest | Single source of truth in `tokens.css` or CLAUDE.md; copy-paste once |
| Filename spaces | `Background_Banks Break.mp4` — URL encoding issues in some browsers | Enforce kebab-case on all filenames from day one |
