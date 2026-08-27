document.addEventListener('DOMContentLoaded', () => {
  const shell = window.SiteShell;
  if (!shell) return;

  const fragmentTargets = document.querySelectorAll('[data-fragment]');

  for (const target of fragmentTargets) {
    const targetName = target.dataset.fragment;
    if (!targetName) continue;

    if (targetName === 'components/header.html') {
      target.innerHTML = shell.header;
    }

    if (targetName === 'components/footer.html') {
      target.innerHTML = shell.footer;
    }
  }

  const homeLink = document.querySelector('.brand a');
  if (homeLink) {
    homeLink.href = './index.html';
  }
});
