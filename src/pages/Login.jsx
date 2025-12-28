import React from "react";
import "../theme/Auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <form className="auth-card">
        <h2>Login</h2>
        
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button className="auth-btn">Login</button>

        <p className="auth-text">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
