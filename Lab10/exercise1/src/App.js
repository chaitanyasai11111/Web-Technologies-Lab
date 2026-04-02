import { useState } from "react";

function App() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const [errors, setErrors] = useState({});

  
  function validate() {
    let newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");

      
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  }

  return (
    <div className="container">
      <h1>User Form</h1>

      <form onSubmit={handleSubmit}>
        
        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Email */}
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;