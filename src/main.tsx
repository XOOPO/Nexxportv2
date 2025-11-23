import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base="/Nexxport">
      <App />
    </Router>
  </React.StrictMode>
);
