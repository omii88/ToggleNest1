import { useState } from "react";
import "../theme/Sidebar.css"; // your existing styles

const Sprints = () => {
  const [sprints, setSprints] = useState([]);
  const [showSprintPopup, setShowSprintPopup] = useState(false);
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddSprint = () => {
    if (!sprintName || !startDate || !endDate) return;

    const newSprint = {
      name: sprintName,
      start: startDate,
      end: endDate,
      progress: 0,
    };

    setSprints([...sprints, newSprint]);
    setSprintName("");
    setStartDate("");
    setEndDate("");
    setShowSprintPopup(false);
  };

  const handleDeleteSprint = (index) => {
    const updated = [...sprints];
    updated.splice(index, 1);
    setSprints(updated);
  };

  return (
    <div className="sprints-screen">
            {/* LEFT FIXED BUTTON */}
      <aside className="sprint-left-actions">
        <button className="sidebar-action-btn" onClick={() => setShowSprintPopup(true)}>
          + New Sprint
        </button>
      </aside>


      {/* CENTER CONTENT */}
      <main className="sprint-main">
        {sprints.length === 0 && (
          <p className="sprints-empty">No sprints yet. Create one to get started.</p>
        )}

        {sprints.map((sprint, index) => (
          <div key={index} className="sprint-card">
            <h3>{sprint.name}</h3>
            <p><strong>Start:</strong> {sprint.start}</p>
            <p><strong>End:</strong> {sprint.end}</p>

            <div className="sprint-progress">
              <div
                className="sprint-progress-fill"
                style={{ width: `${sprint.progress}%` }}
              ></div>
            </div>

            <button className="delete-sprint-btn" onClick={() => handleDeleteSprint(index)}>
              Delete
            </button>
          </div>
        ))}
      </main>

      {/* POPUP */}
      {showSprintPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Create New Sprint</h3>
            <input
              type="text"
              placeholder="Sprint Name"
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
              className="popup-input"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="popup-input"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="popup-input"
            />

            <div className="popup-buttons">
              <button onClick={handleAddSprint}>Add Sprint</button>
              <button onClick={() => setShowSprintPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sprints;
