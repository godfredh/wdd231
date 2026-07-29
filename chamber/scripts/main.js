document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Hamburger Menu Functionality
    // ============================================
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

    // ============================================
    // Membership Modals Functionality
    // ============================================
    const modals = [
        { btn: document.querySelector("#npButton"), modal: document.querySelector("#npModal") },
        { btn: document.querySelector("#bronzeButton"), modal: document.querySelector("#bronzeModal") },
        { btn: document.querySelector("#silverButton"), modal: document.querySelector("#silverModal") },
        { btn: document.querySelector("#goldButton"), modal: document.querySelector("#goldModal") }
    ];

    modals.forEach(item => {
        if (item.btn && item.modal) {
            // Open the modal
            item.btn.addEventListener("click", () => {
                item.modal.showModal();
            });

            // Close the modal via the close button
            const closeBtn = item.modal.querySelector(".close-modal");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    item.modal.close();
                });
            }

            // Close when clicking outside the modal backdrop
            item.modal.addEventListener("click", (e) => {
                const dialogDimensions = item.modal.getBoundingClientRect();
                if (
                    e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    item.modal.close();
                }
            });
        }
    });
});