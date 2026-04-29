import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential } from "firebase/auth";
import { isNativePlatform } from "@/utils/platform";

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

/**
 * Sign in with Google — works on both web and native (Android/iOS).
 *
 * On **web**: uses `signInWithPopup` (Firebase JS SDK).
 * On **native**: uses `@capgo/capacitor-social-login` for a true native
 * Google sign-in flow via Credential Manager (Android) or Google SDK (iOS),
 * then exchanges the returned `idToken` for a Firebase credential.
 */
export async function signInWithGoogleFirebase() {
  if (isNativePlatform()) {
    // ---------- Native (Android / iOS) ----------
    const { SocialLogin } = await import("@capgo/capacitor-social-login");

    // Initialize the Google provider with the **web** client ID.
    // On Android this must match the OAuth 2.0 Web Client ID from your
    // Google Cloud Console (the same one listed in google-services.json).
    await SocialLogin.initialize({
      google: {
        webClientId: "1019903191013-gudui8s2vf4rv4fdlp5peog1fn2pktkb.apps.googleusercontent.com",
      },
    });

    const loginResult = await SocialLogin.login({
      provider: "google",
      options: {},
    });

    // The plugin returns the Google ID token inside `result`
    const idToken = (loginResult as any).result?.idToken;
    if (!idToken) {
      throw new Error("Google sign-in succeeded but no idToken was returned.");
    }

    // Exchange the Google ID token for a Firebase credential
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(firebaseAuth, credential);
    const firebaseIdToken = await userCredential.user.getIdToken();

    return { user: userCredential.user, idToken: firebaseIdToken };
  }

  // ---------- Web ----------
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  // Get the Firebase ID token to pass to Supabase if needed
  const idToken = await result.user.getIdToken();
  return { user: result.user, idToken };
}
