import React from "react";
import "../theme/Auth.css";

const Signup = () => {

   const handleSignup = (e) => {
    e.preventDefault();

    // take the first input (Full Name) value
    const name = e.target[0].value; 
    localStorage.setItem("username", name); // store in localStorage

    window.location.href = "/dashboard"; // redirect after signup
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button className="auth-btn">Sign Up</button>

        <p className="auth-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
