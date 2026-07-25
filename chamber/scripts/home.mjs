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
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherMainContainer.innerHTML = `
        <h2>Current Weather</h2>
        <div class="weather-content" style="display: flex; align-items: center; gap: 15px;">
            <img src="${iconUrl}" alt="${desc}" style="width: 50px; height: 50px;">
            <div>
                <p style="font-size: 1.2rem; font-weight: bold; margin: 0;">${temp}&deg;C</p>
                <p style="text-transform: capitalize; margin: 0;">${desc}</p>
            </div>
        </div>
        <p style="margin-top: 10px; font-size: 0.9rem;">Humidity: ${data.main.humidity}%</p>
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
        card.classList.add('spotlight-card');
        
        // FIXED: Checks common image property names from members.json
        const companyImage = company.image || company.logo || company.icon || '';

        card.innerHTML = `
            <img src="${companyImage}" alt="${company.name} Logo" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px;">
            <h3>${company.name}</h3>
            <p style="font-size: 0.85rem; color: var(--yale-blue); font-weight: bold;">Level ${company.membershipLevel} Member</p>
            <p style="font-size: 0.9rem;">${company.address}</p>
            <p style="font-size: 0.9rem;">${company.phone}</p>
            <a href="${company.website}" target="_blank" class="website-link">Website</a>
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