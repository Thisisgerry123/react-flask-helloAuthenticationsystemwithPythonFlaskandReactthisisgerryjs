import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import Layout from "./layout";

// Create a root.
const container = document.getElementById('app');
const root = createRoot(container); 

// Initial render
root.render(<Layout />);
