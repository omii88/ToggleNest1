import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../theme/Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Simple validation (you can expand this)
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password); // only for demo, not secure

    // Set loggedIn flag when signing up
    localStorage.setItem("loggedIn", "true");

    navigate("/login"); // redirect using React Router
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" type="submit">
          Sign Up
        </button>

        <p className="auth-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
