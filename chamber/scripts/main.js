document.addEventListener("DOMContentLoaded", () => {
    // Footer dynamic content
    const yearElement = document.getElementById("currentyear");
    const modifiedElement = document.getElementById("lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Hamburger menu toggle
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav ul");

    if (hamButton && navigation) {
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");
        });
    }

    // WAYFINDING - Highlight current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        if (linkHref) {
            const linkPage = linkHref.split("/").pop();
            if (linkPage === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    });
});