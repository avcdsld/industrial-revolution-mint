import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDsGOxdwcs55zKPjlRLP4Dg_zraNHyfbYw",
  authDomain: "industrial-revolution-moments.firebaseapp.com",
  projectId: "industrial-revolution-moments",
  storageBucket: "industrial-revolution-moments.appspot.com",
  messagingSenderId: "330183975688",
  appId: "1:330183975688:web:26cd7ce971a8898153c2bd",
  measurementId: "G-26Z0G1B5ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
