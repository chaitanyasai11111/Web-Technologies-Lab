const form = document.getElementById("registerForm");

const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const role = document.getElementById("role");
const skillsBox = document.getElementById("skillsBox");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

/* ---------- Role Based UI ---------- */
role.addEventListener("change", function () {
    if (role.value === "teacher" || role.value === "admin") {
        skillsBox.style.display = "block";
    } else {
        skillsBox.style.display = "none";
    }
});

/* ---------- Email Validation ---------- */
email.addEventListener("input", function () {
    if (!email.value.endsWith("@gmail.com")) {
        emailError.textContent = "Only Gmail addresses allowed";
        markInvalid(email);
    } else {
        emailError.textContent = "";
        markValid(email);
    }
});

/* ---------- Password Validation ---------- */
password.addEventListener("input", function () {
    validatePassword();
});

confirmPassword.addEventListener("input", function () {
    if (password.value !== confirmPassword.value) {
        confirmError.textContent = "Passwords do not match";
        markInvalid(confirmPassword);
    } else {
        confirmError.textContent = "";
        markValid(confirmPassword);
    }
});

function validatePassword() {
    let pass = password.value;
    let rule = "";

    if (role.value === "admin") {
        rule = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
        passwordError.textContent =
            "Admin password must have uppercase, number & symbol";
    } else {
        rule = /.{6,}/;
        passwordError.textContent = "Minimum 6 characters required";
    }

    if (!rule.test(pass)) {
        markInvalid(password);
    } else {
        passwordError.textContent = "";
        markValid(password);
    }
}

/* ---------- Helper Functions ---------- */
function markInvalid(input) {
    input.classList.add("invalid");
    input.classList.remove("valid");
}

function markValid(input) {
    input.classList.add("valid");
    input.classList.remove("invalid");
}

/* ---------- Form Submission ---------- */
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        email.classList.contains("valid") &&
        password.classList.contains("valid") &&
        confirmPassword.classList.contains("valid")
    ) {
        alert("Registration Successful ✅");
        form.reset();
        skillsBox.style.display = "none";
    } else {
        alert("Please fix validation errors ❌");
    }
});
