function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p><b>Department:</b> {props.department}</p>
      <p><b>Year:</b> {props.year}</p>
      <p><b>Section:</b> {props.section}</p>
    </div>
  );
}

export default StudentCard;