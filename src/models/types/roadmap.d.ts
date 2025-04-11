import { GenericReference } from "./reference";

export interface Roadmap {
  id: string;
  label: string;
  description: string;
  createdAt: Date;
  creatorId: string;
  startNode: RoadmapMilestone;
}

export interface RoadmapMilestone {
  label: string;
  description: string;
  content: Array<RoadmapCheckpoint>;
  nextMilestone?: RoadmapMilestone;
  previousMilestone?: RoadmapMilestone;
}

export interface RoadmapCheckpoint {
  label: string;
  status: RoadmapCheckpointStatus;
  description: string;
  referenceMaterial: Array<GenericReference>;
}

export enum RoadmapCheckpointStatus {
  IN_PROGRESS,
  COMPLETED,
  NOT_STARTED,
}
