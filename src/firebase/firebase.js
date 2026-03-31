import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa6bu_YtWkeL5CyVmHYiHOC21IB4Fy5dk",
  authDomain: "kanban-app-69ca8.firebaseapp.com",
  projectId: "kanban-app-69ca8",
  storageBucket: "kanban-app-69ca8.firebasestorage.app",
  messagingSenderId: "361691340446",
  appId: "1:361691340446:web:c78be0a1bb1a9503b4e58f"
};

const app = initializeApp(firebaseConfig);

export const db       = getFirestore(app);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();