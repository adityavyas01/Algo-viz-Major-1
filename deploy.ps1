# Manual Deployment Script for AlgoViz (PowerShell)
# Use this if GitHub Actions deployment fails

Write-Host "🚀 Starting manual deployment to Vercel..." -ForegroundColor Green

# Check if environment variables are set
if (-not $env:VERCEL_TOKEN) {
    Write-Host "❌ Error: VERCEL_TOKEN environment variable is not set" -ForegroundColor Red
    Write-Host "Get your token from: https://vercel.com/account/tokens" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm ci

# Build the project
Write-Host "🏗️ Building project..." -ForegroundColor Cyan
npm run build

# Install Vercel CLI if not installed
if (-not (Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Cyan
    npm install -g vercel@latest
}

# Deploy to production
Write-Host "🌟 Deploying to production..." -ForegroundColor Cyan
vercel --prod --token=$env:VERCEL_TOKEN

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🔗 Your site should be live at: https://algo-viz-major-1.vercel.app" -ForegroundColor Yellow
