import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

export default function initializeFirebaseApp() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  let app: FirebaseApp;

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  }
  if (process.env.NEXT_PUBLIC_HOST === "localhost" || process.env.HOST === 'localhost') {
    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099");

    const db = getFirestore();
    connectFirestoreEmulator(db, "localhost", 8080);

    const functions = getFunctions(getApp());
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
  
  return app;
}
