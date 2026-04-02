function StudentProfile() {
  const name       = "Chaitanya Sai";
  const department = "Computer Science and Engineering";
  const year       = 2;
  const section    = "B";

  return (
    <div style={styles.card}>
      <h1 style={styles.heading}>Student Profile</h1>
      <hr />
      <p><strong>Name:</strong>       {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong>       {year}</p>
      <p><strong>Section:</strong>    {section}</p>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Georgia, serif",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "16px"
  }
};

export default StudentProfile;