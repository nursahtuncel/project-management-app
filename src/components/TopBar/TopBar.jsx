import { useState } from "react";
import "./TopBar.css";

const META_KEYS = [
  { label: "Skill Track", key: "skillTrack", icon: "🏷️" },
  { label: "Level",       key: "level",      icon: "📊" },
  { label: "Language",    key: "language",   icon: "🌐" },
  { label: "Start Date",  key: "startDate",  icon: "📅" },
  { label: "End Date",    key: "endDate",    icon: "📅" },
  { label: "Team Lead",   key: "teamLead",   icon: "👤" },
];

const AVATARS = ["🧑‍💻","👩‍💼","👨‍🎨","👩‍🔬","🧑‍🚀","👨‍💻","👩‍💻","🧑‍🎨"];

export default function TopBar({ meta, members, user, projectName, completion, search, onSearchChange, onMetaChange, onAddMember, onRemoveMember, onBack, onLogout }) {
  const [adminOpen,  setAdminOpen]  = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [newMember,  setNewMember]  = useState({ name: "", role: "", avatar: "🧑‍💻" });

  const handleAddMember = () => {
    if (!newMember.name.trim()) return;
    onAddMember({ ...newMember, id: `m${Date.now()}` });
    setNewMember({ name: "", role: "", avatar: "🧑‍💻" });
  };

  return (
    <div className="topbar">

      {/* Nav */}
      <div className="topbar-nav">
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button
            onClick={onBack}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#718096", fontSize:"20px", padding:"4px 8px", borderRadius:"6px", lineHeight:1 }}
            title="Projelere dön"
          >←</button>
          <div className="topbar-brand">⊞ {projectName || "Board"}</div>
        </div>

        <button className="btn-view">View project details</button>

        <div className="topbar-right">
          <div className="avatar-group" onClick={() => { setMemberOpen(o => !o); setAdminOpen(false); }}>
            {(members || []).slice(0, 4).map((m, i) => (
              <div key={m.id || i} className="nav-avatar" style={{ zIndex: 10 - i }}>{m.avatar}</div>
            ))}
            {(members || []).length > 4 && (
              <div className="nav-avatar nav-avatar-extra">+{members.length - 4}</div>
            )}
          </div>

          <button
            className={`btn-secondary ${memberOpen ? "active" : ""}`}
            onClick={() => { setMemberOpen(o => !o); setAdminOpen(false); }}
          >👥 Üyeler</button>

          <button
            className={`btn-secondary ${adminOpen ? "active" : ""}`}
            onClick={() => { setAdminOpen(o => !o); setMemberOpen(false); }}
          >⚙️ Admin</button>

          <div className="search-box">
            <span>🔍</span>
            <input
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Ara..."
            />
          </div>

          {user && (
            <div className="user-chip">
              <img src={user.photoURL} alt="" className="user-photo" />
              <span>{user.displayName?.split(" ")[0]}</span>
              <button className="logout-btn" onClick={onLogout} title="Çıkış">⏏</button>
            </div>
          )}
        </div>
      </div>

      {/* Üye Paneli */}
      {memberOpen && (
        <div className="panel">
          <div className="panel-title">👥 Proje Üyeleri</div>
          <div className="member-list">
            {(members || []).map(m => (
              <div key={m.id} className="member-row">
                <span className="member-avatar">{m.avatar}</span>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.role}</div>
                </div>
                <button className="member-remove" onClick={() => onRemoveMember(m.id)}>✕</button>
              </div>
            ))}
          </div>
          <div className="member-add">
            <div className="avatar-picker">
              {AVATARS.map(a => (
                <span
                  key={a}
                  className={`avatar-opt ${newMember.avatar === a ? "selected" : ""}`}
                  onClick={() => setNewMember(n => ({ ...n, avatar: a }))}
                >{a}</span>
              ))}
            </div>
            <input className="panel-input" placeholder="İsim" value={newMember.name} onChange={e => setNewMember(n => ({ ...n, name: e.target.value }))} />
            <input className="panel-input" placeholder="Rol (ör: Developer)" value={newMember.role} onChange={e => setNewMember(n => ({ ...n, role: e.target.value }))} />
            <button className="btn-add-member" onClick={handleAddMember}>+ Üye Ekle</button>
          </div>
        </div>
      )}

      {/* Admin Paneli */}
      {adminOpen && (
        <div className="panel">
          <div className="panel-title">⚙️ Proje Bilgileri</div>
          <div className="admin-grid">
            {META_KEYS.map(m => (
              <div key={m.key} className="admin-field">
                <label>{m.icon} {m.label}</label>
                <input
                  className="panel-input"
                  value={(meta || {})[m.key] || ""}
                  onChange={e => onMetaChange(m.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion */}
      <div className="topbar-completion">
        <span className="completion-label">Completion (%)</span>
        <div className="completion-track">
          <div className="completion-fill" style={{ width:`${completion}%` }} />
        </div>
        <span className="completion-pct">{completion}%</span>
      </div>

      {/* Meta */}
      <div className="topbar-meta">
        {META_KEYS.map(m => (
          <div key={m.key} className="meta-item">
            <span>{m.icon}</span>
            <div>
              <div className="meta-label">{m.label}</div>
              <div className="meta-value">{(meta || {})[m.key] || "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}