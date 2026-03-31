import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// Giriş yapan kullanıcıyı kaydet
export async function saveUser(user) {
  await setDoc(doc(db, "users", user.uid), {
    uid:         user.uid,
    displayName: user.displayName,
    email:       user.email,
    photoURL:    user.photoURL,
    role:        "Developer",
  }, { merge: true }); // merge: true → mevcut role'ü ezmez
}

// Tüm kullanıcıları gerçek zamanlı dinle
export function subscribeUsers(callback) {
  return onSnapshot(collection(db, "users"), (snap) => {
    const users = snap.docs.map(d => d.data());
    callback(users);
  });
}