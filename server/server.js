const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const verificationCodes = new Map();

app.use(cors({
  origin: '*', // For development only! Change to specific origin in production
}));
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuration error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Send verification code endpoint
app.post('/api/send-verification', async (req, res) => {
  const { email } = req.body;
  console.log('Attempting to send verification to:', email);

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email is required' 
    });
  }

  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Dashboard Verification Code',
      text: `Your verification code is: ${verificationCode}`,
      html: `
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h2 style="color: #333;">Admin Verification Code</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50; font-size: 32px;">${verificationCode}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    verificationCodes.set(email, {
      code: verificationCode,
      expiry: Date.now() + 300000 // 5 minutes expiry
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send verification email',
      details: error.message 
    });
  }
});

// Verify code endpoint
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  const storedData = verificationCodes.get(email);

  if (!storedData) {
    return res.json({ success: false, error: 'No verification code found' });
  }

  if (Date.now() > storedData.expiry) {
    verificationCodes.delete(email);
    return res.json({ success: false, error: 'Verification code expired' });
  }

  if (storedData.code === code) {
    verificationCodes.delete(email);
    return res.json({ success: true });
  }

  res.json({ success: false, error: 'Invalid verification code' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});