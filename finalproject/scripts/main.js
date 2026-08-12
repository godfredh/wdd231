document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation
    const menuButton = document.querySelector("#menu");
    const navList = document.querySelector(".nav-list");
    if (menuButton && navList) {
        menuButton.addEventListener("click", () => {
            navList.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    }

    // 2. Dynamic Year
    const yearSpan = document.querySelector("#current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 3. Local Storage Handling (Welcome Message)
    const registrationForm = document.querySelector("#registration-form");
    const welcomeContainer = document.querySelector("#welcome-message");

    const savedName = localStorage.getItem("afanovaUserName");
    if (savedName && welcomeContainer) {
        welcomeContainer.innerHTML = `<p style="color: #fff; font-weight: bold; margin-bottom: 1rem;">Welcome back, ${savedName}!</p>`;
    }

    // 4. Form Submission (Local Storage + Web3Forms Email)
    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent blank page reload

            const nameInput = document.querySelector("#fullname");
            if (nameInput) {
                localStorage.setItem("afanovaUserName", nameInput.value.trim());
            }

            // Prepare form data to send to Web3Forms
            const formData = new FormData(registrationForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });

                const result = await response.json();
                if (response.status === 200) {
                    alert(`Thank you! Your registration was sent successfully and saved.`);
                    window.location.reload(); // Refresh to trigger the welcome banner
                } else {
                    alert(`Something went wrong: ${result.message}`);
                }
            } catch (error) {
                alert("Network error. Please check your connection and try again.");
            }
        });
    }
});