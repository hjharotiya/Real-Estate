// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log("***", import.meta.env.VITE_FIREBASE_API_KEY, "***");
const firebaseConfig = {
  apiKey: "AIzaSyAXo96ZQQMU2HvsfqVY0wDSZ0shbZClmfs",
  authDomain: "mern-estate-c8446.firebaseapp.com",
  projectId: "mern-estate-c8446",
  storageBucket: "mern-estate-c8446.appspot.com",
  messagingSenderId: "718067208401",
  appId: "1:718067208401:web:7254ab7f3d0b24568575f0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
