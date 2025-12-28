import "../theme/Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search tasks, projects..."
      />
      <div className="user">
        <span>GUEST</span>
        <img src="https://i.pravatar.cc/40" alt="user" />
      </div>
    </div>
  );
};

export default Topbar;
