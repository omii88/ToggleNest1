import { useState } from "react";
import "../theme/Boards.css";
import { useNavigate } from "react-router-dom";

/* ================= COLUMN ================= */

const BoardColumn = ({ title, color, tasks, onAddTask, onArchiveDone, onColumnSettings, columnKey }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleArchiveDone = () => {
    const doneTasks = tasks.filter(task => task.completedBy);
    if (doneTasks.length > 0) {
      onArchiveDone(doneTasks);
    }
    setShowConfirm(false);
    setShowMenu(false);
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
              <p onClick={() => { onColumnSettings(columnKey, title, color); setShowMenu(false); }}>⚙ Column settings</p>
              <p onClick={() => { navigate("/analytics"); setShowMenu(false); }}>📊 View analytics</p>
              <p 
                className="danger" 
                onClick={() => setShowConfirm(true)}
              >
                🗄 Archive all done ({tasks.filter(t => t.completedBy).length})
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Archive Confirmation */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h4>Archive {tasks.filter(t => t.completedBy).length} done tasks?</h4>
            <p>This will remove ALL completed tasks from ALL columns.</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={handleArchiveDone}>
                Yes, archive
              </button>
              <button className="confirm-no" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
    backlog: { tasks: [], title: "Backlog", color: "#64748b" },
    inProgress: { tasks: [], title: "In Progress", color: "#2563eb" },
    review: { tasks: [], title: "Review", color: "#f59e0b" },
    done: { tasks: [], title: "Done", color: "#16a34a" },
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

  const handleAddTask = (columnKey) => (task) => {
    const newTask = {
      ...task,
      tags: [],
      date: new Date().toLocaleDateString(),
    };

    setColumns((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        tasks: [...prev[columnKey].tasks, newTask],
      },
    }));
  };

const handleArchiveDone = (doneTasks) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      Object.keys(newColumns).forEach(key => {
        newColumns[key].tasks = newColumns[key].tasks.filter(task => !task.completedBy);
      });
      return newColumns;
    });
    console.log(`✅ Archived ${doneTasks.length} tasks!`);
  };

  const handleColumnSettings = (columnKey, currentTitle, currentColor) => {
    setEditingColumn({
      key: columnKey,
      title: currentTitle,
      color: currentColor
    });
    setShowSettingsModal(true);
  };

  const saveColumnSettings = () => {
    setColumns(prev => ({
      ...prev,
      [editingColumn.key]: {
        ...prev[editingColumn.key],
        title: editingColumn.title,
        color: editingColumn.color
      }
    }));
    setShowSettingsModal(false);
    setEditingColumn(null);
  };

  /* ===== PEOPLE & TASKS SUMMARY ===== */

  const getPeopleSummary = () => {
    const summary = {};

    Object.values(columns).forEach((column) => {
      column.tasks.forEach((task) => {
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
          columnKey="backlog"
          title={columns.backlog.title}
          color={columns.backlog.color}
          tasks={columns.backlog.tasks}
          onAddTask={handleAddTask("backlog")}
          onArchiveDone={handleArchiveDone}
          onColumnSettings={handleColumnSettings}
        />
        <BoardColumn
          columnKey="inProgress"
          title={columns.inProgress.title}
          color={columns.inProgress.color}
          tasks={columns.inProgress.tasks}
          onAddTask={handleAddTask("inProgress")}
          onArchiveDone={handleArchiveDone}
          onColumnSettings={handleColumnSettings}
        />
        <BoardColumn
          columnKey="review"
          title={columns.review.title}
          color={columns.review.color}
          tasks={columns.review.tasks}
          onAddTask={handleAddTask("review")}
          onArchiveDone={handleArchiveDone}
          onColumnSettings={handleColumnSettings}
        />
        <BoardColumn
          columnKey="done"
          title={columns.done.title}
          color={columns.done.color}
          tasks={columns.done.tasks}
          onAddTask={handleAddTask("done")}
          onArchiveDone={handleArchiveDone}
          onColumnSettings={handleColumnSettings}
        />
      </div>

      {/* FULLY FUNCTIONAL Column Settings Modal */}
      {showSettingsModal && editingColumn && (
        <div className="modal-overlay">
          <div className="settings-modal">
            <div className="modal-header">
              <h3>{editingColumn.title} Settings</h3>
              <button onClick={() => setShowSettingsModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <label>Column Name</label>
              <input 
                value={editingColumn.title} 
                onChange={(e) => setEditingColumn({
                  ...editingColumn, 
                  title: e.target.value
                })}
                placeholder="Enter column name"
              />
              
              <label>Column Color</label>
              <div className="color-picker">
                <button style={{background: '#64748b'}} 
                  className={editingColumn.color === '#64748b' ? 'active' : ''} 
                  onClick={() => setEditingColumn({
                    ...editingColumn, 
                    color: '#64748b'
                  })} 
                  title="Slate" />
                <button style={{background: '#2563eb'}} 
                  className={editingColumn.color === '#2563eb' ? 'active' : ''} 
                  onClick={() => setEditingColumn({
                    ...editingColumn, 
                    color: '#2563eb'
                  })} 
                  title="Blue" />
                <button style={{background: '#f59e0b'}} 
                  className={editingColumn.color === '#f59e0b' ? 'active' : ''} 
                  onClick={() => setEditingColumn({
                    ...editingColumn, 
                    color: '#f59e0b'
                  })} 
                  title="Amber" />
                <button style={{background: '#16a34a'}} 
                  className={editingColumn.color === '#16a34a' ? 'active' : ''} 
                  onClick={() => setEditingColumn({
                    ...editingColumn, 
                    color: '#16a34a'
                  })} 
                  title="Green" />
                <button style={{background: '#ef4444'}} 
                  className={editingColumn.color === '#ef4444' ? 'active' : ''} 
                  onClick={() => setEditingColumn({
                    ...editingColumn, 
                    color: '#ef4444'
                  })} 
                  title="Red" />
              </div>
              
              <label>Tasks</label>
              <span>{columns[editingColumn.key]?.tasks.length || 0} tasks in this column</span>
            </div>
            
            <div className="modal-actions">
              <button className="cancel" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </button>
              <button className="save" onClick={saveColumnSettings}>
                ✅ Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
