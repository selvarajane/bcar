# WhatsApp Automatic Message Setup Guide

To send WhatsApp messages automatically in the background without opening the app, you need to set up a backend service. Here are the options:

## Option 1: Using WhatsApp Business API (Recommended)

### Setup Steps:
1. Create a Meta Business Account
2. Set up WhatsApp Business API
3. Create a backend endpoint that handles WhatsApp messages
4. Update the `apiEndpoint` in `script.js` with your backend URL

### Backend Example (Node.js):
```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/send-whatsapp', async (req, res) => {
  const { to, message } = req.body;
  
  // Using WhatsApp Business API
  const response = await axios.post(
    'https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages',
    {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: message }
    },
    {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    }
  );
  
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Option 2: Using Twilio WhatsApp API

1. Sign up for Twilio account
2. Get your Account SID and Auth Token
3. Set up WhatsApp Sandbox or get approved number
4. Update the code to use Twilio endpoint

## Option 3: Using Webhook Services (Easiest for Static Sites)

### Using Zapier:
1. Create a Zapier account
2. Create a new Zap with Webhook trigger
3. Add WhatsApp action
4. Copy the webhook URL and update in `script.js`

### Using Make.com (formerly Integromat):
1. Create a Make.com account
2. Create a scenario with Webhook → WhatsApp
3. Copy the webhook URL

### Using n8n:
1. Self-hosted or cloud n8n
2. Create workflow with Webhook → WhatsApp node
3. Get the webhook URL

## Option 4: Simple Backend Service (Quick Setup)

You can use services like:
- **Formspree** with webhook
- **Netlify Functions** (if hosting on Netlify)
- **Vercel Serverless Functions** (if hosting on Vercel)

### Example Netlify Function:
```javascript
// netlify/functions/send-whatsapp.js
exports.handler = async (event, context) => {
  const { to, message } = JSON.parse(event.body);
  
  // Send WhatsApp using your preferred service
  // (WhatsApp Business API, Twilio, etc.)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
```

## Current Implementation

The current code in `script.js` is set up to work with any of these methods. You just need to:

1. Set up your chosen service
2. Update the `apiEndpoint` variable in `script.js` with your endpoint URL
3. The messages will be sent automatically in the background

## Testing

After setup, test the booking form. The WhatsApp message should be sent automatically without opening the WhatsApp app.

