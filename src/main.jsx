import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // contains Tailwind imports + :root variables
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
