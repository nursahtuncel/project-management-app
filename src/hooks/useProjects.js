import { useEffect, useState } from "react";
import { subscribeProjects } from "../firebase/projectService";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const unsub = subscribeProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { projects, loading };
}