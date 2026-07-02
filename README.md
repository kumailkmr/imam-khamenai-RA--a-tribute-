# Tribute Website - Imam Khamenei (RA)

This is a Next.js (App Router, JavaScript) memorial/tribute website styled with an Islamic Republic of Iran visual identity.

## Features

- **Next.js 16+** (App Router, JavaScript)
- **Tailwind CSS v4** with a custom color palette (Ink Black, Charcoal, Iranian Green, Brass/Gold)
- **Framer Motion** for elegant scroll and entry animations
- **Custom Typography** featuring Amiri (for headlines/Arabic), Inter (body), and IBM Plex Mono (dates/labels)
- **Functional Guestbook** saving condolences locally

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing Content

All of the site's textual content is centralized in a single configuration file for easy editing. You do not need to modify the component code to change the text.

Open `lib/content.js` to edit:
- **Site details** (Name, dates, condolence phrase)
- **Biography prose and stats**
- **Timeline milestones**
- **Commemoration/Funeral details**

### Adding Images

There is an intentional placeholder in the Hero section pattern. If you wish to add a real portrait or image, you can modify `app/page.js` within the `Hero` component to include a standard `next/image` tag pointing to your image file placed in the `/public` directory.

## API & Database

This project now uses **SQLite (better-sqlite3)** for robust local persistence and performance. 
The database file is automatically created at `data/tribute.db`.

### Guestbook Features
- **Real-time Sync**: Uses SWR intelligent polling to show new condolences in real-time.
- **Pagination & Sorting**: Automatically paginates entries and allows sorting by "Newest" or "Most Reactions".
- **Reactions**: Visitors can click the Flame icon to leave a respectful reaction on condolences.
- **Spam Filtering & Rate Limiting**: Built-in protections against flooding and inappropriate language.

### Moderation (Admin)

You can hide or delete inappropriate messages using the protected Admin API route. 

1. Ensure you have copied `.env.example` to `.env` and set `ADMIN_SECRET`.
2. To hide a message, send a PATCH request with the Bearer token:
```bash
curl -X PATCH http://localhost:3000/api/guestbook/[ENTRY_ID] \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"isHidden": true}'
```

## Language & Accessibility

This site supports full English and Persian (Farsi) localization, including dynamic RTL layout shifting.
- UI strings are managed in `lib/translations.js`.
- Site content (Biography, Timeline) is managed in `lib/content.js`.
- Announcements are managed in `lib/announcements.js`.

To add new translations or modify existing ones, update the respective dictionaries in those files.

Visitors can access the **Accessibility Menu** (gear icon in the bottom left) to:
- Toggle between English and Persian.
- Increase text size.
- Reduce the background pattern for visual comfort.

## Content Verification & Maintenance

All factual information (dates, biography, announcements) is decoupled from the UI and resides in `lib/content.js` and `lib/announcements.js`.

### Updating the Funeral Schedule
The funeral schedule and any announcements should be carefully updated in `lib/announcements.js`. 
- **CRITICAL:** Always re-verify the dates with official Iranian State Media or verified news sources before a deploy, as schedules are prone to changes.
- Ensure the `lastVerifiedDate` variable at the top of `lib/announcements.js` is updated whenever you audit the facts. This date is rendered visibly in the Commemoration section to establish trust.
- Every claim must be accompanied by a `sourceUrl` linking to the original verifiable record.

### Quotes
There are no fabricated quotes on this site. If you wish to feature a quote, there is a commented-out section in `lib/content.js` under `quotes`. Only add fully verified, accurately translated, and directly sourced text here.

## Audio Configuration & Licensing

The site uses a central audio engine powered by [Tone.js](https://tonejs.github.io/) to generate programmatic, respectful soundscapes without relying on copyrighted material. All sounds are **opt-in**, completely muted by default, and can be toggled via the persistent Sound button in the bottom right corner (or during the Intro).

### Sound Moments
1. **Intro Drone**: A low, sustained ambient drone (sine/triangle oscillator) with slight reverb that plays underneath the loading sequence, gracefully fading out as the site appears.
2. **Welcome Chime**: Two gentle sine notes played a fifth apart when the total mourners toast slides into view.
3. **Alert Sequence**: A soft three-note ascending chime triggered only when an urgent official announcement (e.g., funeral start) mounts in the AlertBanner.
4. **Guestbook Ping**: A quiet, single-note variant that plays when a new live message or reaction streams into the guestbook.

### Adding Licensed Audio
Do **NOT** add copyrighted Quranic recitations, Azans, or Nasheeds unless you hold explicit licensing or can prove they are in the public domain. Reciters hold performance rights.

If you have acquired a legal license:
1. Place the audio file (e.g., `licensed-recitation.mp3`) in the `/public/audio/` directory.
2. Open `lib/sound.js`.
3. Change the `licensedAudioPath` variable to the path of your file (e.g., `export const licensedAudioPath = "/audio/licensed-recitation.mp3";`).
4. The site will automatically use this track during the intro sequence instead of the generative drone when a user un-mutes the site.

### Intro Behavior
The Intro animation is governed by a `sessionStorage` flag (`tribute_intro_seen`). It plays exactly once per browser session. The visitor can immediately bypass it by clicking the "Skip Intro" button, or by having "prefers-reduced-motion" enabled in their OS.

## Adding a real photo

To maintain authenticity, the site does not use fabricated stock photos. It ships with a geometric placeholder in the Hero section (`public/images/portrait-placeholder.jpg`). You must replace this file with a legally acquired image. 

Here are three legitimate sourcing paths:

1. **Wikimedia Commons**: Search for "Ali Khamenei," filter to images with a free license (e.g., CC BY 4.0 or public domain). Note the specific license required and the photographer's name.
2. **Official Khamenei.ir archive**: Check the site's stated terms of use for images before republishing their official photography.
3. **Press Agencies (Reuters/AP/Getty)**: If you desire a specific wire photo, you must purchase a license from the agency. This is a financial and legal requirement.

Once you have the image file:
## Site Administration & Analytics

The site includes a protected backend dashboard for managing dynamic content.

### Admin Dashboard Access
The dashboard is accessible at `/admin`. It uses a secure, `httpOnly` JWT cookie session.
To log in:
1. In your deployment environment (e.g., Vercel, Node server), set the `ADMIN_PASSWORD` and `ADMIN_SECRET` environment variables.
   - `ADMIN_PASSWORD`: The password required to log in.
   - `ADMIN_SECRET`: A long, random string used to cryptographically sign the session cookie.
2. Navigate to `/admin/login`.
3. Enter your `ADMIN_PASSWORD`.

### Dashboard Features
- **Guestbook Moderation**: Hide or unhide abusive entries instantly. You can also permanently delete entries or export the entire guestbook to a CSV file for archiving.
- **Announcements Editor**: Add, edit, or remove entries in the top scrolling ticker without requiring a code deploy.
- **Condolences Editor**: Manage the list of Official Condolences. 

*(Note: `globalAlert` and `extendedFuneralDetails` configuration remain in `lib/announcements.js` for architectural simplicity.)*

### Adding Analytics
The site supports lightweight, privacy-respecting analytics (like Plausible or Umami).
To enable analytics, set the following environment variables:
- `NEXT_PUBLIC_ANALYTICS_URL`: The URL to your analytics script (e.g., `https://plausible.io/js/script.js`).
- `NEXT_PUBLIC_ANALYTICS_ID`: Your site's domain ID for the analytics provider.

If both variables are present, the script will automatically be injected into the `<head>` of the site.
