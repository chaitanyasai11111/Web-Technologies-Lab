
class Course{

    constructor(courseName, instructor, seats){
        this.courseName = courseName;
        this.instructor = instructor;
        this.seats = seats;
        this.enrolled = 0;
    }

    displayCourse(){
        return `${this.courseName} (Instructor: ${this.instructor}) - Seats: ${this.enrolled}/${this.seats}`;
    }

    enroll(){

        return new Promise((resolve, reject)=>{

            if(this.enrolled < this.seats){
                this.enrolled++;
                resolve("Enrollment Successful");
            }
            else{
                reject("Course Full");
            }

        });

    }

}

const courses = [];


function addCourse(){

    const name = document.getElementById("courseName").value;
    const instructor = document.getElementById("instructor").value;
    const seats = Number(document.getElementById("seats").value);

    const course = new Course(name, instructor, seats);

    courses.push(course);

    updateCourseList();

}

// Update dropdown list
function updateCourseList(){

    const list = document.getElementById("courseList");

    list.innerHTML = "";

    courses.forEach((course,index)=>{

        const option = document.createElement("option");
        option.value = index;
        option.textContent = course.displayCourse();

        list.appendChild(option);

    });

}

// Enroll student
function enrollStudent(){

    const courseIndex = document.getElementById("courseList").value;
    const studentName = document.getElementById("studentName").value;

    const selectedCourse = courses[courseIndex];

    const output = document.getElementById("output");

    selectedCourse.enroll()
        .then(msg=>{
            output.innerHTML = `<p class="success">${studentName}: ${msg}</p>`;
            updateCourseList();
        })
        .catch(err=>{
            output.innerHTML = `<p class="error">${studentName}: ${err}</p>`;
        });

}