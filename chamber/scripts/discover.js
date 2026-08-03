import { discoverItems } from '../data/discover.mjs';

// 1. Render the 8 Items of Interest dynamically into the card container
const cardContainer = document.getElementById('card-container');

if (cardContainer) {
    cardContainer.innerHTML = ""; // Clear existing content
    discoverItems.forEach(item => {
        const card = document.createElement('section');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        cardContainer.appendChild(card);
    });

    // Add functionality to the "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = discoverItems[index];
            alert(`You clicked learn more about ${item.title} located at ${item.address}.`);
        });
    });
}

// 2. Handle LocalStorage Visitor Message Logic (Fixed to use pre-existing HTML node to prevent layout shifts)
const visitorMessageContainer = document.getElementById('visitor-message');

const lastVisitKey = 'accra_chamber_last_visit';
const currentTimestamp = Date.now();
const lastVisitTimestamp = localStorage.getItem(lastVisitKey);

let message = '';

if (!lastVisitTimestamp) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentTimestamp - Number(lastVisitTimestamp);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

if (visitorMessageContainer) {
    visitorMessageContainer.textContent = message;
}
localStorage.setItem(lastVisitKey, currentTimestamp);

// 3. Dynamic Calendar Builder (Highlights Today)
const calendarBody = document.querySelector('#calendar tbody');
if (calendarBody) {
    calendarBody.innerHTML = ''; // Clear prior rows

    const todayObj = new Date();
    const currentYear = todayObj.getFullYear();
    const currentMonth = todayObj.getMonth();
    const currentDay = todayObj.getDate();

    // Set for current year/month
    const year = 2026;
    const month = 7; // August is month 7 (0-indexed)

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let date = 1;
    let row = document.createElement('tr');

    // Fill in blank spots before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Fill in the days of the month (First Row)
    for (let i = firstDayIndex; i < 7; i++) {
        if (date <= totalDays) {
            let cell = document.createElement('td');
            cell.textContent = date;

            // Check if this cell is today's date
            if (date === currentDay && month === currentMonth && year === currentYear) {
                cell.classList.add('today');
            }

            row.appendChild(cell);
            date++;
        }
    }
    calendarBody.appendChild(row);

    // Build the rest of the rows
    while (date <= totalDays) {
        row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            if (date <= totalDays) {
                let cell = document.createElement('td');
                cell.textContent = date;

                // Check if this cell is today's date
                if (date === currentDay && month === currentMonth && year === currentYear) {
                    cell.classList.add('today');
                }

                row.appendChild(cell);
                date++;
            } else {
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
        }
        calendarBody.appendChild(row);
    }
}