// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3UwB87xHbUgh1jlWBEKDM8_j06WDB1lQ",
  authDomain: "vite-contact-2e640.firebaseapp.com",
  projectId: "vite-contact-2e640",
  storageBucket: "vite-contact-2e640.appspot.com",
  messagingSenderId: "713574022835",
  appId: "1:713574022835:web:385d4ba568e557bc6c7ac6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);