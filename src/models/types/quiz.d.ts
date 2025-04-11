import { GenericReference } from "./reference.js";

// Questions and answers should be rendered with Markdown
// (pls use library for this)
// for tabular data support and rendering mathematical equations.
export interface GenericQuestion {
  // Facillitates non-MCQ questions

  maxScore: number;
  minScore: number;
  passingScore: number;
  answer: string;
  question: string;
  level: number;
  reference: GenericReference;
}

export interface MultipleChoiceQuestion extends GenericQuestion {
  choices: Map<"A" | "B" | "C" | "D", string>;
}

export interface Attempt {
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  maxLength?: number;
  attemptData: QuestionAttempt[];
  attemptStatus: Atte
}

export interface QuestionAttempt {
  question: GenericQuestion;
  index: number;
  userAnswer?: string;
  pointsReceived?: number;
  answeredAt?: Date;
  harderQuestion?: GenericQuestion;
  easierQuestion?: GenericQuestion;
}