import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function Root() {
  const isProd = import.meta.env.PROD;
  return isProd ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
