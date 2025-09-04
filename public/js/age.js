'use strict';

const dobInput = document.getElementById('dob');
const asofInput = document.getElementById('asof');
const form = document.getElementById('age-form');
const liveAge = document.getElementById('live-age');
const ageTraditional = document.getElementById('age-traditional');
const ageTotalDays = document.getElementById('age-total-days');
const ageTotalHours = document.getElementById('age-total-hours');
const ageTotalMins = document.getElementById('age-total-mins');
const footerYear = document.getElementById('year');

if (footerYear) footerYear.textContent = new Date().getFullYear();

let ticker = null;

function isValidDate(d){ return d instanceof Date && !Number.isNaN(d.valueOf()); }

function parseAsOf(){
	const val = asofInput && asofInput.value ? asofInput.value : null;
	if (!val) return new Date();
	const d = new Date(val);
	return isValidDate(d) ? d : new Date();
}

function parseDob(){
	const val = dobInput && dobInput.value ? dobInput.value : null;
	if (!val) return null;
	const d = new Date(val);
	return isValidDate(d) ? d : null;
}

function diffBreakdown(fromDate, toDate){
	// years, months, days, hours, minutes, seconds exact
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
		// borrow from previous month
		const temp = new Date(end.getFullYear(), end.getMonth(), 0);
		day += temp.getDate();
		month -= 1;
	}
	if (month < 0){ month += 12; years -= 1; }

	return { years, months: month, days: day, hours: hour, minutes: minute, seconds: second };
}

function totalUnits(fromDate, toDate){
	const ms = Math.max(0, toDate - fromDate);
	const totalMinutes = Math.floor(ms / 60000);
	const totalHours = Math.floor(ms / 3600000);
	const totalDays = Math.floor(ms / 86400000);
	return { totalMinutes, totalHours, totalDays };
}

function renderAll(){
	const dob = parseDob();
	if (!dob){
		liveAge.classList.add('hidden');
		return;
	}
	const now = parseAsOf();
	const parts = diffBreakdown(dob, now);
	const totals = totalUnits(dob, now);

	ageTraditional.textContent = `Traditional: ${parts.years} years, ${parts.months} months, ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds`;
	ageTotalDays.textContent = `Total days lived: ${totals.totalDays.toLocaleString()}`;
	ageTotalHours.textContent = `Total hours lived: ${totals.totalHours.toLocaleString()}`;
	ageTotalMins.textContent = `Total minutes lived: ${totals.totalMinutes.toLocaleString()}`;

	liveAge.classList.remove('hidden');
}

function startTicker(){
	if (ticker) clearInterval(ticker);
	renderAll();
	ticker = setInterval(renderAll, 1000);
}

if (form){
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		startTicker();
	});
}
