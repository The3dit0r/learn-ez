import { Route, Routes } from "react-router-dom";
import "./index.css";

import { QuizDetailsPanel, QuizzesListPanel, QuizCreatePanel } from "./quizzes";
import { RoadmapDetailsPanel } from "./roadmaps";
import { ComponentTestingPanel } from "./test";

export default function LayoutRouter() {
  return (
    <Routes>
      <Route path="/quiz/create" element={<QuizCreatePanel />} />
      <Route path="/quiz/:id" element={<QuizDetailsPanel />} />
      <Route path="/quiz" element={<QuizzesListPanel />} />
      <Route path="/roadmap/:id" element={<RoadmapDetailsPanel />} />
      <Route path="*" element={<ComponentTestingPanel />} />
    </Routes>
  );
}
