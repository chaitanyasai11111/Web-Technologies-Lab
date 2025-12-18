document.getElementById('regForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting to a server automatically
    event.preventDefault();

    // 1. Get values from inputs
    const name = document.getElementById('name').value.trim();
    const regNo = document.getElementById('regNo').value.trim();
    const email = document.getElementById('email').value.trim();
    const branch = document.getElementById('branch').value;
    
    // Get the message box element
    const messageBox = document.getElementById('message-box');

    // 2. Clear previous messages
    messageBox.style.color = 'black';
    messageBox.innerHTML = '';

    // 3. Validation Logic
    let errors = [];

    // Check Name
    if (name === "") {
        errors.push("Student Name is required.");
    } else if (name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }

    // Check Registration Number (Simple check: must be alphanumeric and not empty)
    if (regNo === "") {
        errors.push("Registration Number is required.");
    } else if (!/^[a-zA-Z0-9]+$/.test(regNo)) {
        errors.push("Registration Number should only contain letters and numbers.");
    }

    // Check Email
    if (email === "") {
        errors.push("Email is required.");
    } else if (!email.includes("@") || !email.includes(".")) {
        errors.push("Please enter a valid email address.");
    }

    // Check Branch
    if (branch === "") {
        errors.push("Please select a branch.");
    }

    // 4. Show Result
    if (errors.length > 0) {
        // Validation Failed
        messageBox.style.color = 'red';
        messageBox.innerHTML = "<strong>Error:</strong><br>" + errors.join("<br>");
    } else {
        // Validation Success
        
        // 5. Save the input (Simulated using LocalStorage)
        const studentData = {
            studentName: name,
            registrationNumber: regNo,
            studentEmail: email,
            studentBranch: branch
        };

        // Convert object to string and save to browser storage
        localStorage.setItem('lastRegisteredStudent', JSON.stringify(studentData));
        console.log("Data Saved:", studentData);

        // Show success message
        messageBox.style.color = 'green';
        messageBox.innerHTML = "<strong>Successfully submitted!</strong> Data has been saved locally.";
        
        // Optional: Reset form
        document.getElementById('regForm').reset();
    }
});