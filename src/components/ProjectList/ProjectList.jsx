import { useState } from "react";
import { createProject, archiveProject, deleteProject } from "../../firebase/projectService";
import "./ProjectList.css";

export default function ProjectList({ user, projects, onSelect, onLogout }) {
  const [creating,    setCreating]    = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // { type, project }

  const handleCreate = async () => {
    if (!projectName.trim()) return;
    setLoading(true);
    const id = await createProject(projectName.trim(), user.uid);
    setProjectName("");
    setCreating(false);
    setLoading(false);
    onSelect(id);
  };

  const handleArchive = async (e, project) => {
    e.stopPropagation();
    setConfirmAction({ type: "archive", project });
  };

  const handleDelete = async (e, project) => {
    e.stopPropagation();
    setConfirmAction({ type: "delete", project });
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;
    if (confirmAction.type === "archive") {
      await archiveProject(confirmAction.project.id);
    } else {
      await deleteProject(confirmAction.project.id);
    }
    setConfirmAction(null);
  };

  const activeProjects   = projects.filter(p => !p.archived);
  const archivedProjects = projects.filter(p => p.archived);
  const myProjects       = activeProjects.filter(p => p.members?.includes(user.uid));
  const otherProjects    = activeProjects.filter(p => !p.members?.includes(user.uid));

  return (
    <div className="pl-page">
      {/* Header */}
      <div className="pl-header">
        <div className="pl-brand">⊞ KanbanBoard</div>
        <div className="pl-user">
          <img src={user.photoURL} alt="" className="pl-avatar" />
          <span>{user.displayName}</span>
          <button className="pl-logout" onClick={onLogout}>⏏ Çıkış</button>
        </div>
      </div>

      <div className="pl-body">
        <div className="pl-top">
          <div>
            <h1>Projeler</h1>
            <p>Bir projeye gir veya yeni proje oluştur</p>
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            {archivedProjects.length > 0 && (
              <button className="pl-btn-ghost" onClick={() => setShowArchived(o => !o)}>
                {showArchived ? "📋 Aktif" : `🗄️ Arşiv (${archivedProjects.length})`}
              </button>
            )}
            {!creating && (
              <button className="pl-btn-create" onClick={() => setCreating(true)}>
                + Yeni Proje
              </button>
            )}
          </div>
        </div>

        {/* Yeni proje formu */}
        {creating && (
          <div className="pl-create-form">
            <input
              autoFocus
              className="pl-input"
              placeholder="Proje adı..."
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") setCreating(false);
              }}
            />
            <div className="pl-form-actions">
              <button className="pl-btn-primary" onClick={handleCreate} disabled={loading || !projectName.trim()}>
                {loading ? "Oluşturuluyor..." : "✓ Oluştur"}
              </button>
              <button className="pl-btn-ghost" onClick={() => setCreating(false)}>İptal</button>
            </div>
          </div>
        )}

        {/* Aktif projeler */}
        {!showArchived && (
          <>
            {myProjects.length > 0 && (
              <section>
                <h2 className="pl-section-title">📌 Projelerim</h2>
                <div className="pl-grid">
                  {myProjects.map(p => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      onSelect={() => onSelect(p.id)}
                      onArchive={(e) => handleArchive(e, p)}
                      onDelete={(e) => handleDelete(e, p)}
                    />
                  ))}
                </div>
              </section>
            )}

            {otherProjects.length > 0 && (
              <section>
                <h2 className="pl-section-title">🌐 Diğer Projeler</h2>
                <div className="pl-grid">
                  {otherProjects.map(p => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      other
                      onSelect={() => onSelect(p.id)}
                      onArchive={(e) => handleArchive(e, p)}
                      onDelete={(e) => handleDelete(e, p)}
                    />
                  ))}
                </div>
              </section>
            )}

            {activeProjects.length === 0 && !creating && (
              <div className="pl-empty">
                <div className="pl-empty-icon">📋</div>
                <p>Henüz proje yok.</p>
                <button className="pl-btn-primary" onClick={() => setCreating(true)}>
                  + İlk Projeyi Oluştur
                </button>
              </div>
            )}
          </>
        )}

        {/* Arşivlenmiş projeler */}
        {showArchived && (
          <section>
            <h2 className="pl-section-title">🗄️ Arşivlenmiş Projeler</h2>
            {archivedProjects.length === 0 ? (
              <div className="pl-empty">
                <p>Arşivlenmiş proje yok.</p>
              </div>
            ) : (
              <div className="pl-grid">
                {archivedProjects.map(p => (
                  <div key={p.id} className="pl-card pl-card-archived">
                    <div className="pl-card-icon pl-card-icon-archived">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="pl-card-info">
                      <div className="pl-card-name">{p.name}</div>
                      <div className="pl-card-meta">Arşivlendi</div>
                    </div>
                    <div className="pl-card-actions">
                 <button
  className="pl-action-btn pl-action-restore"
  onClick={async (e) => {
    e.stopPropagation();
    await archiveProject(p.id);
    setShowArchived(false); // aktif projelere dön
  }}
  title="Geri Yükle"
>↩</button>
                      <button
                        className="pl-action-btn pl-action-delete"
                        onClick={(e) => handleDelete(e, p)}
                        title="Kalıcı Sil"
                      >🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmAction && (
        <div className="pl-overlay" onClick={() => setConfirmAction(null)}>
          <div className="pl-confirm" onClick={e => e.stopPropagation()}>
            <div className="pl-confirm-icon">
              {confirmAction.type === "archive" ? "🗄️" : "🗑️"}
            </div>
            <h3>
              {confirmAction.type === "archive" ? "Projeyi Arşivle" : "Projeyi Sil"}
            </h3>
            <p>
              <strong>"{confirmAction.project.name}"</strong>{" "}
              {confirmAction.type === "archive"
                ? "projesini arşivlemek istiyor musun? Daha sonra geri alabilirsin."
                : "projesini kalıcı olarak silmek istiyor musun? Bu işlem geri alınamaz!"}
            </p>
            <div className="pl-confirm-actions">
              <button
                className={confirmAction.type === "delete" ? "pl-btn-danger" : "pl-btn-primary"}
                onClick={handleConfirm}
              >
                {confirmAction.type === "archive" ? "🗄️ Arşivle" : "🗑️ Sil"}
              </button>
              <button className="pl-btn-ghost" onClick={() => setConfirmAction(null)}>
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, other, onSelect, onArchive, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`pl-card ${other ? "pl-card-other" : ""}`}
      onClick={onSelect}
    >
      <div className={`pl-card-icon ${other ? "pl-card-icon-other" : ""}`}>
        {project.name.charAt(0).toUpperCase()}
      </div>
      <div className="pl-card-info">
        <div className="pl-card-name">{project.name}</div>
        <div className="pl-card-meta">{project.members?.length || 1} üye</div>
      </div>
      <div className="pl-card-right">
        <span className="pl-card-arrow">→</span>
        <div className="pl-menu-wrap">
          <button
            className="pl-menu-btn"
            onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
            title="Seçenekler"
          >⋯</button>
          {menuOpen && (
            <div className="pl-menu" onClick={e => e.stopPropagation()}>
              <button className="pl-menu-item" onClick={(e) => { setMenuOpen(false); onArchive(e); }}>
                🗄️ Arşivle
              </button>
              <button className="pl-menu-item pl-menu-item-danger" onClick={(e) => { setMenuOpen(false); onDelete(e); }}>
                🗑️ Sil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}