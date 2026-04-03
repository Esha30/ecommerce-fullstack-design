import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Form } from "react-router-dom";
import DialogBox from "./components/login.signup/DialogBox.jsx";
import Profile from "./pages/Profile.jsx";

// Silence only the React DevTools suggestion in development console.
if (import.meta.env.DEV) {
  const originalInfo = console.info;
  console.info = (...args) => {
    const firstArg = typeof args[0] === "string" ? args[0] : "";
    if (firstArg.includes("Download the React DevTools")) return;
    originalInfo(...args);
  };
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <DialogBox />
            <Profile/>
      <App />
    </StrictMode>
  </BrowserRouter>
);
