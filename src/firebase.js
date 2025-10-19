import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database"; // <-- added

const firebaseConfig = {
  apiKey: "AIzaSyA2lxrC7xwkWvPZORQ4h0iiKEfymTOPX2Q",
  authDomain: "aquaculture-1f760.firebaseapp.com",
  projectId: "aquaculture-1f760",
  storageBucket: "aquaculture-1f760.firebasestorage.app",
  messagingSenderId: "787501821097",
  appId: "1:787501821097:web:c0b11b9ed622a120b24db8",
  measurementId: "G-6103835ZRY",
  databaseURL: "https://aquaculture-1f760-default-rtdb.firebaseio.com", // <--- add this manually
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();
const db = getDatabase(app); // <--- initialize Realtime DB

export { app, auth, googleProvider, db };
