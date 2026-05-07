# [PROJECT NAME] — Bullet Website

Static site for [TBD — define URL when site is chosen].

## Prerequisites

No build tools required. Pure HTML/CSS/JS — open `public/index.html` directly or serve locally.

## Local Development

### Option 1: Python (no install needed)

```bash
python -m http.server 8080 --directory public
```

Open: http://localhost:8080

### Option 2: VS Code Live Server

1. Install **"Live Server"** by Ritwick Dey
2. Right-click `public/index.html` → **"Open with Live Server"**
3. Set root: `"liveServer.settings.root": "/public"`

### Option 3: Node

```bash
npx serve public
```

## Project Structure

See `CLAUDE.md` for full documentation, design tokens, dev rules, and phase plan.

## Adding Assets

| Asset type | Folder |
|------------|--------|
| Font files (.woff2) | `public/fonts/` |
| Images and renders | `public/images/` |
| Design handoff bundle | `design-reference/claude-design-export/` |
| Reference screenshots | `design-reference/screenshots/` |

## Deployment

Upload `public/` folder contents to the server root.

```bash
rsync -avz --delete public/ user@server:/var/www/[domain]/
```

Only `public/` is deployed. `CLAUDE.md`, `.claude/`, and `design-reference/` stay local.
