## LVHN Jumper Server Documentation Portal

This folder contains the Ionic Health documentation portal based on the [Pinexio](https://github.com/sanjayc208/pinexio) template (Next.js 15 + Tailwind CSS 4 + MDX + Contentlayer).  
All LVHN-specific documentation lives in `docs/` as MDX and is surfaced automatically in the sidebar, table of contents, and search.

### Local development

```bash
pnpm install          # installs dependencies with the lockfile included in the template
pnpm dev              # starts the dev server on http://localhost:3000
pnpm lint             # runs next lint
pnpm build && pnpm start   # builds and serves the static export locally
```

The build command outputs a static site (SSG). The Vercel project should use:

- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `.next` (Vercel handles static export automatically)

### Adding or updating documentation

1. Place new MDX files under `docs/`. The folder structure becomes the slug (e.g. `docs/operations/method-of-procedure.mdx` → `/docs/operations/method-of-procedure`).
2. Include frontmatter with at least a `title`. Optional fields: `description`, `date`.
3. Update `config/sidebar.tsx` to expose the page in navigation. Each section entry contains `title`, `href`, `icon`, and `pages`.
4. Run `pnpm lint` and `pnpm build` to ensure Contentlayer ingests the content without warnings.

### Pre-loaded LVHN documents

- `docs/overview/*` – Project proposal, implementation plan, functional design, stack specification.
- `docs/operations/*` – Method of procedure, operator manual, readiness questionnaire, RDP and WinRM runbooks.
- `docs/security/*` – Security controls matrix and audit readiness checklist.

These MDX files were generated from the markdown sources in the root repository so the portal mirrors the canonical documentation.

### Customization notes

- The sidebar configuration lives in `config/sidebar.tsx`.
- Global metadata (title, description, OpenGraph) is stored in `config/meta.tsx`.
- UI theming can be adjusted through `src/app/globals.css` and `tailwind.config.js`.
- Search, table of contents, and other structural components rely on the template defaults and pick up new MDX automatically.

### Deployment

Deploy the `portal/` directory to Vercel (or another static Next.js host).  
If recreating the project in Vercel, set the root directory to `portal/` and enable password protection or SSO as required by LVHN.
