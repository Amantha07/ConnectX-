// display_script.js

const apiBaseUrl = "http://localhost:8080/api/feedback";

// Fetch and display feedbacks
function fetchFeedbacks() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(data => {
            const feedbackList = document.getElementById("feedback-list");
            feedbackList.innerHTML = "";

            data.forEach(feedback => {
                const feedbackItem = document.createElement("div");
                feedbackItem.className = "feedback-item";
                feedbackItem.innerHTML = `
                    <strong>${feedback.name} (${feedback.email})</strong>
                    <p>${feedback.feedback}</p>
                    <button onclick="editFeedback(${feedback.id}, '${feedback.name}', '${feedback.email}', '${feedback.feedback}')">Edit</button>
                    <button onclick="deleteFeedback(${feedback.id})">Delete</button>
                `;
                feedbackList.appendChild(feedbackItem);
            });
        })
        .catch(error => console.error("Error:", error));
}

// Function to edit feedback
function editFeedback(id, name, email, feedback) {
    window.location.href = `feedback_form.html?id=${id}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&feedback=${encodeURIComponent(feedback)}`;
}

// Function to delete feedback
function deleteFeedback(id) {
    fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE"
    })
    .then(() => fetchFeedbacks())
    .catch(error => console.error("Error:", error));
}

// Load feedbacks on page load
window.onload = fetchFeedbacks;
