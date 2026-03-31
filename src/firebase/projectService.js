import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  onSnapshot, serverTimestamp, getDoc
} from "firebase/firestore";
import { db } from "./firebase";

import { increment } from "firebase/firestore";

export async function getNextTicketId(projectId, projectName) {
  const ref = doc(db, "projects", projectId);
  await updateDoc(ref, { ticketCounter: increment(1) });
  const snap = await getDoc(ref);
  const count = snap.data().ticketCounter || 1;
  const prefix = (projectName || "KAN").slice(0, 3).toUpperCase();
  return `${prefix}-${count}`;
}
export async function createProject(name, createdBy) {
  const ref = await addDoc(collection(db, "projects"), {
    name,
    createdBy,
    members:   [createdBy],
    archived:  false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function addMemberToProject(projectId, uid) {
  const ref  = doc(db, "projects", projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const members = snap.data().members || [];
  if (!members.includes(uid)) {
    await updateDoc(ref, { members: [...members, uid] });
  }
}

export async function archiveProject(projectId) {
  const ref  = doc(db, "projects", projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const current = snap.data().archived || false;
  await updateDoc(ref, {
    archived:  !current,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(projectId) {
  await deleteDoc(doc(db, "projects", projectId));
}

export function subscribeProjects(callback) {
  return onSnapshot(collection(db, "projects"), (snap) => {
    const projects = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(projects);
  });
}