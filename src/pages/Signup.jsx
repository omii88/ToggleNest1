import React from "react";
import "../theme/Auth.css";

const Signup = () => {
  return (
    <div className="auth-container">
      <form className="auth-card">
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
