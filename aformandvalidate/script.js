
const form = document.getElementById("applicationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    // Validate name
    if (name.length < 2) {
        showError("nameError", "Enter a name with at least 2 characters.");
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("emailError", "Enter a valid email address.");
        isValid = false;
    }

    // Validate phone
    const phonePattern = /^\+?[0-9\s()-]{7,20}$/;
    const digitCount = phone.replace(/\D/g, "").length;

    if (!phonePattern.test(phone) ||
        digitCount < 7 || digitCount > 15) {
        showError("phoneError", "Enter a valid phone number.");
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError("messageError", "Message must be at least 10 characters.");
        isValid = false;
    }

    if (!isValid) return;

    // Create a submission object
    const application = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        submittedAt: new Date().toLocaleString()
    };

    try {
        // Get previously saved submissions
        const savedApplications = JSON.parse(
            localStorage.getItem("applications") || "[]"
        );

        // Add the new application
        savedApplications.push(application);

        // Save all applications in the browser
        localStorage.setItem(
            "applications",
            JSON.stringify(savedApplications)
        );

        document.getElementById("successMessage").textContent =
            "Your information has been saved successfully!";

        form.reset();

        // For practice: display saved records in the console
        console.log("Saved applications:", savedApplications);

    } catch (error) {
        document.getElementById("successMessage").textContent =
            "Unable to save your information. Please try again.";
        console.error("Saving failed:", error);
    }
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}
