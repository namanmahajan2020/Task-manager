import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCah4XZjQc7XYoNgs1_LyHIuKN2rd5jMqc",
    authDomain: "itask-ed4ef.firebaseapp.com",
    projectId: "itask-ed4ef",
    storageBucket: "itask-ed4ef.firebasestorage.app",
    messagingSenderId: "977508587564",
    appId: "1:977508587564:web:3403d47cf77368b4605989",
    measurementId: "G-HXW1EFC2HT"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
