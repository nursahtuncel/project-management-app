import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { saveUser } from "./firebase/userService";
import { addMemberToProject } from "./firebase/projectService";
import { useProjects } from "./hooks/useProjects";
import Board from "./components/Board/Board";
import Login from "./components/Login/Login";
import ProjectList from "./components/ProjectList/ProjectList";

function AppInner({ user }) {
  const { projects, loading } = useProjects();
  const [activeProjectId, setActiveProjectId] = useState(null);

  const handleSelectProject = async (projectId) => {
    await addMemberToProject(projectId, user.uid);
    setActiveProjectId(projectId);
  };

  const handleLogout = () => {
    setActiveProjectId(null);
    signOut(auth);
  };

  if (loading) return <Loader />;

  if (!activeProjectId) {
    return (
      <ProjectList
        user={user}
        projects={projects}
        onSelect={handleSelectProject}
        onLogout={handleLogout}
      />
    );
  }

  const project = projects.find(p => p.id === activeProjectId);

  return (
    <Board
      user={user}
      projectId={activeProjectId}
      projectName={project?.name || "Proje"}
      onBack={() => setActiveProjectId(null)}
      onLogout={handleLogout}
    />
  );
}

function Loader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", fontSize:"18px", color:"#6b46c1", fontFamily:"sans-serif", gap:"10px" }}>
      <span style={{ animation:"spin 1s linear infinite", display:"inline-block" }}>⏳</span> Yükleniyor...
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}


export default function App() {
  const [user,    setUser]    = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) await saveUser(u); // giriş yapınca Firestore'a kaydet
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <Loader />;
  return user ? <AppInner user={user} /> : <Login />;
}