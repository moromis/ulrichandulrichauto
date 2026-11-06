function buildRouteMapUrl(origin) {
  const destination = '47.79559924277063,-121.95933892161992';
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  // Prefer Apple Maps on iOS, otherwise use Google Maps (web link will open the app if installed)
  if (isIOS) {
    return `maps://?saddr=${encodedOrigin}&daddr=${encodedDestination}&dirflg=d`;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}&travelmode=driving`;
}

document.addEventListener('DOMContentLoaded', () => {
  const routeOriginInput = document.getElementById('routeOrigin');
  const routeButton = document.getElementById('routeButton');
  const routeNote = document.getElementById('routeNote');
  const mapIframe = document.getElementById('contactMapIframe');
  const contactForm = document.getElementById('contactForm');
  const formMessagePopup = document.getElementById('formMessagePopup');

  const hideFormMessagePopup = () => {
    if (!formMessagePopup) return;
    formMessagePopup.hidden = true;
    formMessagePopup.setAttribute('aria-hidden', 'true');
  };

  const showFormMessagePopup = (message) => {
    if (!formMessagePopup) return;
    const messageText = formMessagePopup.querySelector('p');
    if (messageText) {
      messageText.textContent = message;
    }
    formMessagePopup.hidden = false;
    formMessagePopup.setAttribute('aria-hidden', 'false');
  };

  if (formMessagePopup) {
    const closeButton = formMessagePopup.querySelector('.form-message-popup__close');
    closeButton?.addEventListener('click', hideFormMessagePopup);
    formMessagePopup.addEventListener('click', (event) => {
      if (event.target === formMessagePopup) {
        hideFormMessagePopup();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !formMessagePopup.hidden) {
        hideFormMessagePopup();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const body = new URLSearchParams(formData).toString();

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        });

        if (!response.ok) {
          throw new Error('Unable to send message.');
        }

        showFormMessagePopup('Thanks! Your message was sent successfully.');
        contactForm.reset();
      } catch (error) {
        showFormMessagePopup('There was a problem sending your message. Please call or email us directly.');
      }
    });
  }

  if (routeButton && routeOriginInput && mapIframe && routeNote) {
    routeButton.addEventListener('click', () => {
      const origin = routeOriginInput.value.trim();
      if (!origin) {
        routeNote.textContent = 'Please enter your address to show the route.';
        routeNote.style.color = '#c0392b';
        return;
      }

      const routeUrl = buildRouteMapUrl(origin);

      // On mobile, navigate to the URL (scheme links open native apps when available).
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
      try {
        if (isMobile) {
          window.location.href = routeUrl;
        } else {
          window.open(routeUrl, '_blank');
        }
        routeNote.textContent = `Opening directions from ${origin} to Ulrich & Ulrich Auto.`;
        routeNote.style.color = 'var(--muted)';
      } catch (err) {
        routeNote.textContent = 'Unable to open maps. Try copying your address and opening your maps app manually.';
        routeNote.style.color = '#c0392b';
      }
    });
  }
});
