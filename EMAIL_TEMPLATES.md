# Custom Email Templates for AlgoViz

## 📧 **Supabase Email Template Customization**

Supabase provides default email templates that you can customize in your dashboard. Here are optimized templates for AlgoViz:

### **How to Access Templates:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project: `lctytebgxakcztdijbxu`
3. Navigate to **Authentication** → **Email Templates**
4. Edit the templates below

---

## 🎯 **1. Confirm Signup Template**

**Template Name:** `Confirm your signup`
**When Used:** New user registration email verification

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AlgoViz!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #0891b2, #1e40af);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #0891b2, #1e40af);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .features {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .feature-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .feature-icon {
            margin-right: 10px;
            font-size: 18px;
        }
        .footer {
            background: #f8fafc;
            padding: 20px 40px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚀 AlgoViz</div>
            <p>Welcome to the future of algorithm learning!</p>
        </div>
        
        <div class="content">
            <h1>Confirm your email address</h1>
            <p>Hi there! 👋</p>
            <p>Welcome to <strong>AlgoViz</strong> - the most advanced platform for learning data structures and algorithms through interactive visualizations!</p>
            
            <p>To complete your registration and start your coding journey, please confirm your email address:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" class="button">
                    ✅ Confirm Email Address
                </a>
            </div>
            
            <div class="features">
                <h3>🎯 What's waiting for you:</h3>
                <div class="feature-item">
                    <span class="feature-icon">📊</span>
                    <span>50+ Interactive Algorithm Visualizations</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🧠</span>
                    <span>AI-Powered Personalized Learning Paths</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🏆</span>
                    <span>Gamified Progress Tracking & Achievements</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">👥</span>
                    <span>Collaborative Learning & Code Reviews</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">💼</span>
                    <span>Interview Preparation & LeetCode Integration</span>
                </div>
            </div>
            
            <p><strong>Next steps after verification:</strong></p>
            <ol>
                <li>Complete your skills assessment (2 minutes)</li>
                <li>Get your personalized learning roadmap</li>
                <li>Start with your first algorithm visualization</li>
                <li>Join the AlgoViz community!</li>
            </ol>
            
            <p>If you didn't create this account, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>Happy coding! 🚀</p>
            <p><strong>The AlgoViz Team</strong></p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
            <p>This email was sent by AlgoViz - Interactive Algorithm Learning Platform</p>
        </div>
    </div>
</body>
</html>
```

---

## 🔐 **2. Reset Password Template** (Optional)

**Template Name:** `Reset your password`
**When Used:** Password reset requests

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your AlgoViz Password</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #dc2626, #991b1b);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626, #991b1b);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .warning-box {
            background: #fef3cd;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            background: #f8fafc;
            padding: 20px 40px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔐 AlgoViz</div>
            <p>Password Reset Request</p>
        </div>
        
        <div class="content">
            <h1>Reset your password</h1>
            <p>Hi there! 👋</p>
            <p>We received a request to reset your AlgoViz account password.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" class="button">
                    🔑 Reset Password
                </a>
            </div>
            
            <div class="warning-box">
                <strong>⚠️ Security Notice:</strong>
                <ul style="margin: 10px 0;">
                    <li>This link expires in 1 hour for security</li>
                    <li>If you didn't request this, ignore this email</li>
                    <li>Your current password remains unchanged until reset</li>
                </ul>
            </div>
            
            <p>After resetting your password, you'll be able to continue your algorithm learning journey where you left off!</p>
            
            <p>Need help? Contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>Stay secure! 🔒</p>
            <p><strong>The AlgoViz Team</strong></p>
        </div>
    </div>
</body>
</html>
```

---

## 🔄 **3. Magic Link Template** (Optional)

**Template Name:** `Magic Link`
**When Used:** Passwordless login

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your AlgoViz Magic Link</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #7c3aed, #5b21b6);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #7c3aed, #5b21b6);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background: #f8fafc;
            padding: 20px 40px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">✨ AlgoViz</div>
            <p>Your magic link is here!</p>
        </div>
        
        <div class="content">
            <h1>Sign in to AlgoViz</h1>
            <p>Hi there! 👋</p>
            <p>Click the button below to securely sign in to your AlgoViz account:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" class="button">
                    🚀 Sign In to AlgoViz
                </a>
            </div>
            
            <p>This link will expire in 15 minutes for security purposes.</p>
            <p>Ready to continue your algorithm mastery journey? Let's code! 💻</p>
        </div>
        
        <div class="footer">
            <p>Happy learning! 🚀</p>
            <p><strong>The AlgoViz Team</strong></p>
        </div>
    </div>
</body>
</html>
```

---

## ⚙️ **How to Apply These Templates:**

1. **Go to Supabase Dashboard** → Authentication → Email Templates
2. **Select the template** you want to customize
3. **Copy and paste** the HTML code above
4. **Click "Save"** to apply changes
5. **Test** by registering a new account

## 🎨 **Customization Options:**

- **Colors**: Modify the gradient colors in CSS to match your brand
- **Logo**: Replace the emoji logo with your actual logo image
- **Content**: Adjust the messaging to match your tone
- **Features**: Update the feature list with your latest offerings

## 📧 **Email Best Practices:**

- ✅ **Mobile-responsive** design included
- ✅ **Clear call-to-action** buttons
- ✅ **Professional styling** with AlgoViz branding
- ✅ **Security messaging** for user trust
- ✅ **Engaging content** to increase click-through rates

Your users will now receive beautiful, professional emails that match your AlgoViz brand! 🎉
