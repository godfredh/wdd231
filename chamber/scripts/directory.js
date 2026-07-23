document.addEventListener("DOMContentLoaded", () => {
    const directoryBox = document.getElementById("directory-box");
    const listViewBtn = document.getElementById("list-view-btn");
    const gridViewBtn = document.getElementById("grid-view-btn");

    // Set default initial state (Grid view by default)
    directoryBox.classList.add("grid-view");
    gridViewBtn.classList.add("activebtn");
    listViewBtn.classList.remove("activebtn");

    // Fetch members data
    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            directoryBox.innerHTML = `<p>Error loading directory. Please try again later.</p>`;
        }
    }

    // Display members
    function displayMembers(members) {
        directoryBox.innerHTML = "";

        members.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            const levelLabels = {
                1: "Member",
                2: "Silver",
                3: "Gold"
            };

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="100">
                <h3>${member.name}</h3>
                <p class="membership-level">${levelLabels[member.membershipLevel]}</p>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <a href="${member.website}" target="_blank" class="website-link">Visit Website</a>
                <p class="description">${member.description}</p>
            `;

            directoryBox.appendChild(card);
        });
    }

    // Grid view
    gridViewBtn.addEventListener("click", () => {
        directoryBox.classList.add("grid-view");
        directoryBox.classList.remove("list-view");
        gridViewBtn.classList.add("activebtn");
        listViewBtn.classList.remove("activebtn");
    });

    // List view
    listViewBtn.addEventListener("click", () => {
        directoryBox.classList.add("list-view");
        directoryBox.classList.remove("grid-view");
        listViewBtn.classList.add("activebtn");
        gridViewBtn.classList.remove("activebtn");
    });

    // Initialize
    getMembers();
});