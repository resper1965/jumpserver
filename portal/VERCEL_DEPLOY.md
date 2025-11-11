# Deploying to Vercel

This guide explains how to deploy the LVHN Portal to Vercel.

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- pnpm package manager

## Important Configuration

### 1. Root Directory

In Vercel project settings, set the **Root Directory** to:
```
portal
```

### 2. Build Settings

Vercel should auto-detect Next.js, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install`
- **Output Directory**: `.next` (default)

### 3. Environment Variables

Add these environment variables in Vercel dashboard:

**Required:**
```
JWT_SECRET=<generate-with-openssl-rand-base64-32>
```

**Optional:**
```
NODE_ENV=production
```

#### How to Generate JWT_SECRET

On your local machine:
```bash
openssl rand -base64 32
```

Copy the output and paste as the value for `JWT_SECRET` in Vercel.

### 4. Node.js Version

Ensure Node.js 20.x is selected in Vercel settings.

## Build Process

The build will:
1. Install dependencies with pnpm
2. Run Contentlayer2 to process MDX files
3. Render Mermaid diagrams using Playwright (headless browser)
4. Build Next.js application with SSR

**Note:** The first build may take 3-5 minutes due to Playwright installation.

## Post-Deployment

### Change Default Passwords

After first deployment, immediately change default passwords:

1. Log in with admin credentials
2. Go to `/admin/users`
3. Edit each user and set new passwords
4. Save changes

### Verify Features

Test these features after deployment:
- [ ] Login page appears at root URL
- [ ] Authentication with all user accounts
- [ ] Protected routes redirect to login
- [ ] Admin panel accessible to admin users
- [ ] Mermaid diagrams render correctly
- [ ] Dark/light mode works
- [ ] Search functionality (Ctrl+K)
- [ ] Mobile responsive design

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'next-contentlayer2'"**
- Solution: Ensure `pnpm install` runs before build

**Error: "Playwright browser not found"**
- Solution: Vercel should auto-install. If not, add to build command:
  ```
  pnpm exec playwright install chromium && pnpm build
  ```

### Runtime Errors

**Error: "Invalid JWT_SECRET"**
- Solution: Ensure JWT_SECRET environment variable is set in Vercel

**Error: "Cannot write to users.json"**
- Solution: Expected behavior. User data persists in-memory during session.
  For persistence, use a database (PostgreSQL, MySQL, etc.)

### Authentication Not Working

**Symptoms:** Login page doesn't appear, or redirects fail
- Check that `output: 'export'` is NOT in next.config.js
- Verify middleware.ts is included in deployment
- Check browser console for errors

## Performance Optimization

### Enable Edge Runtime (Optional)

For better performance, you can enable Edge Runtime for certain routes:

```typescript
// In route file (e.g., app/api/auth/login/route.ts)
export const runtime = 'edge';
```

**Note:** Not all Node.js APIs work in Edge Runtime.

### Caching

Static assets are automatically cached by Vercel CDN. No additional configuration needed.

## Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: View real-time logs in Vercel dashboard
- **Speed Insights**: Monitor Core Web Vitals

## Production Checklist

Before going live:
- [ ] JWT_SECRET set to secure random string
- [ ] All default passwords changed
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Tested all authentication flows
- [ ] Verified user management works
- [ ] Checked mobile responsiveness
- [ ] Reviewed access logs
- [ ] Documented any custom configurations

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Project: raraujo@ionic.health
