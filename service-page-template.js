function renderServicePage(config) {
  const root = document.getElementById('service-page-root');
  if (!root) return;

  const introHtml = (config.intro || [])
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('');

<<<<<<< Updated upstream
=======
  const imageHtml = config.image
    ? `<img src="${config.image}" alt="${config.title}" class="service-image" loading="lazy" decoding="async" />`
    : '';

  const secondaryImageHtml = config.secondaryImage
    ? `<img src="${config.secondaryImage}" alt="${config.title}" class="service-image service-image-secondary" loading="lazy" decoding="async" />`
    : '';

>>>>>>> Stashed changes
  const leftItemsHtml = (config.leftItems || [])
    .map((item) => `<li>${item}</li>`)
    .join('');

  const rightItemsHtml = (config.rightItems || [])
    .map((item) => `<li>${item}</li>`)
    .join('');

  root.innerHTML = `
    <main class="service-page">
      <div class="container">
        <div class="service-hero">
          <h1>${config.title}</h1>
          ${introHtml}
          <div class="service-links">
            <a href="index.html">Back to home</a>
            <a href="tel:+15094337073">Call for service</a>
          </div>
        </div>

        <div class="service-grid">
          <div class="service-panel">
            <h2>${config.leftTitle}</h2>
            <ul>${leftItemsHtml}</ul>
          </div>

          <div class="service-panel">
            <h2>${config.rightTitle}</h2>
            <ul>${rightItemsHtml}</ul>
          </div>
        </div>
      </div>
    </main>
  `;
}
