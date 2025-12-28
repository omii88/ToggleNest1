import React from "react";
import "./Navbar.css";
import { useNavigate,Link } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar__logo">ToggleNest</div>

      <ul className="navbar__links">
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/project-board">Project Board</Link></li>
      </ul>

      <div className="navbar__actions">
        {/* <Link to="/">Home</Link> */}
        <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
        <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
