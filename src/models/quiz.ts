import { Attempt, MultipleChoiceQuestion } from "./types/quiz";
import { io, Socket } from "socket.io-client";
import { RoadmapCheckpoint } from "../utilities/type";
import { Observable } from "./utils/observable.pattern";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";

class QuizService {
  private socket: Socket = io("http://localhost:6969");
  constructor() {}

  public async startQuizFromCheckpoint(
    checkpoint: RoadmapCheckpoint,
    initialQuery: string = checkpoint.description
  ): Promise<QuizStartData> {
    return this.startQuizFromMaterial(
      checkpoint.referenceMaterial[0].id,
      initialQuery
    );
  }

  public async startQuizFromMaterial(
    referenceMaterialId: string,
    initialQuery: string
  ): Promise<QuizStartData> {
    return new Promise<QuizStartData>((resolve) => {
      this.socket.emit(
        "quiz-begin",
        referenceMaterialId,
        initialQuery,
        async (callback: {
          ques: MultipleChoiceQuestion;
          attemptDocId: string;
        }) => {
          const observable = new Observable(
            (
              await getDoc(
                doc(getFirestore(), `quizzes/${callback.attemptDocId}`)
              )
            ).data() as Attempt
          );

          resolve({
            ques: callback.ques,
            attemptObservable: observable,
          });
          onSnapshot(
            doc(getFirestore(), `quizzes/${callback.attemptDocId}`),
            (next) => {
              observable.set(next.data() as Attempt);
            }
          );
        }
      );
    });
  }

  /**
   * This function implicitly sets the answer for the newest question
   * @param attemptId
   * @param answer
   */
  public async sendAnswer(
    attemptId: string,
    answer: string
  ): Promise<AnswerSetCallback> {
    return new Promise<AnswerSetCallback>((resolve) => {
      this.socket.emit(
        "record-answer",
        attemptId,
        answer,
        (callback: AnswerSetCallback | PromiseLike<AnswerSetCallback>) => {
          resolve(callback);
        }
      );
    });
  }
}

export interface QuizStartData {
  ques: MultipleChoiceQuestion;
  attemptObservable: Observable<Attempt>;
}

export type AnswerSetCallback =
  | { wasCorrect: boolean; currentAttemptData: Attempt }
  | {
      isOver: boolean;
    };
export const quizService = new QuizService();
