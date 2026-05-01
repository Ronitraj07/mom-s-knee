import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
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

  // ✅ CRITICAL: prevents multiple API calls
  const hasCheckedAdmin = useRef(false);

  useEffect(() => {
    const handleSession = (s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);

      // ✅ stop loading immediately
      setLoading(false);

      if (s?.user && !hasCheckedAdmin.current) {
        hasCheckedAdmin.current = true; // 🔥 LOCK
        checkAdmin(s.user.id);
      }

      if (!s?.user) {
        setIsAdmin(false);
        hasCheckedAdmin.current = false; // reset on logout
      }
    };

    // 🔁 Auth listener
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        handleSession(newSession);
      }
    );

    // 🔍 Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // ✅ CLEAN admin check (no retry, no loop)
  const checkAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin");

      if (error) {
        console.error("Admin check error:", error);
        return;
      }

      setIsAdmin(!!data && data.length > 0);
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
    hasCheckedAdmin.current = false;
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
