# Vanessa Rebecca Konso — Portfolio

Personal portfolio of **Vanessa Rebecca Konso**, software engineer in Kampala, Uganda.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP** (ScrollTrigger, SplitText, Flip) and **Lenis** smooth scrolling.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (checks types too) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run cv` | Regenerate the downloadable CV PDF from `cv/cv.html` |

## Updating content

All content lives in `src/data/`. You never need to touch components to change text.

| File | Contains |
| --- | --- |
| `profile.ts` | Name, role, email, phones (`showPhone`), social links, hero text, photo, CV path |
| `experience.ts` | Jobs and the "path so far" milestones |
| `skills.ts` | Skill categories, logos and "where I've used it" notes |
| `projects.ts` | Projects, case-study text, links, previews, smaller work and ML studies. `galleryOrder` picks the six cards shown in "Selected work" (keep it a multiple of 3 for full rows); `otherWork` is the "Also built" list |
| `training.ts` | Education, certifications and the AI/ML pipeline stages |

### Project links and screenshots

- A link set to `null` is never rendered as a dead link — the card shows its `availability` note instead
  (e.g. "Private · company project"). Search `projects.ts` for `TODO` to find links still to add
  (Hugging Face demos, public repos).
- Each project shows a designed preview until you add a real screenshot: put the image in
  `public/projects/` and set `image: "/projects/your-file.png"` on that project.

### Photo

Replace `public/images/vanessa-rebecca-konso.jpg` (keep the name, or update `photo` in `profile.ts`).
The same photo is used in the social-share image (`src/app/opengraph-image.tsx`).

### CV

1. Edit `cv/cv.html`.
2. Run `npm run cv` (uses your installed Chrome or Edge; set `CHROME_PATH` if it isn't found).
3. The PDF is written to `public/cv/Vanessa-Rebecca-Konso-CV.pdf`, which every "Download CV" button links to.

## Deploying (Vercel — free)

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository and keep the default Next.js settings.
3. In **Settings → Environment Variables**, add
   `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://vanessa-konso.vercel.app` or your own domain).
   This is used for the canonical URL, search metadata and the social-share image link.
4. Redeploy. Every push to `main` deploys automatically.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: smooth scroll, pinned scenes and reveals switch off; content is shown statically.
- Keyboard: skip link, visible focus states, accessible tabs (arrow keys), native `<dialog>` for case studies.
- Text colours meet WCAG AA contrast in both themes.
- The hero canvas pauses when off-screen or in a background tab.
- Every route is statically prerendered.

## Project structure

```
src/
  app/            layout, page, global styles, favicon, social-share image
  components/
    hero/         hero + neural-constellation canvas
    sections/     About, Experience, Skills, Projects, AIML, Contact
    projects/     project cards, previews, links, case-study dialog
    layout/       navbar, footer, theme toggle, cursor, scroll progress
    motion/       Lenis smooth scroll and scroll-reveal controller
    ui/           buttons, icons, tags, portrait, local time
  data/           all editable content
  lib/            GSAP setup, scroll helpers, dialog event bridge
  assets/fonts/   Instrument Serif (OFL) for the social-share image
cv/               CV source (HTML)
scripts/          CV PDF builder
```
