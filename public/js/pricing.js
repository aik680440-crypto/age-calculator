'use strict';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const pricingAd = document.getElementById('pricing-ad');
function applyPremium(){
	const isPremium = localStorage.getItem('premium') === 'true';
	if (isPremium && pricingAd) pricingAd.style.display = 'none';
}
applyPremium();

const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn){
	checkoutBtn.addEventListener('click', async () => {
		try {
			const res = await fetch('/api/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
			const data = await res.json();
			if (data && data.url) {
				location.href = data.url;
			} else {
				alert('Unable to start checkout. Configure STRIPE_SECRET_KEY on server.');
			}
		} catch (e) {
			alert('Checkout error: ' + e.message);
		}
	});
}
