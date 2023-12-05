import { createContext, useContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";

const AuthContext = createContext({ user: null, isOwner: false });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const userDocRef = doc(FIREBASE_DB, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        setIsOwner(userDoc.data()?.isOwner || false);

        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setIsOwner(doc.data()?.isOwner || false);
        });
        return () => unsubscribe();
      }
    });
  }, []);

  const values = {
    user,
    isOwner,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
