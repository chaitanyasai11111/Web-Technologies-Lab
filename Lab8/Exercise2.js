function processStudent(){

    
    let id = Number(document.getElementById("id").value);
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let age = Number(document.getElementById("age").value);
    let email = document.getElementById("email").value;
    let marks = Number(document.getElementById("marks").value);

    
    const student = {
        id: id,
        name: name,
        department: department,
        age: age,
        email: email,
        marks: marks
    };

    // Object destructuring
    const {id: studentId, name: studentName, department: dept, age: studentAge, email: studentEmail, marks: studentMarks} = student;

    console.log(studentId, studentName, dept, studentAge, studentEmail, studentMarks);

    // Function to calculate grade
    const calculateGrade = (marks) => {
        if(marks >= 90) return "A";
        else if(marks >= 75) return "B";
        else if(marks >= 60) return "C";
        else return "D";
    };

    // Creating new object using spread operator
    const updatedStudent = {
        ...student,
        grade: calculateGrade(studentMarks)
    };

    console.log(updatedStudent);

    // Display result using template literals
    document.getElementById("output").innerHTML = `
        Student ID: ${studentId} <br>
        Name: ${studentName} <br>
        Department: ${dept} <br>
        Age: ${studentAge} <br>
        Email: ${studentEmail} <br>
        Marks: ${studentMarks} <br>
        Grade: ${updatedStudent.grade}
    `;
}