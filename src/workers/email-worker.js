export default {
  async fetch(request, env) {
    // Handle OPTIONS method for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Handle favicon.ico requests explicitly
    if (request.url.includes('/favicon.ico')) {
      return new Response(null, {
        status: 204, // No Content
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // Handle GET request for the root route
    if (request.method === 'GET' && request.url.endsWith('/')) {
      return new Response('Welcome to the Email Worker!', {
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Handle POST requests for the contact form
    if (request.method === 'POST' && request.url.endsWith('/api/contact')) {
      try {
        const { name, email, subject, message } = await request.json();

        const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: env.EMAIL_USER, name: 'Yasmine Zaatour' }],
              },
            ],
            from: {
              email: env.EMAIL_USER,
              name: 'Yasmine Zaatour',
            },
            subject: 'Thank You for Reaching Out! | Yasmine Zaatour',
            content: [{
              type: 'text/html',
              value: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <title>Thank You for Your Message</title>
                  </head>
                  <body>
                    <div style="max-width: 600px; margin: 0 auto;">
                      <h1>Thank you for getting in touch!</h1>
                      <p>Dear ${name},</p>
                      <p>I received your message regarding: ${subject}</p>
                      <p>I'll get back to you soon.</p>
                      <p>Message: ${message}</p>
                    </div>
                  </body>
                </html>
              `
            }]
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send email');
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }
    }

    // If method is not POST or OPTIONS, return 405
    return new Response('Method not allowed', { status: 405 });
  }
};