# EmailJS Setup for Portfolio Contact Form

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Name your service and save it
6. Copy the Service ID for later use

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `user_name`: The sender's name
   - `user_email`: The sender's email
   - `subject`: The subject of the message
   - `message`: The message content
4. Save your template
5. Copy the Template ID for later use

## Step 4: Get Your Public Key

1. Go to "Account" > "API Keys"
2. Copy your Public Key

## Step 5: Configure Your Contact Form

1. Open `src/pages/Contact.tsx`
2. Replace the placeholder values with your actual credentials:
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID'; // Replace with your Service ID
   const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
   const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
   ```

## Step 6: Test Your Form

1. Run your application with `npm run dev`
2. Fill out the contact form and submit
3. Check your email to confirm it's working correctly

## Notes

- The free tier of EmailJS allows 200 emails per month
- Make sure your email template uses the exact field names we've set up (`user_name`, `user_email`, `subject`, `message`) 