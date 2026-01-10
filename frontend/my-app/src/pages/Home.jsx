import React from "react";
import "../theme/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span>ToggleNest</span></h1>
        <p className="home-subtitle">
          Manage your workflow, projects, and tasks with ease.  
          Organize. Build. Ship. Repeat. 🚀
        </p>

        <div className="home-buttons">
          <button onClick={() => navigate("/login")} className="home-btn login">
            Login
          </button>

          <button onClick={() => navigate("/signup")} className="home-btn signup">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
