import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error(
    "Root element '#root' not found. Make sure public/index.html contains <div id=\"root\"></div>."
  );
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
