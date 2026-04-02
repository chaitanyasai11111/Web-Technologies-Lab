import StudentCard from "./StudentCard";

function App() {
  return (
    <div className="container">
      <h1>Student Profiles</h1>

      <StudentCard 
        name="Chaitanya Sai"
        department="CSE"
        year="3rd Year"
        section="A"
      />

      <StudentCard 
        name="Rahul"
        department="IT"
        year="2nd Year"
        section="B"
      />

      <StudentCard 
        name="Sneha"
        department="ECE"
        year="4th Year"
        section="C"
      />

    </div>
  );
}

export default App;