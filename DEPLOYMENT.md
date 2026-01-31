# Deployment Guide - Nebula Mobile UI

## Backend Integration Status

The mobile UI is ready with the following integrations:

### ✅ Completed
- **API Client** (`lib/api.ts`) - Full REST API integration with Nebula backend
- **WebSocket** (`lib/websocket.ts`) - Real-time updates for tasks, agents, and notifications
- **Authentication** - Token-based auth with localStorage persistence
- **Environment Config** - Configurable API endpoints and OAuth settings

### 🔄 Ready for Connection

The app expects these Nebula backend endpoints:

#### Authentication
- OAuth flow via `https://nebula.gg/oauth/authorize`
- Token exchange endpoint
- Token refresh endpoint

#### Core APIs
- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent details
- `POST /api/agents/:id/delegate` - Delegate task to agent
- `GET /api/activity` - Get activity feed
- `GET /api/scripts` - List scripts
- `POST /api/scripts/:id/run` - Execute script
- `GET /api/tasks` - Get tasks
- `GET /api/files` - List files
- `POST /api/files/upload` - Upload file
- `GET /api/apps/connected` - List connected apps

#### Real-time
- `WSS wss://nebula.gg/ws` - WebSocket for live updates

## Deployment to Vercel

### Prerequisites
1. Vercel account (free tier works)
2. GitHub repository with the code
3. Nebula OAuth credentials (from Nebula team)

### Step 1: Push to GitHub

```bash
cd nebula-mobile-ui
git init
git add .
git commit -m "Initial commit - Nebula Mobile UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nebula-mobile-ui.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_NEBULA_API_URL=https://nebula.gg/api
   NEXT_PUBLIC_NEBULA_WS_URL=wss://nebula.gg/ws
   NEXT_PUBLIC_NEBULA_OAUTH_CLIENT_ID=your_client_id
   NEXT_PUBLIC_NEBULA_OAUTH_REDIRECT_URI=https://your-app.vercel.app/auth/callback
   ```

6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add custom domain (e.g., `mobile.nebula.gg`)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_NEBULA_OAUTH_REDIRECT_URI` in environment variables

## Alternative Deployment Options

### Netlify
```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

### Docker
```bash
# Create Dockerfile in project root
docker build -t nebula-mobile-ui .
docker run -p 3000:3000 nebula-mobile-ui
```

### Self-Hosted (Node.js)
```bash
npm run build
npm start
# App runs on port 3000
```

## Post-Deployment Checklist

- [ ] Verify app loads at deployed URL
- [ ] Test OAuth login flow
- [ ] Check API connection (agents load correctly)
- [ ] Test WebSocket connection (real-time updates)
- [ ] Install PWA on mobile device
- [ ] Test offline mode
- [ ] Configure push notifications
- [ ] Set up analytics (optional)
- [ ] Add to Nebula dashboard as official mobile app

## Testing the Integration

### 1. Local Testing
```bash
# Copy environment example
cp env.example .env.local

# Add your Nebula credentials to .env.local
# Then start dev server
npm run dev
```

### 2. Mock Mode (without backend)
The app currently runs with mock data. To test with real Nebula backend:

1. Ensure backend endpoints are accessible
2. Configure environment variables
3. Test authentication flow
4. Verify API responses match expected format

### 3. Mobile Testing
- iOS Safari: Open deployed URL, tap Share → Add to Home Screen
- Android Chrome: Open URL, tap menu → Install app
- Test touch targets, gestures, offline mode

## Security Notes

- Auth tokens stored in localStorage (consider httpOnly cookies for production)
- All API requests include Bearer token authentication
- WebSocket connections authenticated with token parameter
- HTTPS required for PWA features
- Content Security Policy should be configured

## Performance Optimization

Current setup includes:
- Next.js automatic code splitting
- PWA with service worker caching
- Image optimization via Next.js
- Tailwind CSS purging

For production:
- Enable Vercel Analytics
- Configure CDN caching
- Monitor Core Web Vitals
- Optimize bundle size

## Support

For issues with:
- **Mobile UI**: Check this repository's issues
- **Nebula Backend**: Contact Nebula team
- **Deployment**: Check Vercel documentation
