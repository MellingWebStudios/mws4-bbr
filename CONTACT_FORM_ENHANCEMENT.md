# Contact Form Enhancement - Migration to Resend

## Overview
The contact form has been enhanced with additional fields for boiler information and migrated from Mailgun to Resend for email delivery.

## Changes Made

### 1. Enhanced Form Fields
- **Boiler Brand**: Dropdown selection for major boiler brands (Worcester Bosch, Vaillant, Baxi, etc.)
- **Boiler Model**: Text input for specific model if known
- **Problem Type**: Dropdown for common issues (no heating, no hot water, leaking, etc.)
- **Urgency**: Priority level selection (emergency, urgent, normal, routine)

### 2. New API Endpoint
- Created `/api/contact-resend/route.ts` using Resend email service
- Improved email formatting with HTML templates
- Automatic customer reply emails
- Priority-based email subjects and styling

### 3. Updated Components
- `components/contact-form.tsx` - Enhanced with new fields
- `components/contact-form-api.tsx` - Updated to match new structure

### 4. Email Features
- **Rich HTML emails** with proper formatting and styling
- **Priority indicators** (🚨 for emergency, ⚡ for urgent)
- **Structured information display** with clear sections
- **Customer auto-reply** with next steps information
- **Contact details** readily available for quick callback

## Configuration

### Environment Variables
Add the following to your `.env.local` file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=info@birminghamboilerrepairs.co.uk
```

### Getting Resend API Key
1. Sign up at [Resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Add it to your environment variables

## Benefits

### For Engineers
- **Pre-visit preparation**: Know the boiler brand/model before arriving
- **Right parts**: Can bring specific parts for known boiler types
- **Time efficiency**: Reduced multiple trips
- **Priority awareness**: Emergency calls are clearly flagged

### For Customers
- **Better service**: More targeted help based on their specific boiler
- **Faster resolution**: Engineers come prepared
- **Clear communication**: Auto-reply explains next steps
- **Proper prioritization**: Emergency cases get immediate attention

## Email Templates

### Customer Notification Email
- Priority-based subject lines
- Structured display of customer and boiler information
- Professional HTML formatting
- Clear next steps

### Customer Auto-Reply
- Personalized response with customer's name
- Different messaging based on urgency level
- Clear expectations for response times
- Contact information for urgent issues

## Form Validation
- All original validation rules maintained
- Honeypot spam protection preserved
- New fields are optional (except message/contact details)
- Client-side and server-side validation

## Migration Notes
- Old `/api/contact` endpoint still exists (using FastAPI backend)
- New `/api/contact-resend` endpoint uses Resend directly
- Forms updated to use new endpoint
- No breaking changes to existing functionality
