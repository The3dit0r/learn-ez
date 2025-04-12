import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Roadmap } from "./types/roadmap";
import { Observable } from "./utils/observable.pattern";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Attempt } from "./types/quiz";
import { RoadmapGenerationConfig } from "./types/roadmap.config";

// Sorry for using firebase...

class LearnEZDataService {
  constructor() {}

  public async generateRoadmap(
    materialId: string,
    roadmapGenerationConfig: RoadmapGenerationConfig,
    requestedContent: string = ""
  ): Promise<Roadmap> {
    const generateRoadmapFn = httpsCallable<
      {
        roadmapGenerationConfig: RoadmapGenerationConfig;
        materialId: string;
        requestedContent: string;
      },
      Roadmap
    >(getFunctions(), "generateRoadmap");
    return (
      await generateRoadmapFn({
        materialId,
        roadmapGenerationConfig,
        requestedContent,
      })
    ).data;
  }

  public async ingestPedofile(pdf: File): Promise<Observable<string>> {
    return new Promise<Observable<string>>((resolve) => {
      const messages = new Observable("Trying to fucking send the pedofile");
      resolve(messages);
      const ingestPDFFn = httpsCallable(getFunctions(), "ingestPDFFile");
      ingestPDFFn
        .stream({
          data: {
            file: pdf,
          },
        })
        .then((value) => {
          value.data.then((value) => {
            messages.set(value as string);
          });
        });
    });
  }
  public async getRoadmap(id: string): Promise<Roadmap> {
    return (
      await getDoc(doc(getFirestore(), `roadmaps/${id}`))
    ).data() as Roadmap;
  }

  public async getQuizAttempt(id: string): Promise<Attempt> {
    return (
      await getDoc(doc(getFirestore(), `quizzes/${id}`))
    ).data() as Attempt;
  }
}
// pls do not intialize  this class elsewhere, just import the dataservice.
export const dataService: LearnEZDataService = new LearnEZDataService();
