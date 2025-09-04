'use strict';

function isPremium(){ return localStorage.getItem('premium') === 'true'; }

function render(){
	const root = document.getElementById('compare');
	if (!isPremium()){
		root.innerHTML = `
			<h2>Premium required</h2>
			<p>Age Comparisons are available with Premium. <a href="/pricing.html">Get Premium</a>.</p>
		`;
		return;
	}
	root.innerHTML = `
		<h2>Compare Two Birthdays</h2>
		<form id="cmp-form" class="form">
			<label>Person A DOB <input type="date" id="a" required></label>
			<label>Person B DOB <input type="date" id="b" required></label>
			<button type="submit">Compare</button>
		</form>
		<div id="cmp-out" class="age-row" style="margin-top:12px"></div>
	`;
	const form = document.getElementById('cmp-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const a = new Date(document.getElementById('a').value);
		const b = new Date(document.getElementById('b').value);
		const diffDays = Math.abs(Math.floor((b - a) / 86400000));
		document.getElementById('cmp-out').textContent = `Difference: ${diffDays.toLocaleString()} days`;
	});
}

window.addEventListener('DOMContentLoaded', render);
