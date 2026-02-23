# 🔑 Emergency Admin Access

## Hardcoded Fallback Credentials

If email verification or Supabase authentication fails, use these credentials to access the platform:

**Email:** `admin@algoviz.com`  
**Password:** `Admin@123`

## Features

✅ Bypasses email verification  
✅ Works even if Supabase is down  
✅ Grants full admin access  
✅ Pre-loaded with max stats (Level 99, 999,999 XP)  
✅ Access to all 2,157 problems  

## Implementation

- Location: `src/contexts/AuthContext.tsx` (lines 211-260)
- User ID: `00000000-0000-0000-0000-000000000001`
- Session stored in localStorage with flag `algviz_fallback_admin`

## Security Notes

⚠️ **For Development/Demo Only**  
🔒 Remove or change credentials before public deployment  
📝 This is a safety mechanism for testing and emergency access  

## Usage

1. Go to `/login`
2. Enter the email and password above
3. Click "Sign In"
4. You'll be logged in as admin with full access

---

*Last updated: February 23, 2026*
