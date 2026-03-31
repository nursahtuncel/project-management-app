import { useEffect, useState } from "react";
import { subscribeUsers } from "../firebase/userService";

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = subscribeUsers((raw) => {
      const mapped = raw.map(u => ({
        id:       u.uid,
        name:     u.displayName || u.email || "Kullanıcı",
        photoURL: u.photoURL || null,
        role:     u.role || "Developer",
      }));
      setUsers(mapped);
    });
    return () => unsub();
  }, []);

  return users;
}