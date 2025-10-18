import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { uid, displayName, email, photoURL, isAnonymous }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          displayName:
            fbUser.displayName ||
            (fbUser.isAnonymous ? "Guest" : fbUser.email?.split("@")[0] || "User"),
          email: fbUser.email,
          photoURL: fbUser.photoURL || null,
          isAnonymous: fbUser.isAnonymous,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Upgrade anonymous to email/pass if anonymous; else create new account
  const signUp = async (email, password) => {
    if (auth.currentUser?.isAnonymous) {
      const cred = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, cred);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  const continueAsGuest = async () => {
    await signInAnonymously(auth);
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut, continueAsGuest }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
