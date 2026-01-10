import { useState } from "react";
import api from "../api/axios";


const CreateTaskPopup = ({ showTaskPopup, setShowTaskPopup, onTaskCreated }) => {
  const [nameValue, setNameValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!nameValue.trim()) {
      alert("Task name is required");
      return;
    }

    try {
      setLoading(true);

      // 🔥 BACKEND CALL
      const res = await api.post("/tasks", {
        title: nameValue.trim(),
        dueDate: deadlineValue,
        // assignedTo comes from JWT
      });

      // 🔁 Notify parent (Dashboard) if needed
      if (onTaskCreated) {
        onTaskCreated(res.data);
      }

      // ✅ Reset & close popup
      setNameValue("");
      setDeadlineValue("");
      setShowTaskPopup(false);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  if (!showTaskPopup) return null;

  return (
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
          <button
            type="button"
            onClick={handleAddTask}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>

          <button
            type="button"
            onClick={() => setShowTaskPopup(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
