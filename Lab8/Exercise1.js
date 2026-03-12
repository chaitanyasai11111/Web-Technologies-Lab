
const calculateTotal = (marks) => {
    return marks.reduce((sum, mark) => sum + mark, 0);
}


const calculateAverage = (total, count) => {
    return total / count;
}

function calculateMarks(){

    let studentName = document.getElementById("name").value;
    let rollNumber = document.getElementById("roll").value;

    let math = Number(document.getElementById("math").value);
    let science = Number(document.getElementById("science").value);
    let english = Number(document.getElementById("english").value);
    let computer = Number(document.getElementById("computer").value);

    
    const marks = [math, science, english, computer];

    
    const student = {
        name: studentName,
        roll: rollNumber,
        marks: marks
    };

    
    let total = calculateTotal(student.marks);
    let average = calculateAverage(total, student.marks.length);

    
    document.getElementById("result").innerHTML = `
        Student Name : ${student.name} <br>
        Roll Number : ${student.roll} <br>
        Total Marks : ${total} <br>
        Average Marks : ${average.toFixed(2)}
    `;

    
    console.log(`Student Name: ${student.name}`);
    console.log(`Roll Number: ${student.roll}`);
    console.log(`Total Marks: ${total}`);
    console.log(`Average Marks: ${average.toFixed(2)}`);
}