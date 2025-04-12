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

initializeApp(firebaseConfig);

type UDC = {
  user: User | null;
  setUser: any;
};

const UserDataContext = createContext<UDC | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UDC["user"]>(null);

  const value = { user, setUser };

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
