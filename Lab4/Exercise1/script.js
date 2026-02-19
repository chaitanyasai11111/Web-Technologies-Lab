const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");

let isUsernameAvailable = false;

usernameInput.addEventListener("input", function () {
    const username = usernameInput.value.trim();

    if (username.length === 0) {
        feedback.textContent = "";
        submitBtn.disabled = true;
        return;
    }

    // Show loading message
    feedback.textContent = "Checking availability...";
    feedback.className = "message loading";
    submitBtn.disabled = true;

    // Fetch local JSON file
    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            // Simulate server delay
            setTimeout(() => {

                if (data.users.includes(username)) {
                    feedback.textContent = "Username already taken";
                    feedback.className = "message error";
                    isUsernameAvailable = false;
                } else {
                    feedback.textContent = "Username available";
                    feedback.className = "message success";
                    isUsernameAvailable = true;
                }

                submitBtn.disabled = !isUsernameAvailable;

            }, 1000); // 1 second delay

        })
        .catch(error => {
            feedback.textContent = "Error checking username";
            feedback.className = "message error";
            submitBtn.disabled = true;
        });
});

// Prevent form submission if username unavailable
form.addEventListener("submit", function (e) {
    if (!isUsernameAvailable) {
        e.preventDefault();
        alert("Please choose an available username.");
    } else {
        alert("Registration Successful!");
    }
});
