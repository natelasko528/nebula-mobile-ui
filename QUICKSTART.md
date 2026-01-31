# Quick Start Guide - Nebula Mobile UI

Get your mobile-first Nebula AI interface running in 5 minutes.

## Option 1: Deploy to Vercel (Recommended - Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nebula-mobile-ui)

1. Click the deploy button above
2. Connect your GitHub account
3. Add environment variables:
   - `NEXT_PUBLIC_NEBULA_API_URL` → `https://nebula.gg/api`
   - `NEXT_PUBLIC_NEBULA_WS_URL` → `wss://nebula.gg/ws`
4. Click Deploy
5. Your app will be live in ~2 minutes at `your-project.vercel.app`

## Option 2: Run Locally

```bash
# 1. Navigate to the project
cd nebula-mobile-ui

# 2. Install dependencies
npm install

# 3. Create environment file
cp env.example .env.local

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

## Option 3: Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy
netlify deploy --prod
```

## What You Get

### 📱 Mobile-First Interface
- Touch-optimized controls
- Bottom navigation for easy thumb access
- Pull-to-refresh
- Works on iOS, Android, and desktop

### 🤖 Access Your AI Agents
- ElevenLabs Voice Agent Manager
- YouTube Shorts Automation
- Firebase Management Agent
- Central Workflow Coordinator
- All your custom agents

### ⚡ Quick Actions
- Make AI phone calls
- Search the web
- Run Python code
- Generate content
- More coming soon

### 📊 Real-Time Activity
- Monitor task progress
- View call logs
- Track script executions
- Get instant notifications

### 💾 Progressive Web App
- Install to home screen
- Works offline
- Native app experience
- Push notifications ready

## Accessing from Your Phone

### iOS (Safari)
1. Open your deployed URL in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. App icon appears on your home screen

### Android (Chrome)
1. Open your deployed URL in Chrome
2. Tap the three-dot menu
3. Tap "Install app" or "Add to Home Screen"
4. Confirm by tapping "Install"
5. App icon appears in your app drawer

## Testing Features

### Test Agent Interaction
1. Go to "Agents" tab
2. Tap on "ElevenLabs Voice Agent"
3. See agent details and tools
4. (Backend connection needed for actual delegation)

### Test Activity Feed
1. Go to "Activity" tab
2. See recent actions and tasks
3. Monitor status of running operations

### Test Settings
1. Go to "Settings" tab
2. View connected apps (GitHub, Gmail, etc.)
3. Manage preferences

## Next Steps

### Connect to Real Nebula Backend
Currently the app shows demo data. To connect to your actual Nebula account:

1. **Get OAuth Credentials**
   - Contact Nebula team for OAuth client ID
   - Register your app's callback URL

2. **Configure Environment Variables**
   ```bash
   NEXT_PUBLIC_NEBULA_API_URL=https://nebula.gg/api
   NEXT_PUBLIC_NEBULA_OAUTH_CLIENT_ID=your_client_id
   NEXT_PUBLIC_NEBULA_OAUTH_REDIRECT_URI=https://your-app.vercel.app/auth/callback
   ```

3. **Redeploy**
   - Push changes to GitHub (if using Vercel/Netlify)
   - Or restart local server

### Customize Your Experience
- Edit agent cards in `app/page.tsx`
- Add custom quick actions
- Modify color scheme in `tailwind.config.ts`
- Add new pages in `app/` directory

## Troubleshooting

### App won't install on phone
- Ensure you're using HTTPS (required for PWA)
- Check browser compatibility (Safari 14+, Chrome 90+)
- Try clearing browser cache

### API not connecting
- Verify environment variables are set
- Check browser console for errors
- Ensure Nebula backend is accessible
- Confirm OAuth credentials are valid

### Styles look broken
- Clear browser cache
- Rebuild app: `npm run build`
- Check Tailwind CSS is processing correctly

## Support Resources

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Full docs in README.md and DEPLOYMENT.md
- **Nebula Platform**: https://nebula.gg
- **Community**: Join Nebula Discord/Slack

## Your App is Ready! 🎉

You now have a mobile-first interface to control all your Nebula AI agents from anywhere. Start by exploring the dashboard and testing the agent cards.

**Pro tip**: Add the app to your phone's home screen for the best experience - it works just like a native app!
