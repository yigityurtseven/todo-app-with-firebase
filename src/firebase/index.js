import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr1EZhfQkxx_y_8K1C0I0ddOJ-f-wrHzc",
  authDomain: "badass-todo-db294.firebaseapp.com",
  projectId: "badass-todo-db294",
  storageBucket: "badass-todo-db294.appspot.com",
  messagingSenderId: "397344568642",
  appId: "1:397344568642:web:ee3325dd9c18e3b68f44db",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
