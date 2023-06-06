import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANr-ulDm-z7jxJtQ0IPMBiJhKpSsBfVKc",
  authDomain: "exerciselog-324bd.firebaseapp.com",
  projectId: "exerciselog-324bd",
  storageBucket: "exerciselog-324bd.appspot.com",
  messagingSenderId: "918227612690",
  appId: "1:918227612690:web:dac954bcb133dd425a54cb",
  measurementId: "G-4146YGT207",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(root);
