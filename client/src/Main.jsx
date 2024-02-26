import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Register the service worker for PWA creation
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

// Render the React app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
