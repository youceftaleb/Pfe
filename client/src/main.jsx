import React from "react";
import ReactDOM from "react-dom/client";
import App, { router } from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
