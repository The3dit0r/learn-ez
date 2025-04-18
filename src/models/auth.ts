import {
  browserLocalPersistence,
  getAuth,
  Persistence,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

class AuthService {
  public user: User | undefined = getAuth().currentUser || undefined;

  public async loginWithGoogle(
    persistence: Persistence = browserLocalPersistence
  ) {
    await setPersistence(getAuth(), persistence);
    this.user = (
      await signInWithPopup(getAuth(), new GoogleAuthProvider())
    ).user;
  }

  public async logout() {
    this.user = undefined;
    return signOut(getAuth());
  }
}

export const authService = new AuthService();
