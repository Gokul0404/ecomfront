// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAawJt5jHPDT6ZGBAfP2Eyb1KJm5wrrcGM",
  authDomain: "login-65df6.firebaseapp.com",
  projectId: "login-65df6",
  storageBucket: "login-65df6.appspot.com",
  messagingSenderId: "342621003907",
  appId: "1:342621003907:web:57367fe5ad30b7829cbbb6",
  measurementId: "G-66Z4PYCEZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

