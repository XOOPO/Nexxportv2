import React from "react";
import ReactDOM from "react-dom/client";
import { Router, Route } from "wouter";
import App from "./App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base="/Nexxportv2">
      <Router>
  <Route path="/login">
    <Login />
  </Route>

  <Route path="/">
    <Dashboard />
  </Route>
</Router>

  </React.StrictMode>
);
