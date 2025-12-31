// ✅ YOUR COMPLETE WorkSpace.jsx - FIXED DELETE + ALL BUTTONS WORK
import React, { useState, useEffect } from "react";
import "../theme/WorkSpace.css"; 

const WorkSpace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, workspaceId: null });
  
  // Context menu + Members management
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, workspaceId: null });
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  // ✅ FIXED: Close context menu on outside click (THIS WAS BROKEN)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu.show) {
        const contextMenuElement = document.querySelector('.context-menu');
        if (contextMenuElement && !contextMenuElement.contains(e.target)) {
          setContextMenu({ show: false, x: 0, y: 0, workspaceId: null });
        }
      }
    };

    if (contextMenu.show) {
      document.addEventListener('click', handleClickOutside);  // ✅ FIXED: 'click' not 'mousedown'
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu.show]);

  useEffect(() => {
    const saved = localStorage.getItem("currentWorkspace");
    if (saved && workspaces.length > 0) {
      const parsed = JSON.parse(saved);
      setCurrentWorkspace(workspaces.find(w => w.id === parsed.id) || null);
    } else {
      setCurrentWorkspace(null);
    }
  }, [workspaces]);

  const handleSwitch = (workspace) => {
    setCurrentWorkspace(workspace);
    localStorage.setItem("currentWorkspace", JSON.stringify(workspace));
    setWorkspaces(workspaces.map(w => ({
      ...w,
      active: w.id === workspace.id
    })));
  };

  const handleContextMenu = (e, workspaceId) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.pageX,
      y: e.pageY,
      workspaceId: workspaceId
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, workspaceId: null });
  };

  const handleManageMembers = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    handleCloseContextMenu();
    setShowMembersModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.workspaceId === currentWorkspace?.id && workspaces.length > 1) {
      const firstWs = workspaces.find(w => w.id !== deleteModal.workspaceId);
      if (firstWs) handleSwitch(firstWs);
    }
    setWorkspaces(workspaces.filter(w => w.id !== deleteModal.workspaceId));
    setDeleteModal({ show: false, workspaceId: null });
  };

  const addMember = () => {
    const workspace = workspaces.find(w => w.id === selectedWorkspaceId);
    if (workspace && newMemberEmail) {
      const updatedWorkspaces = workspaces.map(w => 
        w.id === selectedWorkspaceId 
          ? { ...w, members: w.members + 1, sampleMembers: [...(w.sampleMembers || []), newMemberEmail] }
          : w
      );
      setWorkspaces(updatedWorkspaces);
      if (currentWorkspace?.id === selectedWorkspaceId) {
        setCurrentWorkspace({ ...currentWorkspace, members: currentWorkspace.members + 1 });
      }
      setNewMemberEmail("");
    }
  };

  const removeMember = (email) => {
    const workspace = workspaces.find(w => w.id === selectedWorkspaceId);
    if (workspace) {
      const updatedWorkspaces = workspaces.map(w => 
        w.id === selectedWorkspaceId 
          ? { ...w, members: Math.max(1, w.members - 1), sampleMembers: (w.sampleMembers || []).filter(m => m !== email) }
          : w
      );
      setWorkspaces(updatedWorkspaces);
      if (currentWorkspace?.id === selectedWorkspaceId) {
        setCurrentWorkspace({ ...currentWorkspace, members: Math.max(1, currentWorkspace.members - 1) });
      }
    }
  };

  const createWorkspace = () => {
    const newWs = {
      id: Date.now(),
      name: newWorkspaceName || "New Workspace",
      members: 1,
      projects: 0,
      active: true,
      sampleMembers: ["you@toggle.com"]
    };
    setWorkspaces([newWs, ...workspaces]);
    setCurrentWorkspace(newWs);
    setIsCreating(false);
    setNewWorkspaceName("");
    localStorage.setItem("currentWorkspace", JSON.stringify(newWs));
  };

  const filteredWorkspaces = workspaces.filter(ws =>
    ws.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="workspace-page">
      <div className="stars">
        <div className="star"></div><div className="star"></div><div className="star"></div>
        <div className="star"></div><div className="star"></div>
      </div>

      <div className="workspace-header">
        <h1>Workspaces</h1>
        <p className="subtitle">Manage all your teams, projects, and collaborative spaces</p>
      </div>

      <div className="workspace-grid">
        <div className="workspace-current-card glass-card">
          <div className="current-workspace-info">
            <div className="workspace-icon blue">🏢</div>
            <div>
              <h2>{currentWorkspace?.name || "No Workspace Selected"}</h2>
              <div className="workspace-stats">
                <span>{currentWorkspace?.projects || 0} Projects</span>
                <span>{currentWorkspace?.members || 0} Members</span>
              </div>
            </div>
          </div>
          <button 
            className="btn primary" 
            onClick={() => {
              document.querySelector('.workspaces-list-card')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }}
          >
            {currentWorkspace ? "Switch Workspace" : "Create First Workspace"}
          </button>
        </div>

        <div className="workspaces-list-card glass-card">
          <div className="list-header">
            <h3>All Workspaces ({workspaces.length})</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="workspaces-grid">
            {filteredWorkspaces.length === 0 ? (
              <div className="empty-state">
                <p>No workspaces yet. Create your first one!</p>
              </div>
            ) : (
              filteredWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className={`workspace-item ${workspace.active ? "active" : ""}`}
                  onClick={() => handleSwitch(workspace)}
                  onContextMenu={(e) => handleContextMenu(e, workspace.id)}
                >
                  <div className="workspace-icon teal">📁</div>
                  <div className="workspace-details">
                    <h4>{workspace.name}</h4>
                    <div className="workspace-meta">
                      <span>{workspace.projects} projects</span>
                      <span>{workspace.members} members</span>
                    </div>
                  </div>
                  {workspace.active && <div className="active-indicator"></div>}
                </div>
              ))
            )}
          </div>

          <button className="btn light full-width" onClick={() => setIsCreating(true)}>
            + New Workspace
          </button>
        </div>
      </div>

      {/* ✅ FIXED CONTEXT MENU - ALL BUTTONS + DELETE WORKS */}
      {contextMenu.show && (
        <div 
          className="context-menu glass-card"
          style={{ 
            left: `${contextMenu.x}px`, 
            top: `${contextMenu.y}px`,
            position: 'fixed'
          }}
        >
          <div 
            className="context-menu-item" 
            onClick={() => {
              const ws = workspaces.find(w => w.id === contextMenu.workspaceId);
              if (ws) handleSwitch(ws);
              handleCloseContextMenu();
            }}
          >
            <span>👉 Switch to Workspace</span>
          </div>
          <div 
            className="context-menu-item" 
            onClick={() => handleManageMembers(contextMenu.workspaceId)}
          >
            <span>👥 Manage Members</span>
          </div>
          <div 
            className="context-menu-item danger" 
            onClick={() => {
              setDeleteModal({ show: true, workspaceId: contextMenu.workspaceId });  // ✅ DELETE WORKS
              handleCloseContextMenu();
            }}
          >
            <span>🗑️ Delete Workspace</span>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreating && (
        <div className="create-modal-overlay">
          <div className="create-modal glass-card">
            <h3>Create New Workspace</h3>
            <input
              type="text"
              placeholder="Workspace name..."
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              className="modal-input"
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn primary" onClick={createWorkspace}>Create</button>
              <button className="btn outline" onClick={() => setIsCreating(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBERS MODAL */}
      {showMembersModal && (
        <div className="create-modal-overlay">
          <div className="members-modal glass-card">
            <h3>Manage Members</h3>
            <p className="workspace-name">
              {workspaces.find(w => w.id === selectedWorkspaceId)?.name}
            </p>
            
            <div className="add-member-section">
              <input
                type="email"
                placeholder="Add member by email..."
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="modal-input"
              />
              <button className="btn primary" onClick={addMember}>Add Member</button>
            </div>

            <div className="members-list">
              <h4>Team Members ({workspaces.find(w => w.id === selectedWorkspaceId)?.members || 0})</h4>
              {workspaces.find(w => w.id === selectedWorkspaceId)?.sampleMembers?.map((member, idx) => (
                <div key={idx} className="member-item">
                  <span className="member-avatar">{member.charAt(0).toUpperCase()}</span>
                  <span className="member-name">{member}</span>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeMember(member)}
                  >
                    Remove
                  </button>
                </div>
              )) || <p>No members yet</p>}
            </div>

            <div className="modal-actions">
              <button className="btn outline" onClick={() => {
                setShowMembersModal(false);
                setSelectedWorkspaceId(null);
              }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.show && (
        <div className="delete-modal-overlay">
          <div className="delete-modal glass-card">
            <div className="delete-icon">🗑️</div>
            <h3>Delete Workspace?</h3>
            <p className="delete-warning">
              This will permanently remove "{workspaces.find(w => w.id === deleteModal.workspaceId)?.name}" 
              and all its data. This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn danger" onClick={handleDeleteConfirm}>Delete Workspace</button>
              <button className="btn outline" onClick={() => setDeleteModal({ show: false, workspaceId: null })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSpace;
