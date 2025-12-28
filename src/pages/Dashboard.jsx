import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ActivityItem from "../components/ActivityItem";
import "../theme/Dashboard.css";

const Dashboard = () => {
  const isAuthenticated = false; // later from auth context

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Topbar />

        <h2>Dashboard Overview</h2>
        <p className="muted-text">Welcome back! Here's what's happening.</p>

        {/* ================== STAT CARDS ================== */}
        <div className="stats-grid">
          <StatCard title="Active Sprints" value={isAuthenticated ? "3" : "--"} />
          <StatCard title="Total Tasks" value={isAuthenticated ? "127" : "--"} />
          <StatCard title="Team Velocity" value={isAuthenticated ? "42" : "--"} />
          <StatCard title="Deadlines" value={isAuthenticated ? "8" : "--"} />
        </div>

        {/* ================== ACTIVITY + PROGRESS ================== */}
        <div className="bottom-grid">
          <div className="activity card card--glow">
            <h3>Recent Activity</h3>

            {!isAuthenticated ? (
              <p className="empty-text">Login to view recent activity</p>
            ) : (
              <>
                <ActivityItem
                  user="Sarah"
                  action="created task 'User Auth'"
                  time="2 min ago"
                />
                <ActivityItem
                  user="Mike"
                  action="completed task 'Navbar Fix'"
                  time="15 min ago"
                />
              </>
            )}
          </div>

          <div className="progress card card--glow">
            <h3>Sprint Progress</h3>

            {!isAuthenticated ? (
              <p className="empty-text">No sprint data available</p>
            ) : (
              <>
                <p>32 / 55 points</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================== NEW BIG CARDS ================== */}
        <div className="overview-grid">
          {/* Team Performance */}
          <div className="big-card card card--glow">
            <div className="big-card-header">
              <h3>Team Performance</h3>
            </div>

            {!isAuthenticated ? (
              <p className="empty-text">Login to view team performance</p>
            ) : (
              <div className="performance-stats">
                <div className="perf-box success">
                  <h2>23</h2>
                  <span>Completed This Week</span>
                </div>
                <div className="perf-box info">
                  <h2>31</h2>
                  <span>In Progress</span>
                </div>
              </div>
            )}
          </div>

          {/* Workspace Overview */}
          <div className="big-card card card--glow">
            <div className="big-card-header">
              <h3>Workspace Overview</h3>
            </div>

            {!isAuthenticated ? (
              <p className="empty-text">Login to view workspace details</p>
            ) : (
              <>
                <div className="workspace-item">
                  <span>Active Projects</span>
                  <strong>5</strong>
                </div>
                <div className="workspace-item">
                  <span>Team Members</span>
                  <strong>12</strong>
                </div>

                <div className="workspace-storage">
                  <span>Workspace Storage</span>
                  <strong>2.4 GB / 10 GB</strong>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "24%" }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
