# Email Verification - Backend Integration Guide

## Overview
Frontend UI components for email verification have been created. Backend integration is required for full functionality.

## Created Components

### 1. VerifyEmail Page (`/verify-email`)
- **Location**: `src/app/screens/auth/VerifyEmail.jsx`
- **Route**: `/verify-email?token=xxx&email=xxx`
- **Features**:
  - Verifying state with loading spinner
  - Success state with confirmation
  - Error state with resend option
  - Simulated verification (needs backend)

### 2. ResendVerificationEmail Component
- **Location**: `src/app/components/auth/ResendVerificationEmail.jsx`
- **Usage**: Display on dashboard for unverified users
- **Features**: Resend verification email button

### 3. VerificationBadge Component
- **Location**: `src/app/components/auth/VerificationBadge.jsx`
- **Usage**: Show verification status in user profile
- **Props**: `isVerified` (boolean)

## Required Backend Implementation

### 1. Database Schema Updates
Add to User model:
```javascript
{
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date
}
```

### 2. API Endpoints Needed

#### POST `/api/auth/register`
**Update existing endpoint to:**
- Generate verification token
- Save token and expiry to database
- Send verification email
- Return user with `isEmailVerified: false`

#### POST `/api/auth/verify-email`
**Request:**
```json
{
  "token": "verification-token-here"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```
**Logic:**
- Validate token
- Check expiry
- Update `isEmailVerified` to true
- Clear verification token

#### POST `/api/auth/resend-verification`
**Request:**
```json
{
  "email": "user@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Verification email sent"
}
```
**Logic:**
- Find user by email
- Generate new token
- Send verification email

### 3. Email Service Setup

**Install email package:**
```bash
npm install nodemailer
# OR
npm install @sendgrid/mail
# OR
npm install aws-sdk  # for AWS SES
```

**Email Template:**
```html
Subject: Verify Your Email - Auction Hub

Hi {{name}},

Thank you for registering! Please verify your email address by clicking the link below:

{{verificationLink}}

This link will expire in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
Auction Hub Team
```

**Verification Link Format:**
```
https://yourdomain.com/verify-email?token={{token}}&email={{email}}
```

### 4. Middleware for Protected Routes

Create middleware to check email verification:
```javascript
const requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email to access this feature"
    });
  }
  next();
};
```

Apply to sensitive routes:
- Creating products/auctions
- Placing bids
- Making payments

### 5. Frontend Integration Points

**Update Register.jsx:**
```javascript
// Line 106 - Already updated to show verification message
toast.success("Registration successful! Please check your email to verify your account.");
```

**Update Login.jsx:**
Add after successful login:
```javascript
if (user && !user.isEmailVerified) {
  // Show ResendVerificationEmail component
}
```

**Update UserProfile:**
```javascript
import { VerificationBadge } from "../../components/auth/VerificationBadge";
import { ResendVerificationEmail } from "../../components/auth/ResendVerificationEmail";

// In component:
<VerificationBadge isVerified={user.isEmailVerified} />
{!user.isEmailVerified && <ResendVerificationEmail email={user.email} />}
```

**Update VerifyEmail.jsx:**
Uncomment the TODO sections (lines 26-42, 58-62)

## Testing Checklist

- [ ] User registers → receives verification email
- [ ] Click verification link → email verified
- [ ] Expired token → shows error, can resend
- [ ] Invalid token → shows error
- [ ] Resend email → new email sent
- [ ] Unverified user → sees warning banner
- [ ] Unverified user → restricted from bidding
- [ ] Verified user → full access

## Security Considerations

1. **Token Generation**: Use crypto.randomBytes(32)
2. **Token Expiry**: 24 hours recommended
3. **Rate Limiting**: Limit resend requests (max 3 per hour)
4. **Email Validation**: Verify email format before sending
5. **HTTPS Only**: Verification links must use HTTPS in production

## Environment Variables

Add to `.env`:
```env
# Email Service
EMAIL_SERVICE=sendgrid  # or 'smtp', 'ses'
EMAIL_FROM=noreply@auctionhub.com
EMAIL_FROM_NAME=Auction Hub

# SendGrid (if using)
SENDGRID_API_KEY=your_api_key

# SMTP (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Current Status

✅ **Completed (Frontend)**:
- Email verification page with UI states
- Resend verification component
- Verification badge component
- Routes configured
- User messaging updated

⏳ **Pending (Backend)**:
- Database schema updates
- API endpoints implementation
- Email service integration
- Verification middleware
- Token generation/validation

## Next Steps

1. Choose email service provider (SendGrid recommended for ease)
2. Update database schema
3. Implement API endpoints
4. Configure email templates
5. Test verification flow
6. Add middleware to protected routes
7. Update frontend to use real API calls
