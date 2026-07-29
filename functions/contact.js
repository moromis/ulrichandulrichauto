const sgMail = require('@sendgrid/mail');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400'
};

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...CORS_HEADERS,
        'Allow': 'POST, OPTIONS'
      },
      body: 'Method Not Allowed'
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: 'Invalid JSON payload.'
    };
  }

  const { name, email, message } = payload;
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Name, email and message are required.'
    };
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Email service is not configured.'
    };
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to: process.env.EMAIL_TO || 'help@ulrichauto.com',
    from: process.env.EMAIL_FROM || 'help@ulrichauto.com',
    replyTo: email,
    subject: `Website contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Message sent successfully.'
    };
  } catch (error) {
    console.error('SendGrid error', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Unable to send message.'
    };
  }
};
