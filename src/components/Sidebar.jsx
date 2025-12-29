import { useState } from "react";
import "../theme/Sidebar.css";

const Sidebar = ({ addProject, addTask }) => {
  const [showProjectPopup, setShowProjectPopup] = useState(false);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");

  const handleAddProject = () => {
    if (nameValue.trim() !== "" && deadlineValue !== "") {
      addProject({ name: nameValue.trim(), deadline: deadlineValue });
      setNameValue("");
      setDeadlineValue("");
      setShowProjectPopup(false);
    }
  };

  const handleAddTask = () => {
    if (nameValue.trim() !== "" && deadlineValue !== "") {
      addTask({ 
        name: nameValue.trim(), 
        deadline: deadlineValue 
      });
      setNameValue("");
      setDeadlineValue("");
      setShowTaskPopup(false);
    }
  };

  return (
    <>
      <div className="sidebar">
        <h2 className="logo">Workspace</h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Boards</li>
          <li>Sprints</li>
          <li>Analytics</li>
          <li>Team</li>
        </ul>

        <div className="quick-actions">
          <p>Quick Actions</p>
          <button onClick={() => setShowTaskPopup(true)}>+ New Task</button>
          <button onClick={() => setShowProjectPopup(true)}>+ New Project</button>
        </div>
      </div>

      {/* ================= POPUP FOR TASK ================= */}
      {showTaskPopup && (
        <div className="popup-overlay">
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

      {/* ================= POPUP FOR PROJECT ================= */}
      {showProjectPopup && (
        <div className="popup-overlay">
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
