import "../theme/Analytics.css";
import { useState, useEffect, useRef } from 'react';
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
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('--');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [filters, setFilters] = useState({ team: 'all', project: 'all' });

  const pdfContentRef = useRef();

  const sampleAnalyticsData = [
    { teamMember: 'John Doe', project: 'Project Alpha', velocity: 25, cycleTime: 3.2, completionRate: 92, date: '2025-12-30' },
    { teamMember: 'Jane Smith', project: 'Project Alpha', velocity: 22, cycleTime: 4.1, completionRate: 88, date: '2025-12-30' }
  ];

  // Refresh function
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date().toLocaleTimeString());
      console.log('Data refreshed with filters:', filters);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
    ].join('\n');
    return csvContent;
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const exportData = sampleAnalyticsData.filter(item => 
        (filters.team === 'all' || item.teamMember === filters.team) &&
        (filters.project === 'all' || item.project === filters.project)
      );
      const csv = convertToCSV(exportData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  // Topbar CSV Export - Full dataset
  const handleExportCSV = async () => {
    setIsExportingCSV(true);
    try {
      const csv = convertToCSV(sampleAnalyticsData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-full-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExportingCSV(false);
    }
  };

  // PDF Export - Only cards + charts + filters
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const pdfContent = pdfContentRef.current;
      if (pdfContent) {
        // Hide everything else, show only PDF content, then print
        const main = document.querySelector('.analytics-main');
        const originalHTML = main.innerHTML;
        
        main.innerHTML = pdfContent.innerHTML;
        window.print();
        main.innerHTML = originalHTML;
      } else {
        window.print(); // Fallback
      }
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="analytics-page">

      {/* HEADER */}
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
        </div>

        <div className="header-actions">
          <button 
            className={`btn light ${isExporting ? 'loading' : ''}`}
            onClick={handleExportData}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <FaSyncAlt className="spin" /> Exporting...
              </>
            ) : (
              <>
                <FaDownload /> Export Data
              </>
            )}
          </button>
          <button 
            className={`btn primary ${isRefreshing ? 'loading' : ''}`}
            onClick={refreshData}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <FaSyncAlt className="spin" /> Refreshing...
              </>
            ) : (
              <>
                <FaSyncAlt /> Refresh
              </>
            )}
          </button>
        </div>
      </div>

      <div className="analytics-layout">

        {/* FILTERS - INCLUDED IN PDF */}
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
              <p>Last updated: {lastUpdated}</p>
              <p>Auto-refresh: Every 5 minutes</p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="analytics-main">

          {/* HIDDEN PDF CONTENT - Only cards + charts */}
          <div ref={pdfContentRef} style={{ display: 'none' }}>
            <div style={{ padding: '20px', maxWidth: '800px' }}>
              <h2 style={{ marginBottom: '30px' }}>Analytics Report</h2>
              <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                Filters: Team Member - All Team Members | Project - All Projects | Date: {dateRange}
              </p>
              
              {/* METRIC CARDS */}
              <div className="metrics-grid" style={{ marginBottom: '30px' }}>
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

              {/* CHARTS */}
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
            </div>
          </div>

          {/* TOP BAR - NOT INCLUDED IN PDF */}
          <div className="analytics-topbar">
              <p>
                Comprehensive insights into team performance
                <br />
                and project metrics
              </p>

            <div className="topbar-actions">
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
              <button 
                className={`btn outline ${isExportingPDF ? 'loading' : ''}`}
                onClick={handleExportPDF}
                disabled={isExportingPDF}
              >
                {isExportingPDF ? (
                  <>
                    <FaSyncAlt className="spin" /> Exporting...
                  </>
                ) : (
                  <>Export PDF</>
                )}
              </button>
              <button 
                className={`btn primary ${isExportingCSV ? 'loading' : ''}`}
                onClick={handleExportCSV}
                disabled={isExportingCSV}
              >
                {isExportingCSV ? (
                  <>
                    <FaSyncAlt className="spin" /> Exporting...
                  </>
                ) : (
                  <>Export CSV</>
                )}
              </button>
            </div>
          </div>

          {/* ACTUAL VISIBLE METRIC CARDS & CHARTS */}
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
