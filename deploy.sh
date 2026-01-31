#!/bin/bash

# Nebula Mobile UI - Deployment Script
# This script helps deploy the app to various platforms

set -e

echo "🚀 Nebula Mobile UI Deployment Script"
echo "======================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "Choose deployment option:"
echo "1) Deploy to Vercel"
echo "2) Deploy to Netlify"
echo "3) Test locally"
echo "4) Exit"
echo ""
read -p "Enter option (1-4): " option

case $option in
    1)
        echo ""
        echo "📤 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        echo ""
        echo "✅ Deployed to Vercel!"
        ;;
    2)
        echo ""
        echo "📤 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --prod
        echo ""
        echo "✅ Deployed to Netlify!"
        ;;
    3)
        echo ""
        echo "🧪 Starting local server..."
        npm start
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Test your app on mobile devices"
echo "2. Install PWA to home screen"
echo "3. Configure OAuth credentials"
echo "4. Connect to Nebula backend"
echo ""
