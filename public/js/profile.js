'use strict';

// minimal duplicated data; in a real app consider sharing via module or API
const celebsData = [
	{ id: 'mrbeast', name: 'MrBeast', category: 'Internet Celebrity', dob: '1998-05-07', photo: '/images/mrbeast.jpg', bio: 'American YouTuber, entrepreneur, and philanthropist.' },
	{ id: 'zendaya', name: 'Zendaya', category: 'Actor', dob: '1996-09-01', photo: '/images/zendaya.jpg', bio: 'American actress and singer.' },
	{ id: 'simone-biles', name: 'Simone Biles', category: 'Sportsperson', dob: '1997-03-14', photo: '/images/simone-biles.jpg', bio: 'American artistic gymnast.' },
	{ id: 'charli-damelio', name: 'Charli D\'Amelio', category: 'Dancer', dob: '2004-05-01', photo: '/images/charli-damelio.jpg', bio: 'American social media personality and dancer.' }
];

function getQuery(id){
	const params = new URLSearchParams(location.search);
	return params.get(id);
}

function findCeleb(){
	const id = getQuery('id');
	return celebsData.find(c => c.id === id) || null;
}

function diffBreakdown(fromDate, toDate){
	let start = new Date(fromDate);
	let end = new Date(toDate);
	if (end < start) [start, end] = [end, start];
	let years = end.getFullYear() - start.getFullYear();
	let month = end.getMonth() - start.getMonth();
	let day = end.getDate() - start.getDate();
	let hour = end.getHours() - start.getHours();
	let minute = end.getMinutes() - start.getMinutes();
	let second = end.getSeconds() - start.getSeconds();
	if (second < 0){ second += 60; minute -= 1; }
	if (minute < 0){ minute += 60; hour -= 1; }
	if (hour < 0){ hour += 24; day -= 1; }
	if (day < 0){
		const temp = new Date(end.getFullYear(), end.getMonth(), 0);
		day += temp.getDate();
		month -= 1;
	}
	if (month < 0){ month += 12; years -= 1; }
	return { years, months: month, days: day, hours: hour, minutes: minute, seconds: second };
}

function renderProfile(){
	const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
	const c = findCeleb();
	const root = document.getElementById('profile');
	if (!c){ root.innerHTML = '<p>Not found.</p>'; return; }
	root.innerHTML = `
		<div style="display:grid;grid-template-columns:220px 1fr;gap:16px;align-items:start">
			<img src="${c.photo}" alt="${c.name}" style="width:220px;height:220px;object-fit:cover;border-radius:8px">
			<div>
				<h2 style="margin:0 0 4px 0">${c.name}</h2>
				<div style="color:#475569;font-size:14px;margin-bottom:8px">${c.category}</div>
				<div style="margin-bottom:12px">${c.bio}</div>
				<div id="age-line" class="age-row"></div>
			</div>
		</div>
	`;
	updateAge(c.dob);
	setInterval(() => updateAge(c.dob), 1000);
}

function updateAge(dob){
	const parts = diffBreakdown(new Date(dob), new Date());
	const el = document.getElementById('age-line');
	el.textContent = `Age: ${parts.years}y ${parts.months}m ${parts.days}d ${parts.hours}h ${parts.minutes}m ${parts.seconds}s`;
}

window.addEventListener('DOMContentLoaded', renderProfile);
