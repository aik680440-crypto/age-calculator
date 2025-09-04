const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Stripe Checkout (one-time $9)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe = null;
if (stripeSecretKey) {
	stripe = require('stripe')(stripeSecretKey);
}

app.post('/api/create-checkout-session', async (req, res) => {
	try {
		if (!stripe) {
			return res.status(500).json({ error: 'Stripe not configured' });
		}
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: 'Age Calculator Premium (No Ads + Age Comparisons)' },
						unit_amount: 900,
					},
					quantity: 1,
				},
			],
			success_url: `${req.protocol}://${req.get('host')}/premium-success.html`,
			cancel_url: `${req.protocol}://${req.get('host')}/pricing.html`,
		});
		return res.json({ id: session.id, url: session.url });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
