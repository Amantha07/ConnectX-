// form_script.js

const apiBaseUrl = "http://localhost:8080/api/feedback";

// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        name: params.get('name'),
        email: params.get('email'),
        feedback: params.get('feedback')
    };
}

// Handle form submission
document.getElementById("feedback-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("feedback-id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;

    const feedbackData = { name, email, feedback };

    if (id) {
        // Edit existing feedback
        fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        })
        .then(() => {
            window.location.href = "feedback_display.html"; // Redirect to feedback display page
        })
        .catch(error => console.error("Error:", error));
    } else {
        // Submit new feedback
        fetch(apiBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        })
        .then(() => {
            window.location.href = "feedback_display.html"; // Redirect to feedback display page
        })
        .catch(error => console.error("Error:", error));
    }
});

// Load existing feedback data if editing
document.addEventListener("DOMContentLoaded", () => {
    const params = getQueryParams();
    if (params.id) {
        document.getElementById("feedback-id").value = params.id;
        document.getElementById("name").value = params.name;
        document.getElementById("email").value = params.email;
        document.getElementById("feedback").value = params.feedback;
        document.querySelector("#feedback-form button[type='submit']").textContent = "Update";
        document.getElementById("cancel-edit").style.display = "inline";
    }
});

// Function to cancel edit
document.getElementById("cancel-edit").addEventListener("click", function () {
    window.location.href = "feedback_display.html"; // Redirect to feedback display page
});
