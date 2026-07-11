document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");

    // Hamburger menu toggle
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // Close menu when a link is clicked (mobile)
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            hamButton.classList.remove("open");
        });
    });

    // Wayfinding - highlight current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Footer dynamic content
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
});