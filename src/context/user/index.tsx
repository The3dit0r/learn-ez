import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Powered by Sorry for using Firebase...
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@models/utils/firebase.env";
import { Roadmap } from "@models/types/roadmap";
import { Attempt } from "@models/types/quiz";

initializeApp(firebaseConfig);

type UDC = {
  user: User | null;
  setUser: any;

  roadmaps: Roadmap[];
  attempts: Attempt[];
};

const UserDataContext = createContext<UDC | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UDC["user"]>(null);
  const [roadmaps, setRoadmaps] = useState<UDC["roadmaps"]>([]);
  const [attempts, setAttempts] = useState<UDC["attempts"]>([]);

  useEffect(() => {
    const request = { valid: true };

    onAuthStateChanged(getAuth(), (val) => {
      if (!request.valid) {
        return;
      }

      setUser(val);
    });

    return () => {
      request.valid = false;
    };
  }, []);

  const value = { user, setUser, roadmaps, attempts };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const data = useContext(UserDataContext);

  if (!data) {
    throw new Error("Stuiadawd");
  }

  return data;
}
