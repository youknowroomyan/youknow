import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSuJ6uZeuUl6CupkbHJip0Cmha2xmzeKo",
  authDomain: "netflix-31595.firebaseapp.com",
  projectId: "netflix-31595",
  storageBucket: "netflix-31595.appspot.com",
  messagingSenderId: "726459138475",
  appId: "1:726459138475:web:137098b1e0d649669452ee",
  measurementId: "G-39C7BQ8RTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
