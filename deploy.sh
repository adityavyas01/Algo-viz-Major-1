#!/bin/bash

# Manual Deployment Script for AlgoViz
# Use this if GitHub Actions deployment fails

echo "🚀 Starting manual deployment to Vercel..."

# Check if environment variables are set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN environment variable is not set"
    echo "Get your token from: https://vercel.com/account/tokens"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🏗️ Building project..."
npm run build

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Deploy to production
echo "🌟 Deploying to production..."
vercel --prod --token=$VERCEL_TOKEN

echo "✅ Deployment complete!"
echo "🔗 Your site should be live at: https://algo-viz-major-1.vercel.app"
