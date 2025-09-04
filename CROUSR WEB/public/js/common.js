'use strict';

function isPremium(){ return localStorage.getItem('premium') === 'true'; }

function hideAdsIfPremium(){
	if (!isPremium()) return;
	Array.from(document.querySelectorAll('.adsense-box')).forEach(el => {
		el.style.display = 'none';
	});
}

window.addEventListener('DOMContentLoaded', () => {
	const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
	hideAdsIfPremium();
});
