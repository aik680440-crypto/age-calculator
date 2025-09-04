'use strict';

const celebsData = [
	{ id: 'mrbeast', name: 'MrBeast', category: 'Internet Celebrity', dob: '1998-05-07', photo: '/images/mrbeast.jpg', bio: 'American YouTuber, entrepreneur, and philanthropist.' },
	{ id: 'zendaya', name: 'Zendaya', category: 'Actor', dob: '1996-09-01', photo: '/images/zendaya.jpg', bio: 'American actress and singer.' },
	{ id: 'simone-biles', name: 'Simone Biles', category: 'Sportsperson', dob: '1997-03-14', photo: '/images/simone-biles.jpg', bio: 'American artistic gymnast.' },
	{ id: 'charli-damelio', name: 'Charli D\'Amelio', category: 'Dancer', dob: '2004-05-01', photo: '/images/charli-damelio.jpg', bio: 'American social media personality and dancer.' }
];

function isValidDate(d){ return d instanceof Date && !Number.isNaN(d.valueOf()); }

function diffYears(dob){
	const start = new Date(dob);
	const end = new Date();
	let years = end.getFullYear() - start.getFullYear();
	const m = end.getMonth() - start.getMonth();
	if (m < 0 || (m === 0 && end.getDate() < start.getDate())) years--;
	return years;
}

function renderOptions(){
	const sel = document.getElementById('category-filter');
	const cats = Array.from(new Set(celebsData.map(c => c.category))).sort();
	cats.forEach(cat => {
		const opt = document.createElement('option');
		opt.value = cat; opt.textContent = cat; sel.appendChild(opt);
	});
}

function renderGrid(filter){
	const grid = document.getElementById('celebs-grid');
	grid.innerHTML = '';
	celebsData.filter(c => filter === 'all' || c.category === filter).forEach(c => {
		const age = diffYears(c.dob);
		const a = document.createElement('a');
		a.href = `/profile.html?id=${encodeURIComponent(c.id)}`;
		a.className = 'card';
		a.style.display = 'grid';
		a.style.gap = '8px';
		a.innerHTML = `
			<img src="${c.photo}" alt="${c.name}" style="width:100%;height:150px;object-fit:cover;border-radius:6px">
			<div style="font-weight:700">${c.name}</div>
			<div style="font-size:12px;color:#475569">${c.category}</div>
			<div style="font-size:12px;color:#334155">Age: ${age}</div>
		`;
		grid.appendChild(a);
	});
}

window.addEventListener('DOMContentLoaded', () => {
	const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
	renderOptions();
	const sel = document.getElementById('category-filter');
	sel.addEventListener('change', () => renderGrid(sel.value));
	renderGrid('all');
});
