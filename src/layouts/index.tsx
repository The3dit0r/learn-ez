import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import {
  RoadmapCreatePanel,
  RoadmapDetailsPanel,
  RoadmapListPanel,
} from "@layouts/roadmaps";

import { AttemptDetailsPanel, AttemptListPanel } from "@layouts/attempts";
import { ResourceListPanel } from "@layouts/resources";
import { QuizAttemptLivePanel, QuizCreatePanel } from "@layouts/quizzes";
import { HomePanel } from "@layouts/home";

export default function LayoutRouter() {
  return (
    <Routes>
      <Route path="/quiz/create" element={<QuizCreatePanel />} />
      <Route path="/quiz/live" element={<QuizAttemptLivePanel />} />

      <Route path="/attempt/:id" element={<AttemptDetailsPanel />} />
      <Route path="/attempt" element={<AttemptListPanel />} />

      <Route path="/roadmap/create" element={<RoadmapCreatePanel />} />
      <Route path="/roadmap/:id" element={<RoadmapDetailsPanel />} />
      <Route path="/roadmap" element={<RoadmapListPanel />} />

      <Route path="/resource" element={<ResourceListPanel />} />

      <Route path="*" element={<HomePanel />} />
    </Routes>
  );
}
