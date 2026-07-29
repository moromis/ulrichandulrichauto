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

function buildRouteMapUrl(origin) {
  const destination = '47.79559924277063,-121.95933892161992';
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);
  return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=driving`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleContactFormSubmit);
  }

  const routeOriginInput = document.getElementById('routeOrigin');
  const routeButton = document.getElementById('routeButton');
  const routeNote = document.getElementById('routeNote');
  const mapIframe = document.getElementById('contactMapIframe');

  if (routeButton && routeOriginInput && mapIframe && routeNote) {
    routeButton.addEventListener('click', () => {
      const origin = routeOriginInput.value.trim();
      if (!origin) {
        routeNote.textContent = 'Please enter your address to show the route.';
        routeNote.style.color = '#c0392b';
        return;
      }

      const routeUrl = buildRouteMapUrl(origin);
      window.open(routeUrl, '_blank');
      routeNote.textContent = `Opening directions from ${origin} to Ulrich & Ulrich Auto in Google Maps.`;
      routeNote.style.color = 'var(--muted)';
    });
  }
});
