document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.querySelector("#courses-container");
    const modal = document.querySelector("#course-modal");
    const modalTitle = document.querySelector("#modal-title");
    const modalDescription = document.querySelector("#modal-description");
    const modalDuration = document.querySelector("#modal-duration");
    const modalLevel = document.querySelector("#modal-level");
    const modalHardware = document.querySelector("#modal-hardware");
    const modalPrice = document.querySelector("#modal-price");
    const closeModalBtn = document.querySelector("#close-modal");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let allCourses = [];

    async function fetchCourses() {
        try {
            const response = await fetch("data/courses.json");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allCourses = await response.json();
            displayCourses(allCourses);
        } catch (error) {
            console.error("Failed to fetch course data:", error);
            if (coursesContainer) {
                coursesContainer.innerHTML = `<p class="error-msg">Sorry, we were unable to load the course catalog at this time.</p>`;
            }
        }
    }

    function displayCourses(coursesToDisplay) {
        if (!coursesContainer) return;
        coursesContainer.innerHTML = "";

        coursesToDisplay.forEach(course => {
            const card = document.createElement("article");
            card.classList.add("course-card");

            card.innerHTML = `
                <div>
                    <span class="badge">${course.category.toUpperCase()}</span>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p class="course-price"><strong>Fee:</strong> ${course.price}</p>
                </div>
                <button class="course-details-btn" data-id="${course.id}">View Details</button>
            `;
            coursesContainer.appendChild(card);
        });

        document.querySelectorAll(".course-details-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const courseId = parseInt(e.target.getAttribute("data-id"));
                const selectedCourse = allCourses.find(c => c.id === courseId);
                if (selectedCourse) openModal(selectedCourse);
            });
        });
    }

    function openModal(course) {
        if (!modal) return;
        modalTitle.textContent = course.title;
        modalDescription.textContent = course.description;
        modalDuration.textContent = course.duration;
        modalLevel.textContent = course.level;
        if (modalHardware) modalHardware.textContent = course.hardware;
        if (modalPrice) modalPrice.textContent = course.price;
        modal.showModal();
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.close());
        modal.addEventListener("click", (e) => {
            const dims = modal.getBoundingClientRect();
            if (e.clientX < dims.left || e.clientX > dims.right || e.clientY < dims.top || e.clientY > dims.bottom) {
                modal.close();
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            const filterValue = e.target.getAttribute("data-filter");
            if (filterValue === "all") {
                displayCourses(allCourses);
            } else {
                displayCourses(allCourses.filter(c => c.category === filterValue));
            }
        });
    });

    fetchCourses();
});