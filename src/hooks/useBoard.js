import { useEffect, useState, useCallback } from "react";
import {
  createBoard, subscribeBoard,
  updateColumns, updateMeta, updateMembers,
} from "../firebase/boardService";

const emptyBoard = {
  meta: {
    skillTrack: "", level: "", language: "",
    startDate: "", endDate: "", teamLead: "",
  },
  columns: {
    todo:       { id: "todo",       title: "To Do",       color: "#e53e3e", cards: [] },
    inprogress: { id: "inprogress", title: "In Progress", color: "#d69e2e", cards: [] },
    review:     { id: "review",     title: "Code Review", color: "#6b46c1", cards: [] },
    done:       { id: "done",       title: "Done",        color: "#276749", cards: [] },
  },
  columnOrder: ["todo", "inprogress", "review", "done"],
};

export function useBoard(projectId) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    let unsub;
    async function init() {
      await createBoard(projectId, emptyBoard);
      unsub = subscribeBoard(projectId, (boardData) => {
        setData(boardData);
        setLoading(false);
      });
    }
    init();
    return () => unsub?.();
  }, [projectId]);

  const saveColumns = useCallback((columns) => {
    updateColumns(projectId, columns);
  }, [projectId]);

  const saveMeta = useCallback((meta) => {
    updateMeta(projectId, meta);
  }, [projectId]);

  const saveMembers = useCallback((members) => {
    updateMembers(projectId, members);
  }, [projectId]);

  return { data, loading, saveColumns, saveMeta, saveMembers };
}