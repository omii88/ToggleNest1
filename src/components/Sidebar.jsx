import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../theme/Sidebar.css";

const Sidebar = ({ addProject, addTask }) => {
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");

  const handleAddProject = () => {
    if (nameValue.trim() && deadlineValue) {
      addProject({ name: nameValue.trim(), deadline: deadlineValue });
      setNameValue("");
      setDeadlineValue("");
      setShowProjectPopup(false);
    }
  };

  const handleAddTask = () => {
    if (nameValue.trim() && deadlineValue) {
      addTask({ name: nameValue.trim(), deadline: deadlineValue });
      setNameValue("");
      setDeadlineValue("");
      setShowTaskPopup(false);
    }
  };

  return (
    <>
      <aside className="sidebar">
        <h2 className="logo">Workspace</h2>

        <ul className="menu">
          <NavLink to="/dashboard" className="menu-link">
            {({ isActive }) => <li className={isActive ? "active" : ""}>Dashboard</li>}
          </NavLink>

          <NavLink to="/boards" className="menu-link">
            {({ isActive }) => <li className={isActive ? "active" : ""}>Boards</li>}
          </NavLink>

        <NavLink to="/sprints" className="menu-link">
  {({ isActive }) => <li className={isActive ? "active" : ""}>Sprints</li>}
</NavLink>

<NavLink to="/analytics" className="menu-link">
  {({ isActive }) => <li className={isActive ? "active" : ""}>Analytics</li>}
</NavLink>

<NavLink to="/teampage" className="menu-link">
  {({ isActive }) => <li className={isActive ? "active" : ""}>Team</li>}
</NavLink>

        </ul>

        <div className="quick-actions">
          <p>Quick Actions</p>
          <button onClick={() => setShowTaskPopup(true)}>+ New Task</button>
          <button onClick={() => setShowProjectPopup(true)}>+ New Project</button>
        </div>
      </aside>

      {/* TASK POPUP */}
      {showTaskPopup && (
        <div className="popup-overlay open">
          <div className="popup-card">
            <h3>Create New Task</h3>
            <input
              type="text"
              placeholder="Task Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="popup-input"
            />
            <input
              type="date"
              value={deadlineValue}
              onChange={(e) => setDeadlineValue(e.target.value)}
              className="popup-input"
            />
            <div className="popup-buttons">
              <button onClick={handleAddTask}>Add Task</button>
              <button onClick={() => setShowTaskPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT POPUP */}
      {showProjectPopup && (
        <div className="popup-overlay open">
          <div className="popup-card">
            <h3>Create New Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="popup-input"
            />
            <input
              type="date"
              value={deadlineValue}
              onChange={(e) => setDeadlineValue(e.target.value)}
              className="popup-input"
            />
            <div className="popup-buttons">
              <button onClick={handleAddProject}>Add Project</button>
              <button onClick={() => setShowProjectPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
