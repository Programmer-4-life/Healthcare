import React from "react";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";


function App() {
  return (
      <Router>
        <Toaster />
        <Routes>
          <Route path="/patience" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/patience" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
