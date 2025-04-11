import {
  browserLocalPersistence,
  getAuth,
  Persistence,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

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
    return signOut(getAuth());
  }
}

export const authService = new AuthService();
