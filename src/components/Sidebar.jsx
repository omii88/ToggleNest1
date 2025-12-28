import "../theme/Sidebar.css";

const Sidebar = () => {
  return (
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
        <button>+ New Task</button>
        <button>+ New Project</button>
      </div>
    </div>
  );
};

export default Sidebar;
