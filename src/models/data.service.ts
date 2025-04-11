import { Roadmap } from "./types/roadmap";
import { Observable } from "./utils/observable.pattern";
import { getFunctions, httpsCallable } from "firebase/functions";

// Sorry for using firebase...

class LearnEZDataService {
  constructor() {}

  public async generateRoadmap(): Promise<Observable<Roadmap>> {
    const result = new Observable<Roadmap>();
    const generateRoadmapFn = httpsCallable(getFunctions(), "generateRoadmap");
    const inferenceResult = generateRoadmapFn();
    return result;
  }

  public async ingestPedofile(pdf: File): Promise<Observable<string>> {
    return new Promise<Observable<string>>((resolve) => {
      const messages = new Observable("Trying to fucking send the pedofile");
      resolve(messages);
      const ingestPDFFn = httpsCallable(getFunctions(), "ingestPDFFile");
      ingestPDFFn.stream().then((value) => {
        value.data.then((value) => {
          messages.set(value as string);
        });
      });
    });
  }
}
// pls do not intialize  this class elsewhere, just import the dataservice.
export const dataService: LearnEZDataService = new LearnEZDataService();
