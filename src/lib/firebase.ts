import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Load Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID,
};

let app;
try {
  if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId) {
    throw new Error("Firebase configuration is missing. Please set VITE_FIREBASE_* environment variables");
  }
  app = initializeApp(firebaseConfig);
  if (import.meta.env.DEV) {
    console.log("Firebase initialized successfully");
  }
} catch (error) {
  if (import.meta.env.DEV) {
    console.error("Firebase initialization failed:", error);
  }
  throw error;
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app, firebaseConfig?.firestoreDatabaseId);

// Enable offline persistence
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    if (import.meta.env.DEV) {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    }
  } else if (err.code === 'unimplemented') {
    if (import.meta.env.DEV) {
      console.warn('The current browser does not support all features required to enable persistence');
    }
  }
});

export const storage = getStorage(app);
