import React, { useState } from "react";
import "../theme/SprintPage.css";
import {
  FiCalendar,
  FiPlus,
  FiFilter,
  FiRefreshCcw,
  FiX,
} from "react-icons/fi";

const SprintPage = () => {
  const [showCreateSprint, setShowCreateSprint] = useState(false);

  return (
    <div className="sprint-wrapper">
      {/* ===== HEADER ===== */}
      <div className="sprint-header">
        <div className="sprint-title">
          <h1>Sprint Planning</h1>
          <p>Plan, create and manage sprints for your team</p>
        </div>

        <div className="sprint-header-actions">
          <button className="sprint-btn-secondary">
            <FiCalendar /> View Calendar
          </button>
          <button
            className="sprint-btn-primary"
            onClick={() => setShowCreateSprint(true)}
          >
            <FiPlus /> New Sprint
          </button>
        </div>
      </div>

      {/* ===== EMPTY CURRENT SPRINT ===== */}
      <div className="sprint-empty">
        <h3>No Active Sprint</h3>
        <p>Create a sprint to start planning your work</p>

        <button
          className="sprint-btn-primary"
          onClick={() => setShowCreateSprint(true)}
        >
          <FiPlus /> Create Sprint
        </button>
      </div>

      {/* ===== BACKLOG SECTION (EMPTY) ===== */}
      <div className="sprint-card">
        <div className="sprint-card-header">
          <h3>Product Backlog</h3>
          <div className="sprint-backlog-actions">
            <FiRefreshCcw />
            <FiFilter />
          </div>
        </div>

        <div className="sprint-filters">
          <select><option>All Epics</option></select>
          <select><option>All Priorities</option></select>
          <select><option>All Assignees</option></select>
          <select><option>Status</option></select>
        </div>

        <div className="sprint-backlog-empty">
          <p>No backlog items available</p>
        </div>
      </div>

      {/* ===== CREATE SPRINT MODAL ===== */}
      {showCreateSprint && (
        <div className="sprint-modal-overlay">
          <div className="sprint-modal-card">
            <div className="sprint-modal-header">
              <h3>Create Sprint</h3>
              <FiX
                className="sprint-close"
                onClick={() => setShowCreateSprint(false)}
              />
            </div>

            <div className="sprint-modal-body">
              <div className="sprint-form-group">
                <label>Sprint Name</label>
                <input type="text" placeholder="Enter sprint name" />
              </div>

              <div className="sprint-form-row">
                <div className="sprint-form-group">
                  <label>Start Date</label>
                  <input type="date" />
                </div>

                <div className="sprint-form-group">
                  <label>End Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="sprint-form-group">
                <label>Sprint Goal</label>
                <textarea placeholder="What is the goal of this sprint?" />
              </div>
            </div>

            <div className="sprint-modal-footer">
              <button
                className="sprint-btn-secondary"
                onClick={() => setShowCreateSprint(false)}
              >
                Cancel
              </button>
              <button className="sprint-btn-primary">
                Create Sprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintPage;
