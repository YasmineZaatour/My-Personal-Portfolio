const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

exports.createContact = async (req, res) => {
  try {
    // Save contact to database
    const newContact = new Contact(req.body);
    await newContact.save();
    
    // Send thank you email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Thank You for Reaching Out! | Yasmine Zaatour',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #69b3a2, #251667); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Getting in Touch!</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Dear <span style="color: #69b3a2; font-weight: 600;">${req.body.name}</span>,
              </p>
              
              <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for visiting my portfolio and reaching out. I'm excited to connect with you!
              </p>

              <div style="background: #f8f9fa; border-left: 4px solid #69b3a2; padding: 20px; margin: 30px 0; border-radius: 0 10px 10px 0;">
                <p style="color: #2c3e50; font-size: 16px; margin: 0;">
                  <strong style="color: #251667;">Subject:</strong> ${req.body.subject}
                </p>
              </div>

              <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
                I'll review your message and get back to you as soon as possible.
              </p>

              <!-- Social Links -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Connect with me on social media:</p>
                
                <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                    <!-- LinkedIn Button -->
                    <a href="https://www.linkedin.com/in/yasminezaatour/" style="display: inline-block; background: linear-gradient(135deg, #0077b5, #00a0dc); color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 500; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); transition: background 0.3s ease;margin: 0 10px;">
                        LinkedIn Profile
                    </a>
    
                     <!-- GitHub Button -->
                    <a href="https://github.com/YasmineZaatour" style="display: inline-block; background: linear-gradient(135deg, #333, #555); color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 500; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); transition: background 0.3s ease;margin: 0 10px;">
                        GitHub Profile
                    </a>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                <span style="color: #69b3a2; font-weight: 600; font-size: 16px;">Yasmine Zaatour</span>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newContact
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};