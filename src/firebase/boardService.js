import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const BOARD_REF = (projectId) => doc(db, "boards", projectId);

export async function createBoard(projectId, initialData) {
  const ref  = BOARD_REF(projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      ...initialData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export function subscribeBoard(projectId, callback) {
  return onSnapshot(BOARD_REF(projectId), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}

export async function updateColumns(projectId, columns) {
  await updateDoc(BOARD_REF(projectId), {
    columns,
    updatedAt: serverTimestamp(),
  });
}

export async function updateMeta(projectId, meta) {
  await updateDoc(BOARD_REF(projectId), {
    meta,
    updatedAt: serverTimestamp(),
  });
}

export async function updateMembers(projectId, members) {
  await updateDoc(BOARD_REF(projectId), {
    members,
    updatedAt: serverTimestamp(),
  });
}
