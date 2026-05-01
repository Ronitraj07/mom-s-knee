import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSession = (s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);

      // ✅ STOP loading immediately (never block UI)
      setLoading(false);

      if (s?.user) {
        checkAdmin(); // 🚀 async, no await
      } else {
        setIsAdmin(false);
      }
    };

    // 🔁 Listen to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        handleSession(newSession);
      }
    );

    // 🔍 Initial session load
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // ✅ SAFE admin check (no blocking, no crash)
  const checkAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Admin check error:", error);
        return;
      }

      setIsAdmin(!!data);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, isAdmin, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
