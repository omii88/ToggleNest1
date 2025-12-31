import { useState } from "react";
import "../theme/Boards.css";

/* ================= COLUMN ================= */

const BoardColumn = ({ title, color, tasks, onAddTask }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    priority: "low",
    assignees: "",
    completedBy: "",
  });

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    onAddTask({
      title: form.title,
      desc: form.desc,
      priority: form.priority,
      assignees: form.assignees
        ? form.assignees.split(",").map((i) => ({ initials: i.trim() }))
        : [],
      completedBy: form.completedBy || null,
    });

    setForm({
      title: "",
      desc: "",
      priority: "low",
      assignees: "",
      completedBy: "",
    });
    setAdding(false);
  };

  return (
    <div className="board-column">
      <div className="column-header">
        <div className="column-title">
          <span className="dot" style={{ background: color }} />
          <h4>{title}</h4>
          <span className="count">{tasks.length}</span>
        </div>

        <div className="column-actions">
          <button onClick={() => setShowMenu(!showMenu)}>⋯</button>
          {showMenu && (
            <div className="column-menu">
              <p onClick={() => { setAdding(true); setShowMenu(false); }}>
                ➕ Add task
              </p>
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

        {/* INLINE ADD TASK CARD */}
        {adding && (
          <div className="task-card add-card">
            <input
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={form.desc}
              onChange={(e) =>
                setForm({ ...form, desc: e.target.value })
              }
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>

            <input
              placeholder="Assignees initials (A,B,C)"
              value={form.assignees}
              onChange={(e) =>
                setForm({ ...form, assignees: e.target.value })
              }
            />

            <input
              placeholder="Completed by (optional)"
              value={form.completedBy}
              onChange={(e) =>
                setForm({ ...form, completedBy: e.target.value })
              }
            />

            <div className="add-actions">
              <button className="save" onClick={handleSubmit}>
                Add
              </button>
              <button
                className="cancel"
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!adding && (
          <button
            className="add-task-button"
            onClick={() => setAdding(true)}
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
};

/* ================= BOARDS PAGE ================= */

const Boards = () => {
  const [columns, setColumns] = useState({
    backlog: [],
    inProgress: [],
    review: [],
    done: [],
  });

  const handleAddTask = (columnKey) => (task) => {
    const newTask = {
      ...task,
      tags: [],
      date: new Date().toLocaleDateString(),
    };

    setColumns((prev) => ({
      ...prev,
      [columnKey]: [...prev[columnKey], newTask],
    }));
  };

  /* ===== PEOPLE & TASKS SUMMARY ===== */

  const getPeopleSummary = () => {
    const summary = {};

    Object.values(columns).forEach((tasks) => {
      tasks.forEach((task) => {
        // Assigned users
        task.assignees?.forEach((user) => {
          if (!summary[user.initials]) {
            summary[user.initials] = { working: [], done: [] };
          }

          if (task.completedBy === user.initials) {
            summary[user.initials].done.push(task.title);
          } else {
            summary[user.initials].working.push(task.title);
          }
        });

        // Completed by (not in assignees)
        if (
          task.completedBy &&
          !task.assignees?.some(
            (a) => a.initials === task.completedBy
          )
        ) {
          if (!summary[task.completedBy]) {
            summary[task.completedBy] = { working: [], done: [] };
          }
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
          onAddTask={handleAddTask("backlog")}
        />
        <BoardColumn
          title="In Progress"
          color="#2563eb"
          tasks={columns.inProgress}
          onAddTask={handleAddTask("inProgress")}
        />
        <BoardColumn
          title="Review"
          color="#f59e0b"
          tasks={columns.review}
          onAddTask={handleAddTask("review")}
        />
        <BoardColumn
          title="Done"
          color="#16a34a"
          tasks={columns.done}
          onAddTask={handleAddTask("done")}
        />
      </div>

      {/* ===== PEOPLE & TASKS SECTION ===== */}
      <div className="people-summary">
        <h3>People & Tasks</h3>

        {Object.keys(peopleSummary).length === 0 && (
          <p>No tasks assigned yet.</p>
        )}

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
