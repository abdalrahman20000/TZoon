import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tools from "./pages/tools";
import GanttChart from "./pages/gantt-chart";
import GanttProjectDashboard from "./pages/gantt-chart-projects";
import Canvas from "./pages/canvas";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter basename="/TZoon/">
        <Routes>
          <Route path="/" element={<Canvas />} />
          {/* <Route path="/" element={<Tools />} /> */}
          <Route path="/tools" element={<Tools />} />
          <Route path="/gantt-chart/:projectName" element={<GanttChart />} />
          <Route
            path="/gantt-project-dashboard"
            element={<GanttProjectDashboard />}
          />

          <Route path="*" element={<Tools />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
