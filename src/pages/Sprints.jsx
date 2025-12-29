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

  const handleProgressChange = (index, value) => {
    const updated = [...sprints];
    updated[index].progress = Math.min(Math.max(value, 0), 100);
    setSprints(updated);
  };

  return (
    <div className="sprints-screen">
      {/* LEFT FIXED BUTTON */}
      <aside className="sprint-left-actions">
        <button
          className="sidebar-action-btn"
          onClick={() => setShowSprintPopup(true)}
        >
          + New Sprint
        </button>
      </aside>

      {/* CENTER CONTENT */}
      <main className="sprint-main">


        {sprints.length === 0 && (
          <p className="sprints-empty">No sprints yet. Create one to get started.</p>
        )}

        {sprints.map((sprint, index) => (
          <div key={index} className="task-card">
            {/* TOP DELETE BUTTON */}
            <div className="task-top">
              <button
                className="column-actions-btn"
                onClick={() => handleDeleteSprint(index)}
              >
                Delete
              </button>
            </div>

            {/* SPRINT INFO */}
            <h5>{sprint.name}</h5>
            <p>
              <strong>Start:</strong> {sprint.start}
            </p>
            <p>
              <strong>End:</strong> {sprint.end}
            </p>

            {/* PROGRESS BAR WITH PERCENTAGE */}
            <div
              className="sprint-progress"
              data-progress={`${sprint.progress}`} // ensures CSS can read it
              style={{ margin: "16px 0" }}
            >
              <div
                className="sprint-progress-fill"
                style={{ width: `${sprint.progress}%` }}
              ></div>
            </div>

            {/* SLIDER TO UPDATE PROGRESS */}
            <input
              type="range"
              min="0"
              max="100"
              value={sprint.progress}
              onChange={(e) => handleProgressChange(index, e.target.value)}
              className="progress-slider"
            />
          </div>
        ))}
      </main>

      {/* POPUP */}
      {showSprintPopup && (
        <div className={`popup-overlay ${showSprintPopup ? "open" : ""}`}>
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
              <button onClick={handleAddSprint} className="popup-btn-primary">
                Add Sprint
              </button>
              <button
                onClick={() => setShowSprintPopup(false)}
                className="popup-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sprints;
