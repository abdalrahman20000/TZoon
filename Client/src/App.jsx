import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tools from "./pages/tools";
import GanttChart from "./pages/gantt-chart";
import Home from "./pages/home";
import GanttProjectDashboard from "./pages/gantt-chart-projects";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tools />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/gantt-chart/:projectName" element={<GanttChart />} />
          <Route
            path="/gantt-project-dashboard"
            element={<GanttProjectDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
