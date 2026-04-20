import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2ulbJITG2Z9kMCDS5sTdMaIWt7tDKUuQ",
  authDomain: "ghostcut-ae869.firebaseapp.com",
  projectId: "ghostcut-ae869",
  storageBucket: "ghostcut-ae869.firebasestorage.app",
  messagingSenderId: "1019903191013",
  appId: "1:1019903191013:web:1593e9910ee5e33514710c",
  measurementId: "G-PMS7SNBT77",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogleFirebase() {
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  // Get the Firebase ID token to pass to Supabase if needed
  const idToken = await result.user.getIdToken();
  return { user: result.user, idToken };
}
