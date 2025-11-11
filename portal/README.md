# LVHN Documentation Portal

Complete documentation portal built with Next.js 15, React 19, and modern React patterns.

## Features

### ✅ Implemented

- **Sidebar Navigation**
  - Responsive design (mobile overlay, desktop sticky)
  - Collapsible navigation sections
  - Active route detection
  - Keyboard shortcuts (Ctrl+B to toggle)
  - Dark mode support
  - Icon-only collapse mode

- **Search Functionality**
  - Full-text search across all documentation
  - Keyboard shortcut (Ctrl+K to open)
  - Real-time filtering
  - Category-based organization

- **Authentication System**
  - JWT-based session management
  - HTTP-only cookie security
  - Protected routes via middleware
  - Simple username/password authentication
  - 8-hour session timeout

- **UI Components**
  - Dialog (modal system)
  - Tabs (tabbed interface)
  - Button (with variants)
  - Theme provider (dark/light mode)
  - Mode toggle
  - Search dialog

- **Content Management**
  - Contentlayer2 for MDX processing
  - Syntax highlighting (rehype-highlight)
  - GFM support (GitHub Flavored Markdown)
  - Auto-generated slugs

## Getting Started

### Installation

```bash
cd portal
pnpm install
```

### Development

```bash
pnpm dev
```

The portal will be available at `http://localhost:3000`

### Build

```bash
pnpm build
pnpm start
```

## Authentication

### Default Credentials

⚠️ **Change these immediately in production!**

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | Admin |
| `lvhn` | `lvhn2025` | Viewer |
| `ionic` | `ionic2025` | Viewer |

### Changing Passwords

To generate a new password hash:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-new-password', 10);
console.log(hash);
```

Update the hash in `auth.config.ts`:

```typescript
export const authorizedUsers: User[] = [
  {
    username: 'your-username',
    passwordHash: '$2a$10$...', // Your generated hash
    name: 'Full Name',
    role: 'admin', // or 'viewer'
  },
];
```

### JWT Secret

Set a strong JWT secret in production:

```bash
# Generate a secure secret
openssl rand -base64 32

# Set in environment variable
export JWT_SECRET="your-generated-secret"
```

Or update directly in `auth.config.ts`:

```typescript
export const JWT_SECRET = 'your-secure-random-string';
```

### Protected Routes

The following routes require authentication:
- `/docs` - All documentation pages
- `/questionnaire` - Interactive questionnaire form

Public routes (no authentication):
- `/` - Home page
- `/login` - Login page

### Session Configuration

Configure session settings in `auth.config.ts`:

```typescript
export const SESSION_CONFIG = {
  maxAge: 60 * 60 * 8, // 8 hours in seconds
  cookieName: 'lvhn-portal-session',
};
```

## Environment Variables

Create a `.env.local` file:

```env
# JWT Secret (required for production)
JWT_SECRET=your-secure-random-string-here

# Node Environment
NODE_ENV=production
```

## Project Structure

```
portal/
├── src/
│   ├── app/
│   │   ├── api/auth/          # Authentication API routes
│   │   ├── docs/               # Documentation pages with sidebar
│   │   ├── login/              # Login page
│   │   ├── questionnaire/      # Interactive questionnaire
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── sidebar.tsx         # Main sidebar component
│   │   ├── search-dialog.tsx   # Search functionality
│   │   ├── dialog.tsx          # Modal dialog
│   │   ├── tabs.tsx            # Tabs component
│   │   ├── button.tsx          # Button component
│   │   ├── header.tsx          # Header component
│   │   ├── theme-provider.tsx  # Theme management
│   │   ├── mode-toggle.tsx     # Dark/light toggle
│   │   └── logout-button.tsx   # Logout button
│   ├── hooks/
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   └── auth.ts             # Authentication utilities
│   └── middleware.ts           # Next.js middleware for auth
├── config/
│   └── sidebar.tsx             # Sidebar navigation config
├── content/                    # MDX content files (Contentlayer)
├── auth.config.ts              # Authentication configuration
├── contentlayer.config.ts      # Contentlayer configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Keyboard Shortcuts

- **Ctrl+B** (Cmd+B on Mac) - Toggle sidebar
- **Ctrl+K** (Cmd+K on Mac) - Open search dialog
- **ESC** - Close search dialog

## Customization

### Sidebar Navigation

Edit `config/sidebar.tsx` to customize navigation:

```typescript
export const sidebarNav = [
  {
    title: 'Section Name',
    icon: <IconComponent className="h-5 w-5" />,
    defaultOpen: true,
    pages: [
      { title: 'Page Title', href: '/docs/page-slug' },
    ],
  },
];
```

### Theme Colors

Edit `src/app/globals.css` to customize colors:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  /* ... other colors */
}

.dark {
  --primary: 210 40% 98%;
  --background: 0 0% 4%;
  /* ... other colors */
}
```

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Set the root directory to `portal/`
3. Configure environment variables:
   - `JWT_SECRET` - Your secure JWT secret
4. Deploy

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t lvhn-portal .
docker run -p 3000:3000 -e JWT_SECRET="your-secret" lvhn-portal
```

## Security Considerations

1. **Change Default Credentials** - Update all default passwords in production
2. **Set Strong JWT Secret** - Use a cryptographically secure random string
3. **Use HTTPS** - Always serve the portal over HTTPS in production
4. **Regular Updates** - Keep dependencies up to date
5. **Session Timeout** - Configure appropriate session timeout for your security requirements
6. **Access Logs** - Monitor authentication attempts and access patterns

## Support

For issues or questions:
- Technical: raraujo@ionic.health
- GitHub: https://github.com/resper1965/jumpserver

## License

Proprietary - Ionic Health & LVHN
