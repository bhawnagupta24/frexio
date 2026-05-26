// Firebase client init with safe mock fallback when env vars aren't set yet.
// This keeps the app fully usable in mock mode so users can preview every page
// before they wire up real Firebase credentials.

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

type Env = ImportMetaEnv & Record<string, string | undefined>;
const env = (import.meta as unknown as { env: Env }).env;

const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
};

export const firebaseConfigured = Boolean(
  config.apiKey && config.projectId && config.appId,
);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

export function getFirebase() {
  if (!firebaseConfigured) return null;
  if (typeof window === "undefined") return null;
  if (!_app) {
    _app = getApps()[0] ?? initializeApp(config as Record<string, string>);
    _auth = getAuth(_app);
    _db = getFirestore(_app);
    _storage = getStorage(_app);
  }
  return { app: _app, auth: _auth!, db: _db!, storage: _storage! };
}
