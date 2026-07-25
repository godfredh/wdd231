document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('#menu');
    const navigationMenu = document.querySelector('nav ul');

    console.log("Hamburger button found:", hamburgerBtn);
    console.log("Navigation menu found:", navigationMenu);

    if (hamburgerBtn && navigationMenu) {
        hamburgerBtn.addEventListener('click', () => {
            console.log("Hamburger clicked!");
            hamburgerBtn.classList.toggle('open');
            navigationMenu.classList.toggle('open');
        });
    } else {
        console.error("Error: Could not find #menu or nav ul in the DOM!");
    }
});