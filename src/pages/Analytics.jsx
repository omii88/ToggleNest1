import "../theme/Analytics.css";
import {
  FaDownload,
  FaSyncAlt,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaBullseye,
  FaClock
} from "react-icons/fa";

const Analytics = () => {
  return (
    <div className="analytics-page">

      {/* HEADER */}
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
        </div>

        <div className="header-actions">
          <button className="btn light">
            <FaDownload /> Export Data
          </button>
          <button className="btn primary">
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      <div className="analytics-layout">

        {/* FILTERS */}
        <aside className="filters-card">
          <h3>Filters</h3>

          <label>Team Member</label>
          <select>
            <option>All Team Members</option>
          </select>

          <label>Project</label>
          <select>
            <option>All Projects</option>
          </select>

          <label>Chart Type</label>
          <select>
            <option>All Charts</option>
          </select>

          <div className="live-data">
            <span className="dot"></span>
            <div>
              <strong>Live Data</strong>
              <p>Last updated: --</p>
              <p>Auto-refresh: Every 5 minutes</p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="analytics-main">

          {/* TOP BAR */}
          <div className="analytics-topbar">
<p>
  Comprehensive insights into team performance
  <br />
  and project metrics
</p>

            <div className="topbar-actions">
              <select>
                <option>Last 30 days</option>
              </select>
              <button className="btn outline">Export PDF</button>
              <button className="btn primary">Export CSV</button>
            </div>
          </div>

          {/* METRIC CARDS */}
          <div className="metrics-grid">

            <div className="metric-card">
              <div className="icon blue"><FaArrowUp /></div>
              <span className="trend up">--</span>
              <h2>--</h2>
              <p>Team Velocity</p>
              <small>Story points per sprint</small>
            </div>

            <div className="metric-card">
              <div className="icon yellow"><FaClock /></div>
              <span className="trend down">--</span>
              <h2>--</h2>
              <p>Avg Cycle Time</p>
              <small>Days from start to done</small>
            </div>

            <div className="metric-card">
              <div className="icon green"><FaCheckCircle /></div>
              <span className="trend up">--</span>
              <h2>--</h2>
              <p>Completion Rate</p>
              <small>Tasks completed on time</small>
            </div>

            <div className="metric-card">
              <div className="icon teal"><FaBullseye /></div>
              <span className="status">--</span>
              <h2>--</h2>
              <p>Sprint Health</p>
              <small>Burndown trajectory</small>
            </div>

          </div>

          {/* CHART PLACEHOLDERS */}
          <div className="charts-grid">

            <div className="chart-card">
              <h3>Cumulative Flow</h3>
              <div className="chart-placeholder">Chart Area</div>
            </div>

            <div className="chart-card">
              <h3>Sprint Burndown</h3>
              <div className="chart-placeholder">Chart Area</div>
            </div>

            <div className="chart-card">
              <h3>Team Throughput</h3>
              <div className="chart-placeholder">Chart Area</div>
            </div>

            <div className="chart-card">
              <h3>Task Distribution</h3>
              <div className="chart-placeholder donut">Donut Chart</div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Analytics;
