# Age Calculator App

Clean, simple age calculator with live updates, multiple formats, famous birthdays, ad placeholders (Google AdSense-style), and Premium via Stripe Checkout (one-time $9) that unlocks No Ads and Age Comparisons.

## Requirements
- Node.js 18+
- A Stripe account and a Secret Key (starts with `sk_`)

## Setup (Windows PowerShell)
1. Open PowerShell in the project folder.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Create a `.env` file and add your Stripe Secret Key:
   ```
   STRIPE_SECRET_KEY=sk_live_or_test_key_here
   PORT=3000
   ```
4. Start the server:
   ```powershell
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## Premium
- Purchase on the Pricing page. After successful payment, you are redirected to `premium-success.html` which enables premium on this device (stored in `localStorage`).
- Premium hides all `.adsense-box` elements and unlocks Age Comparisons.

## Notes
- The ad elements are placeholders styled to resemble Google ad formats but do not load real ads.
- Images under `public/images/` should be provided for celebrity profiles (`mrbeast.jpg`, `zendaya.jpg`, `simone-biles.jpg`, `charli-damelio.jpg`).
- To change the price or features, edit `server.js` and the pricing text.
