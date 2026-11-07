# Prince — Portfolio (React + TypeScript + Vite)

## Run
Requires Node.js 18+ (https://nodejs.org).
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Edit your details
Everything personal lives in **`src/data/content.ts`** (name, email, socials, about, stats, projects, skills, services).
Page title/description: `index.html`. Colours and spacing: top of `src/styles.css`.

## 360° hero
Until you add frames, a placeholder bust rotates on scroll. To use your real portrait:
1. Record/generate a ~5s turntable of yourself (locked camera, plain background).
2. `ffmpeg -i turntable.mp4 -vf "fps=24,scale=1280:-1" frames/f_%04d.png`
3. Convert to WebP: `for f in frames/*.png; do cwebp -q 75 "$f" -o "${f%.png}.webp"; done`
4. Copy to `public/frames/desktop/` named `f_0001.webp … f_0120.webp`; set `hero.count` in content.ts to your frame count.
The last frame should match the first (crossfade the final ~8 frames into frame 1 if needed).

## Deploy
Push to GitHub, import the repo in Vercel (framework: Vite). Done.
