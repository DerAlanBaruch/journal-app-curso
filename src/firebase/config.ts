// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx6C2Bd_Sa3rStk0ON3m6I-Sr3UxBOUrQ",
  authDomain: "curso-react-5f307.firebaseapp.com",
  projectId: "curso-react-5f307",
  storageBucket: "curso-react-5f307.appspot.com",
  messagingSenderId: "518111439732",
  appId: "1:518111439732:web:e5ae45a5782aa079139a21",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
