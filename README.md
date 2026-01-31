# Nebula AI Mobile Hub

A mobile-first Progressive Web App (PWA) for accessing all your Nebula AI agents and tools from anywhere.

## Features

- **Mobile-First Design**: Optimized for touch interfaces and small screens
- **Progressive Web App**: Install to home screen, works offline
- **Responsive Layout**: Adapts seamlessly from mobile to desktop
- **Real-Time Updates**: Track agent activity and task progress
- **Quick Actions**: Fast access to your most-used tools
- **Agent Management**: View and interact with all your AI agents

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **Tailwind CSS** - Utility-first styling with mobile-first breakpoints
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Beautiful, consistent icons
- **Next-PWA** - Progressive Web App support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
nebula-mobile-ui/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (home)
│   ├── agents/            # Agents hub and detail views
│   ├── activity/          # Activity feed
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navigation components
│   ├── dashboard/         # Dashboard components
│   └── agents/            # Agent-related components
├── lib/                   # Utilities and API clients
├── public/                # Static assets and PWA manifest
└── package.json
```

## Mobile Optimizations

- Touch-friendly targets (minimum 44x44px)
- Bottom navigation for thumb-friendly access
- Pull-to-refresh support
- Safe area insets for notched devices
- Haptic feedback (where supported)
- Offline mode with service worker

## PWA Features

- **Installable**: Add to home screen on iOS and Android
- **Offline Support**: Core functionality works without internet
- **Push Notifications**: Get notified when tasks complete
- **App Shortcuts**: Quick actions from app icon
- **Responsive Icons**: Adaptive icons for all platforms

## Next Steps

### Integration with Nebula Backend

1. Create API client in `lib/api.ts`
2. Add authentication with Nebula OAuth
3. Connect to WebSocket for real-time updates
4. Implement actual agent delegation
5. Add file upload/download support

### Deployment

Deploy to Vercel (recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy to any Node.js hosting platform that supports Next.js.

## Performance Targets

- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: >90 (mobile)
- Bundle size: <200KB (initial)

## Browser Support

- iOS Safari 14+
- Chrome/Edge 90+
- Firefox 88+
- Samsung Internet 14+

## License

MIT
