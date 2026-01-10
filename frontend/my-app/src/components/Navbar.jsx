import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const Navbar = () => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");

  const handleProtectedNavigation = (path) => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
 // fresh check
    if (isLoggedIn) {
      navigate(path);
    } else {
      setPopupMessage("Please sign up or login first");
    }
  };

  const closePopup = () => {
    setPopupMessage("");
    navigate("/signup"); // redirect after closing popup
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">ToggleNest</div>

        <ul className="navbar__links">
          <li>
            <button className="link-btn" onClick={() => handleProtectedNavigation("/dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="link-btn" onClick={() => handleProtectedNavigation("/workspace")}>
              WorkSpace
            </button>
          </li>
          <li>
            <button className="link-btn" onClick={() => handleProtectedNavigation("/sprints")}>
              Create +
            </button>
          </li>
        </ul>

        <div className="navbar__actions">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </nav>

      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </>
  );
};

export default Navbar;
