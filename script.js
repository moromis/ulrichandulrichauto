const CONTACT_ENDPOINT = 'https://REPLACE_WITH_YOUR_FUNCTION_HOST/.netlify/functions/contact';

async function handleContactFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please complete all fields.');
    return;
  }

  if (CONTACT_ENDPOINT.includes('REPLACE_WITH_YOUR_FUNCTION_HOST')) {
    alert('Contact endpoint is not configured yet. Please update script.js with your deployed function URL.');
    return;
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to submit contact form');
    }

    document.getElementById('contactForm').reset();
    alert('Message sent successfully. We will respond as soon as possible.');
  } catch (error) {
    console.error(error);
    alert('Unable to send the message right now. Please email help@ulrichauto.com or call (509) 433-7073.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleContactFormSubmit);
  }
});
