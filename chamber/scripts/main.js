document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // Footer dynamic content
    // ----------------------------------------------------
    const yearElement = document.getElementById("currentyear");
    const modifiedElement = document.getElementById("lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // ----------------------------------------------------
    // Hamburger menu toggle
    // ----------------------------------------------------
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav ul");

    if (hamButton && navigation) {
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");
        });
    }

    // ----------------------------------------------------
    // WAYFINDING - Highlight current page
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // JOIN PAGE - Timestamp Field
    // ----------------------------------------------------
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // ----------------------------------------------------
    // JOIN PAGE - Membership Level Modals
    // ----------------------------------------------------
    const modalPairs = [
        { btnId: "npButton", modalId: "npModal" },
        { btnId: "bronzeButton", modalId: "bronzeModal" },
        { btnId: "silverButton", modalId: "silverModal" },
        { btnId: "goldButton", modalId: "goldModal" }
    ];

    modalPairs.forEach(pair => {
        const button = document.getElementById(pair.btnId);
        const modal = document.getElementById(pair.modalId);

        if (button && modal) {
            // Open modal on button click
            button.addEventListener("click", () => {
                modal.showModal();
            });

            // Close modal when clicking the internal close button
            const closeBtn = modal.querySelector(".close-modal");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    modal.close();
                });
            }

            // Close modal when clicking outside of the modal window content
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.close();
                }
            });
        }
    });
});