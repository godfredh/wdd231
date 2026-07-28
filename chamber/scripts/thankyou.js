document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.querySelector("#results");

    // Extract required and main form fields
    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const orgTitle = urlParams.get("organizationTitle");
    const email = urlParams.get("email");
    const phone = urlParams.get("phone");
    const organization = urlParams.get("organization");
    const membershipLevel = urlParams.get("membershipLevel");
    const description = urlParams.get("organizationDescription");
    const timestamp = urlParams.get("timestamp");

    // Format timestamp nicely if present
    let formattedDate = "N/A";
    if (timestamp) {
        try {
            formattedDate = new Date(timestamp).toLocaleString();
        } catch (e) {
            formattedDate = timestamp;
        }
    }

    // Build the display HTML
    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName ? escapeHtml(firstName) : "N/A"}</p>
        <p><strong>Last Name:</strong> ${lastName ? escapeHtml(lastName) : "N/A"}</p>
        <p><strong>Organizational Title:</strong> ${orgTitle ? escapeHtml(orgTitle) : "N/A"}</p>
        <p><strong>Email Address:</strong> ${email ? escapeHtml(email) : "N/A"}</p>
        <p><strong>Mobile Phone:</strong> ${phone ? escapeHtml(phone) : "N/A"}</p>
        <p><strong>Business/Organization:</strong> ${organization ? escapeHtml(organization) : "N/A"}</p>
        <p><strong>Membership Level:</strong> ${membershipLevel ? escapeHtml(membershipLevel) : "N/A"}</p>
        <p><strong>Description:</strong> ${description ? escapeHtml(description) : "N/A"}</p>
        <p><strong>Submission Timestamp:</strong> ${formattedDate}</p>
    `;
});

// Basic security helper to prevent HTML injection from query strings
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}