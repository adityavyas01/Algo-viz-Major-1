# SMTP Configuration Guide for Production

## 🔧 **REQUIRED: Supabase SMTP Setup**

Your AlgoViz application requires SMTP configuration in Supabase for email verification to work in production.

### **Step 1: Access Supabase Dashboard**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `lctytebgxakcztdijbxu`
3. Navigate to **Authentication** → **Settings** → **SMTP Settings**

### **Step 2: Configure SMTP Provider**

#### **Option A: Gmail/Google Workspace (Recommended)**
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: your-email@gmail.com
SMTP Pass: your-app-password (NOT regular password)
Sender Name: AlgoViz
Sender Email: your-email@gmail.com
```

**Gmail Setup Steps:**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password: Google Account → Security → App passwords → Generate
3. Use the 16-character app password (not your regular password)

#### **Option B: SendGrid (Professional)**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Pass: your-sendgrid-api-key
Sender Name: AlgoViz
Sender Email: noreply@yourdomain.com
```

**SendGrid Setup Steps:**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API Key with Mail Send permissions
3. Verify your sender domain/email
4. Use "apikey" as username and API key as password

#### **Option C: AWS SES (Enterprise)**
```
SMTP Host: email-smtp.us-east-1.amazonaws.com
SMTP Port: 587
SMTP User: your-ses-smtp-username
SMTP Pass: your-ses-smtp-password
Sender Name: AlgoViz
Sender Email: verified@yourdomain.com
```

### **Step 3: Configure Site URLs**
In Supabase Dashboard → Authentication → Settings → Site Settings:

```
Site URL: https://algo-viz-major-1.vercel.app
Additional Redirect URLs:
- https://algo-viz-major-1.vercel.app/email-verification-success
```

### **Step 4: Test Email Configuration**
1. Deploy your application: `vercel --prod`
2. Register a new test account
3. Check if verification email is received
4. Click verification link and confirm redirect works

### **Step 5: Custom Email Templates (Optional)**
In Supabase Dashboard → Authentication → Email Templates:

**Confirm Signup Template:**
```html
<h2>Welcome to AlgoViz! 🎉</h2>
<p>Thanks for signing up! Please confirm your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your account</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>
<br>
<p>Happy learning!</p>
<p>The AlgoViz Team</p>
```

### **⚠️ Important Notes**

1. **Production Only**: All code is now configured for production URLs only
2. **HTTPS Required**: Email verification links use HTTPS production URLs
3. **Domain Verification**: Some providers require domain verification
4. **Rate Limits**: Configure appropriate rate limits for email sending
5. **Monitoring**: Monitor email delivery rates and bounce rates

### **🧪 Testing Checklist**

- [ ] SMTP credentials configured in Supabase
- [ ] Site URLs properly set
- [ ] Test registration sends email
- [ ] Email verification link works
- [ ] Auto-redirect after verification works
- [ ] User can access dashboard after verification

### **🚀 Production Deployment**

Once SMTP is configured:

```bash
# Deploy to production
npm run build
vercel --prod

# Test the complete flow
# 1. Register at https://algo-viz-major-1.vercel.app/register
# 2. Check email for verification link
# 3. Click link and verify auto-redirect
# 4. Confirm user can access all features
```

**Status: ✅ PRODUCTION-READY EMAIL SYSTEM**
- All development bypasses removed
- Production URLs only
- Proper error handling
- Professional user experience
