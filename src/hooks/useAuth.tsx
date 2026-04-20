import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { signInWithGoogleFirebase, firebaseAuth } from "@/integrations/firebase";
import { onAuthStateChanged as onFirebaseAuthStateChanged, signOut as firebaseSignOut, type User as FirebaseUser } from "firebase/auth";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: "supabase" | "firebase";
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(user: SupabaseUser): AppUser {
  return {
    id: user.id,
    email: user.email ?? null,
    displayName: user.user_metadata?.full_name ?? user.email ?? null,
    photoURL: user.user_metadata?.avatar_url ?? null,
    provider: "supabase",
  };
}

function mapFirebaseUser(user: FirebaseUser): AppUser {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: "firebase",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else if (!firebaseAuth.currentUser) {
        // Only clear user if Firebase also has no user
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for Firebase auth state changes
    const unsubFirebase = onFirebaseAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else if (!session?.user) {
        // Only clear user if Supabase also has no user
        setUser(null);
      }
      setLoading(false);
    });

    // Check existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      // If no supabase session, Firebase listener will handle it
      if (!session?.user && !firebaseAuth.currentUser) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      unsubFirebase();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    try {
      const { user: googleUser } = await signInWithGoogleFirebase();
      setUser(mapFirebaseUser(googleUser));
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signOut = async () => {
    // Sign out from both providers
    await supabase.auth.signOut();
    await firebaseSignOut(firebaseAuth);
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    return { error: error as Error | null };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
