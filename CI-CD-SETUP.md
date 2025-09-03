# CI/CD Pipeline Setup Guide

## 🚀 Automated Deployment & Testing

This repository now includes a comprehensive CI/CD pipeline that will:

- ✅ **Automatically test** your code on every push/PR
- 🔍 **Check for security vulnerabilities**
- 🚀 **Deploy preview builds** for pull requests
- 🌟 **Deploy to production** when you push to main
- 📊 **Monitor performance** with Lighthouse

## 📋 Required GitHub Secrets

You need to add these secrets to your GitHub repository:

### 1. Go to GitHub Repository Settings
- Navigate to: `Settings` → `Secrets and variables` → `Actions`
- Click `New repository secret`

### 2. Add these secrets:

#### Vercel Deployment Secrets:
```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=team_k5TWdPr8BEslw4QzJI1eAmtN
VERCEL_PROJECT_ID=prj_dfKWrfFXOuz10v7riUTXzc9q4HWh
```

#### Supabase Configuration:
```
VITE_SUPABASE_URL=https://lctytebgxakcztdijbxu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdHl0ZWJneGFrY3p0ZGlqYnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjQ0NDgsImV4cCI6MjA2NjUwMDQ0OH0.I3cf-X6MUw4E7t6NMI-p7QiiLcvLjjNm72sePZGuUU8
```

## 🔧 How to Get These Values

### Vercel Secrets:

1. **VERCEL_TOKEN**: 
   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Create a new token
   - Copy the token value

2. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**:
   
   ✅ **Already configured for your project:**
   - `VERCEL_ORG_ID`: `team_k5TWdPr8BEslw4QzJI1eAmtN`
   - `VERCEL_PROJECT_ID`: `prj_dfKWrfFXOuz10v7riUTXzc9q4HWh`
   
   (These were automatically detected when linking your project)

### Supabase Secrets:

These are the same values from your environment file:
```
VITE_SUPABASE_URL=https://lctytebgxakcztdijbxu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdHl0ZWJneGFrY3p0ZGlqYnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjQ0NDgsImV4cCI6MjA2NjUwMDQ0OH0.I3cf-X6MUw4E7t6NMI-p7QiiLcvLjjNm72sePZGuUU8
```

## 🔄 Workflow Triggers

### Automatic Deployment:
- **Push to `main`** → Deploys to production
- **Create PR** → Deploys preview build
- **Push to `develop`** → Runs tests only

### What Gets Checked:
- 🔍 ESLint for code quality
- 📝 TypeScript type checking
- 🔒 Security vulnerability scanning
- 🏗️ Build verification
- 📊 Performance monitoring (Lighthouse)

## 🎯 Benefits

### For Development:
- ✅ **No more manual testing** - Automated on every commit
- 🚫 **Prevent bugs in production** - Tests must pass to deploy
- 👀 **Preview changes** before merging PRs
- 📊 **Performance monitoring** - Get Lighthouse scores automatically

### For Deployment:
- 🚀 **Zero-downtime deployments** - Automatic when you push to main
- 🔄 **Rollback capability** - Previous deployments remain available
- 🏷️ **Environment-specific builds** - Preview vs Production
- 💬 **Automatic notifications** - Comments on PRs with preview links

## 🛠️ Customization

### Update Lighthouse Configuration:
Edit `.lighthouserc.json` to adjust performance thresholds:

```json
{
  "assert": {
    "assertions": {
      "categories:performance": ["warn", {"minScore": 0.9}]
    }
  }
}
```

### Add More Test Scripts:
Update `package.json` scripts:

```json
{
  "scripts": {
    "test:unit": "jest",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage"
  }
}
```

## 🚨 Troubleshooting

### Build Failures:
1. Check the GitHub Actions tab for detailed logs
2. Ensure all required secrets are set
3. Verify environment variables are correct

### Deployment Issues:
1. Confirm Vercel project is properly linked
2. Check that build command works locally
3. Verify all dependencies are in package.json

## 📈 Next Steps

1. **Add the GitHub secrets** (required for deployment)
2. **Push to main** to trigger your first automated deployment
3. **Create a PR** to see preview deployments in action
4. **Monitor the Actions tab** to see your pipeline working

## 🎉 You're All Set!

Once you've added the secrets, every push will automatically:
- Test your code
- Deploy to production (main branch)
- Create preview deployments (PRs)
- Monitor performance
- Keep your site always up-to-date!

No more manual deployments needed! 🚀
