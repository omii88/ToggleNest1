import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ActivityItem from "../components/ActivityItem";
import "../theme/Dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [members, setMembers] = useState(["You"]);
  const [workspaceStorage, setWorkspaceStorage] = useState({ used: 0, total: 10 });

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ visible: false, type: "", index: null });
  useEffect(() => {
    if (deleteModal.visible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [deleteModal.visible]);
  const getCurrentTime = () => new Date().toISOString();

  const addProject = (project) => {
  if (!project.name) return;
    const newProject = {
    ...project,
    user: project.user || "You", // <-- store user here
    size: 0.5,
    action: `created project '${project.name}'`,
    time: getCurrentTime(),
    };
    setProjects([...projects, newProject]);
  setWorkspaceStorage(prev => ({ ...prev, used: prev.used + newProject.size }));
  };


  const deleteProject = (index) => {
    const removed = projects[index];
    setProjects(projects.filter((_, i) => i !== index));
    setWorkspaceStorage(prev => ({ ...prev, used: prev.used - removed.size }));
    setDeleteModal({ visible: false, type: "", index: null });
  };

  const addTask = (task) => {
    if (!task.name) return;
    const newTask = {
      user: "You",
      name: task.name,
      deadline: task.deadline || "",
      completed: false,
      points: 1,
      size: 0.1,
      action: `created task '${task.name}'`,
      time: getCurrentTime(),
    };
    setTasks([...tasks, newTask]);
    setWorkspaceStorage(prev => ({ ...prev, used: prev.used + newTask.size }));
  };

  const deleteTask = (index) => {
    const removed = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setWorkspaceStorage(prev => ({ ...prev, used: prev.used - removed.size }));
    setDeleteModal({ visible: false, type: "", index: null });
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const sprintPoints = { completed: completedTasks, total: tasks.length };
  const teamVelocity = completedTasks;
  const deadlines = tasks.filter(t => t.deadline).length;

  // Open delete modal
  const handleDeleteClick = (type, index) => {
    setDeleteModal({ visible: true, type, index });
  };

  const confirmDelete = () => {
    if (deleteModal.type === "task") deleteTask(deleteModal.index);
    if (deleteModal.type === "project") deleteProject(deleteModal.index);
  };

  const cancelDelete = () => {
    setDeleteModal({ visible: false, type: "", index: null });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar addProject={addProject} addTask={addTask} />

      <div className="dashboard-content">
        <Topbar />
        <h2>Dashboard Overview</h2>
        <p className="muted-text">Welcome back! Here's what's happening.</p>

        {/* STAT CARDS */}
        <div className="stats-grid">
          <StatCard title="Active Sprints" value={sprints.length} />
          <StatCard title="Total Tasks" value={tasks.length} />
          <StatCard title="Team Velocity" value={teamVelocity} />
          <StatCard title="Deadlines" value={deadlines} />
          <StatCard title="My Projects" value={projects.length} />
          <StatCard title="My Tasks" value={tasks.length} />
        </div>

        {/* ACTIVITY + PROGRESS */}
        <div className="bottom-grid">
          <div className="activity card card--glow">
            <h3>Recent Activity</h3>
            {tasks.length + projects.length === 0 ? (
              <p className="empty-text">Create a project or task to see recent activity</p>
            ) : (
              <>
                {tasks.map((task, i) => (
                  <ActivityItem
                    key={`task-${i}`}
                    user={task.user}
                    action={`${task.action}${task.deadline ? ` (Deadline: ${task.deadline})` : ""}`}
                    time={task.time}
                    onContextMenu={(e) => {
                      e.preventDefault(); // prevent browser context menu
                      handleDeleteClick("task", i);
                    }}
                  />
                ))}
                {projects.map((project, i) => (
                  <ActivityItem
                      key={`project-${i}`}
                      user={project.user} // <-- use stored user
                      action={`${project.action}${project.deadline ? ` (Deadline: ${project.deadline})` : ""}`}
                      time={project.time}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleDeleteClick("project", i);
                      }}
                   />
                ))}
              </>
            )}
          </div>

          <div className="progress card card--glow">
            <h3>Sprint Progress</h3>
            {tasks.length === 0 ? (
              <p className="empty-text">No sprint data available</p>
            ) : (
              <>
                <p>{sprintPoints.completed} / {sprintPoints.total} points</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(sprintPoints.total === 0 ? 0 : (sprintPoints.completed / sprintPoints.total) * 100)}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* BIG CARDS */}
        <div className="overview-grid">
          <div className="big-card card card--glow">
            <div className="big-card-header">
              <h3>Team Performance</h3>
            </div>
            {tasks.length === 0 ? (
              <p className="empty-text">Create projects/tasks to view team performance</p>
            ) : (
              <div className="performance-stats">
                <div className="perf-box success">
                  <h2>{sprintPoints.completed}</h2>
                  <span>Completed This Week</span>
                </div>
                <div className="perf-box info">
                  <h2>{tasks.length - sprintPoints.completed}</h2>
                  <span>In Progress</span>
                </div>
              </div>
            )}
          </div>

          <div className="big-card card card--glow">
            <div className="big-card-header">
              <h3>Workspace Overview</h3>
            </div>
            {projects.length === 0 ? (
              <p className="empty-text">Create projects/tasks to view workspace details</p>
            ) : (
              <>
                <div className="workspace-item">
                  <span>Active Projects</span>
                  <strong>{projects.length}</strong>
                </div>
                <div className="workspace-item">
                  <span>Team Members</span>
                  <strong>{members.length}</strong>
                </div>

                <div className="workspace-storage">
                  <span>Workspace Storage</span>
                  <strong>{workspaceStorage.used.toFixed(1)} GB / {workspaceStorage.total} GB</strong>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(workspaceStorage.used / workspaceStorage.total) * 100}%` }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* DELETE MODAL */}
        {/* DELETE MODAL */}
          {deleteModal.visible && (
            <div className="modal-overlay" onClick={cancelDelete}>
              <div className="delete-modal card card--glow" onClick={(e) => e.stopPropagation()}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this {deleteModal.type}?</p>
                <div className="modal-buttons">
                  <button className="btn btn-cancel" onClick={cancelDelete}>Cancel</button>
                  <button className="btn btn-delete" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Dashboard;
