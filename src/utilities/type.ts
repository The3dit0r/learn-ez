export enum COLOR {
  PRIMARY = "#fcf1D9",
  SECONDARY = "#5b8e7d",
  TERTIARY_1 = "#eeab40",
  TERTIARY_2 = "#497DFF",
  ERROR = "#a01000",
  OK = "#1dea79",
}

export enum RoadmapCheckpointStatus {
  IN_PROGRESS,
  COMPLETED,
  NOT_STARTED,
}

export type StyleSize = "s" | "m" | "l" | "x";

export interface RoadmapMilestone {
  label: string;
  content: Array<RoadmapCheckpoint>;
  nextMilestone?: RoadmapMilestone;
  previousMilestone?: RoadmapMilestone;
}

export interface RoadmapCheckpoint {
  label: string;
  status: RoadmapCheckpointStatus;
  description: string;
  lengthMinutes: number;
  referenceMaterial: Array<CheckpointReference>;
}

export interface CheckpointReference {
  id: string;
  vectorIndex: number;
}
