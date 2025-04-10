import { Route, Routes } from "react-router-dom";
import "./index.css";

import { QuizDetailsPanel, QuizzesListPanel, QuizCreatePanel } from "./quizzes";
import {
  RoadmapCreatePanel,
  RoadmapDetailsPanel,
  RoadmapListPanel,
} from "./roadmaps";

import { HomePanel } from "./home";
import { ResourceListPanel } from "./resources";

export default function LayoutRouter() {
  return (
    <Routes>
      <Route path="/quiz/create" element={<QuizCreatePanel />} />
      <Route path="/quiz/:id" element={<QuizDetailsPanel />} />
      <Route path="/quiz" element={<QuizzesListPanel />} />

      <Route path="/roadmap/create" element={<RoadmapCreatePanel />} />
      <Route path="/roadmap/:id" element={<RoadmapDetailsPanel />} />
      <Route path="/roadmap" element={<RoadmapListPanel />} />

      <Route path="/resource" element={<ResourceListPanel />} />

      <Route path="*" element={<HomePanel />} />
    </Routes>
  );
}
