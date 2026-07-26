// scripts/home.mjs

// ============================================
// 1. Current Events Section
// ============================================
const eventsListContainer = document.querySelector('#events-list');

function loadEvents() {
    if (!eventsListContainer) return;

    // Sample events data for the Chamber
    const events = [
        { title: "Annual Business Luncheon", date: "August 15, 2026", location: "Kempinski Hotel, Accra" },
        { title: "Tech & Innovation Networking Mixer", date: "August 28, 2026", location: "Accra Digital Centre" }
    ];

    let html = '<ul>';
    events.forEach(event => {
        html += `<li><strong>${event.title}</strong><br>${event.date} - ${event.location}</li>`;
    });
    html += '</ul>';

    eventsListContainer.innerHTML = html;
}

// ============================================
// 2. Weather & Forecast Section (OpenWeatherMap API)
// ============================================
const weatherMainContainer = document.querySelector('#weather-main');
const weatherForecastContainer = document.querySelector('#weather-forecast');

// Coordinates for Accra / Tema region
const lat = '5.5560';
const lon = '-0.1969';
const apiKey = 'f84ac1046911cf31a1025ac3a55ea564';

async function getWeather() {
    if (!weatherMainContainer) return;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        // Fetch Current Weather
        const responseCurrent = await fetch(currentWeatherUrl);
        if (responseCurrent.ok) {
            const dataCurrent = await responseCurrent.json();
            displayCurrentWeather(dataCurrent);
        }

        // Fetch Weather Forecast
        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const dataForecast = await responseForecast.json();
            displayForecast(dataForecast);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherMainContainer.innerHTML = '<p>Weather data unavailable.</p>';
    }
}

function displayCurrentWeather(data) {
    // 1. Define the iconUrl using the data returned from the API
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const description = data.weather[0].description;

    // 2. Build your weather HTML, adding explicit width and height to prevent layout shifts
    weatherMainContainer.innerHTML = `
        <h3>Current Weather</h3>
        <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${iconUrl}" alt="${description}" width="50" height="50">
            <p style="font-size: 1.2rem; font-weight: bold; margin: 0;">${Math.round(data.main.temp)}&deg;C</p>
        </div>
        <p style="text-transform: capitalize; margin-top: 5px;">${description}</p>
    `;
}
function displayForecast(data) {
    // Filter forecast to get midday readings (approx. every 24 hours)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    let html = '<h2>3-Day Forecast</h2><ul style="list-style: none; padding: 0; margin: 0;">';

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        html += `<li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--cool-gray);">
            <span>${date}</span>
            <span>${temp}&deg;C - ${day.weather[0].description}</span>
        </li>`;
    });
    html += '</ul>';

    weatherForecastContainer.innerHTML = html;
}

// ============================================
// 3. Company Spotlights Section
// ============================================
const spotlightsContainer = document.querySelector('.spotlights-main-box');

async function getSpotlights() {
    if (!spotlightsContainer) return;

    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Filter for Gold (Level 3) or Silver (Level 2) members if applicable
        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3 ||
            member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold'
        );

        // Randomly pick 2 or 3 companies
        const selected = getRandomItems(qualifiedMembers, 3);
        displaySpotlights(selected);
    } catch (error) {
        console.error('Error loading spotlights:', error);
        spotlightsContainer.innerHTML = '<p>Spotlights currently unavailable.</p>';
    }
}

function getRandomItems(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function displaySpotlights(companies) {
    spotlightsContainer.innerHTML = '';

    companies.forEach(company => {
        const card = document.createElement('div');
        // Add class to match your site's card design
        card.classList.add('spotlight-card');

        // Inline styling for professional card layout matching the weather/events section
        card.style.cssText = `
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        `;

        const imageName = company.image || company.logo || company.icon || '';
        const companyImage = imageName ? `images/${imageName}` : 'images/default-logo.png';

        card.innerHTML = `
            <div style="height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                <img src="${companyImage}" alt="${company.name} Logo" width="140" height="60" style="max-height: 60px; max-width: 140px; object-fit: contain;">
            </div>
            <h3 style="font-size: 1.1rem; margin: 5px 0; color: var(--yale-blue, #1e3a8a);">${company.name}</h3>
            <p style="font-size: 0.85rem; color: #2563eb; font-weight: bold; margin: 4px 0;">Level ${company.membershipLevel} Member</p>
            <hr style="width: 100%; border: none; border-top: 1px solid #edf2f7; margin: 8px 0;">
            <p style="font-size: 0.85rem; color: #4a5568; margin: 3px 0;">${company.address}</p>
            <p style="font-size: 0.85rem; color: #4a5568; margin: 3px 0;">${company.phone}</p>
            <a href="${company.website}" target="_blank" class="website-link" style="margin-top: 10px; display: inline-block; font-size: 0.9rem; font-weight: 600; text-decoration: none; color: #2563eb;">Website &rarr;</a>
        `;
        spotlightsContainer.appendChild(card);
    });
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    getWeather();
    getSpotlights();
});