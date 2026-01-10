import { useState } from "react";
import "../theme/Boards.css";

const BoardColumn = ({ title, color, tasks, onAddTask }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="board-column">
      <div className="column-header">
        <div className="column-title">
          <span className="dot" style={{ background: color }}></span>
          <h4>{title}</h4>
          <span className="count">{tasks.length}</span>
        </div>

        <div className="column-actions">
          <button onClick={() => setShowMenu(!showMenu)}>⋯</button>

          {showMenu && (
            <div className="column-menu">
              <p onClick={onAddTask}>➕ Add task</p>
              <p>⚙ Column settings</p>
              <p>📊 View analytics</p>
              <p className="danger">🗄 Archive all done</p>
            </div>
          )}
        </div>
      </div>

      <div className="task-list">
        {tasks.length === 0 && (
          <p className="empty-column">No tasks yet. Add one!</p>
        )}

        {tasks.map((task, i) => (
          <div className="task-card" key={i}>
            <div className="task-top">
              <span className={`priority ${task.priority}`}>
                {task.priority}
              </span>
            </div>

            <h5>{task.title}</h5>
            <p>{task.desc}</p>

            <div className="tags">
              {task.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>

            <div className="task-footer">
              <span className="date">📅 {task.date}</span>
              <div className="avatars">
                {task.assignees?.map((user, i) => (
                  <div className="avatar" key={i}>
                    {user.initials}
                  </div>
                ))}
              </div>
            </div>

            {task.completedBy && (
              <div className="task-completed">
                ✅ Done by: {task.completedBy}
              </div>
            )}
          </div>
        ))}

        {/* Add Task Button at the bottom */}
        <button className="add-task-button" onClick={onAddTask}>
          + Add Task
        </button>
      </div>
    </div>
  );
};

const Boards = () => {
  const [columns, setColumns] = useState({
    backlog: [],
    inProgress: [],
    review: [],
    done: [],
  });

  const handleAddTask = (columnKey) => {
    const title = prompt("Task title:");
    if (!title) return;

    const desc = prompt("Task description:");
    const priority = prompt("Priority (low/medium/high):") || "low";
    const assigneeInitials = prompt("Assignee initials (comma-separated):");
    const assignees = assigneeInitials
      ? assigneeInitials.split(",").map((i) => ({ initials: i.trim() }))
      : [];

    const completedBy = prompt("Completed by (leave empty if ongoing):") || null;

    const newTask = {
      title,
      desc,
      priority,
      tags: [],
      date: new Date().toLocaleDateString(),
      assignees,
      completedBy,
    };

    setColumns((prev) => ({
      ...prev,
      [columnKey]: [...prev[columnKey], newTask],
    }));
  };

  // Prepare summary of people working or done
  const getPeopleSummary = () => {
    const summary = {};
    Object.values(columns).forEach((tasks) => {
      tasks.forEach((task) => {
        if (task.assignees?.length) {
          task.assignees.forEach((user) => {
            if (!summary[user.initials]) summary[user.initials] = { working: [], done: [] };
            if (task.completedBy === user.initials) summary[user.initials].done.push(task.title);
            else summary[user.initials].working.push(task.title);
          });
        }
        if (task.completedBy && !task.assignees?.some(a => a.initials === task.completedBy)) {
          if (!summary[task.completedBy]) summary[task.completedBy] = { working: [], done: [] };
          summary[task.completedBy].done.push(task.title);
        }
      });
    });
    return summary;
  };

  const peopleSummary = getPeopleSummary();

  return (
    <div className="boards-page">
      <div className="boards-header">
        <div>
          <h2>Kanban Board</h2>
          <p>Manage tasks with visual workflow</p>
        </div>
      </div>

      <div className="board-grid">
        <BoardColumn
          title="Backlog"
          color="#64748b"
          tasks={columns.backlog}
          onAddTask={() => handleAddTask("backlog")}
        />
        <BoardColumn
          title="In Progress"
          color="#2563eb"
          tasks={columns.inProgress}
          onAddTask={() => handleAddTask("inProgress")}
        />
        <BoardColumn
          title="Review"
          color="#f59e0b"
          tasks={columns.review}
          onAddTask={() => handleAddTask("review")}
        />
        <BoardColumn
          title="Done"
          color="#16a34a"
          tasks={columns.done}
          onAddTask={() => handleAddTask("done")}
        />
      </div>

      {/* People summary section */}
      <div className="people-summary">
        <h3>People & Tasks</h3>
        {Object.keys(peopleSummary).length === 0 && <p>No tasks assigned yet.</p>}
        {Object.entries(peopleSummary).map(([user, tasks]) => (
          <div className="person" key={user}>
            <h4>{user}</h4>
            {tasks.working.length > 0 && (
              <p>🟡 Working on: {tasks.working.join(", ")}</p>
            )}
            {tasks.done.length > 0 && (
              <p>✅ Completed: {tasks.done.join(", ")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
