import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Roadmap } from "./types/roadmap";
import { Observable } from "./utils/observable.pattern";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Attempt } from "./types/quiz";
import { RoadmapGenerationConfig } from "./types/roadmap.config";
import { MaterialInfo } from "./types/reference";
import { getAuth } from "firebase/auth";

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

  public async ingestPedofile(pdf: string | any): Promise<Observable<string>> {
    return new Promise<Observable<string>>((resolve, reject) => {
      const messages = new Observable("Trying to fucking send the pedofile");
      resolve(messages);
      const ingestPDFFn = httpsCallable(getFunctions(), "ingestPDFFile");
      console.log(pdf);
      ingestPDFFn
        .stream({ file: pdf })
        .then((value) => {
          value.data.then((value) => {
            messages.set(value as string);
          });
        })
        .catch(reject);
    });
  }

  public async getRoadmap(id: string): Promise<Roadmap> {
    return (
      await getDoc(doc(getFirestore(), `roadmaps/${id}`))
    ).data() as Roadmap;
  }

  public async getAllRoadmaps(): Promise<Roadmap[]> {
    const queryResult = await getDocs(
      query(
        collection(getFirestore(), "roadmaps"),
        where("ownerId", "==", getAuth().currentUser?.uid)
      )
    );
    return queryResult.docs.flatMap((value) => {
      return value.data() as Roadmap;
    });
  }

  public async getAllMaterials(): Promise<MaterialInfo[]> {
    const queryResult = await getDocs(
      query(
        collection(getFirestore(), "materials"),
        where("ownerId", "==", getAuth().currentUser?.uid)
      )
    );
    return queryResult.docs.flatMap((value) => {
      return value.data() as MaterialInfo;
    });
  }

  public async getQuizAttempt(id: string): Promise<Attempt> {
    return (
      await getDoc(doc(getFirestore(), `quizzes/${id}`))
    ).data() as Attempt;
  }

  public async getAllQuizAttempts(): Promise<Attempt[]> {
    const queryResult = await getDocs(
      query(
        collection(getFirestore(), "quizzes"),
        where("ownerId", "==", getAuth().currentUser?.uid)
      )
    );
    return queryResult.docs.flatMap((value) => {
      return value.data() as Attempt;
    });
  }
}
// pls do not intialize  this class elsewhere, just import the dataservice.
export const dataService: LearnEZDataService = new LearnEZDataService();
