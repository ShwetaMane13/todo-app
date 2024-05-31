import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh8OwLv7CTvO9mtMkCggvo7ZcPa7COKhM",
  authDomain: "todo-app-e2b3c.firebaseapp.com",
  projectId: "todo-app-e2b3c",
  storageBucket: "todo-app-e2b3c.appspot.com",
  messagingSenderId: "41971814691",
  appId: "1:41971814691:web:28e87afa81f98f8b33fc96",
  measurementId: "G-J0N0W5CC8T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
