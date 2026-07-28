Ulrich & Ulrich Auto — Static Website

This repository contains a simple static website for Ulrich & Ulrich Auto ("Independent Subaru Specialists"). The site is designed for GitHub Pages and includes a contact form that opens the user's email client.

What’s included
- index.html — main site
- styles.css — simple responsive styles
- script.js — contact form handler (opens mail client using mailto:)
- CNAME — custom domain set to www.ulrichauto.com

Deploying to GitHub Pages
1. Create a GitHub repository (for example `ulrichauto.com` or any name you prefer).
2. Push these files to the repository's default branch (usually `main`):

   git init
   git add .
   git commit -m "Add Ulrich & Ulrich Auto website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main

3. In the repository Settings > Pages, set the source to the `main` branch and the root directory. GitHub will build and publish the site.
4. DNS: configure your domain registrar to point `www.ulrichauto.com` to GitHub Pages. Typical options:
   - Use a CNAME record for `www` pointing to `<your-username>.github.io` (if using a user/organization pages repository) or to the repository's GitHub Pages target.
   - If you want the apex (ulrichauto.com) to redirect or point to GitHub Pages, add the appropriate A records GitHub provides in their documentation.

Note: The included CNAME file tells GitHub Pages to serve the site at www.ulrichauto.com. After DNS changes propagate, GitHub will automatically provision HTTPS for the custom domain.

Contact form behavior
- The contact form on the site is configured to submit to a serverless email endpoint. Replace the placeholder `CONTACT_ENDPOINT` in `script.js` with your deployed function URL.
- A GitHub Pages static site cannot host backend code, so the function must be deployed separately to a serverless host such as Netlify or Vercel.

SendGrid + Netlify function setup
1. Create a SendGrid account and obtain an API key.
2. Deploy the `functions/contact.js` serverless function to Netlify. The function expects the environment variable `SENDGRID_API_KEY`.
3. Set the Netlify environment variables:
   - SENDGRID_API_KEY: your SendGrid API key
   - EMAIL_TO: help@ulrichauto.com
   - EMAIL_FROM: help@ulrichauto.com
4. Update `script.js`:
   - set `CONTACT_ENDPOINT` to your function's URL, e.g. `https://<your-netlify-site>.netlify.app/.netlify/functions/contact`.
5. Deploy the static site to GitHub Pages. The form will post to the serverless endpoint on Netlify.

Deploying to Netlify
- Netlify will automatically install dependencies from `package.json` and deploy the function from the `functions/` folder.
- The included `netlify.toml` file configures Netlify to publish the repository root and use `functions/` for serverless functions.

Customization
- Edit index.html to change wording or add hours and address.
- Adjust styles.css for colors and fonts.

If you want, I can: 
- Add images or a logo file
- Add deploy automation (GitHub Actions)
- Integrate a serverless form submission service so messages are delivered without requiring the user's mail client

Contact
Phone: (509) 433-7073
Email: help@ulrichauto.com
Website: www.ulrichauto.com
