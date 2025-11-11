# Pinexio Documentation Portal

This directory hosts a Next.js portal based on the [Pinexio template](https://pinexio.vercel.app/docs/getting-started/installation). It surfaces the LVHN jumper server documentation with quick links to the underlying markdown and CI-generated PDFs.

## Getting Started

```bash
pnpm install
pnpm dev
```

The site exports statically (`next export`) which makes it compatible with Vercel, Netlify, or GitHub Pages if you need an alternative hosting approach.

## Deployment to Vercel

1. Create a new Vercel project and point it to the repository directory `portal/`.
2. Set the build command to `pnpm run build` and output directory to `out`.
3. Configure the project to use the Vercel Git integration or manual deploys.
4. Optionally enforce access control via Vercel password protection or SSO if the customer requires authenticated access.

## Environment Notes

- Document links rely on the GitHub Pages URL (`https://resper1965.github.io/jumpserver`) for PDF downloads. Ensure the `Generate Documentation PDFs` workflow succeeded before publishing.
- If you change the base URLs, update `lib/documents.ts` accordingly.

## Interactive Questionnaire

The route `/questionnaire` reproduces the LVHN Jumper Server Readiness Questionnaire as an interactive form. Submitting the form downloads a JSON file with the responses so the customer can email it back securely. Update the destination email inside `app/questionnaire/page.tsx` if the point of contact changes.
