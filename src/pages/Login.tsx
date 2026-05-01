import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e: any) {
      toast.error(e.message ?? "Sign-in failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
      <div className="w-full max-w-md rounded-3xl bg-card/90 backdrop-blur-md border border-border/70 p-10 shadow-soft text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Admin</p>
        <h1 className="font-serif text-4xl text-foreground font-light">
          Sign in to <span className="italic text-primary">Mom's Knee</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground font-light">
          Admin access only. Sign in with the authorized Google account.
        </p>

        <Button
          onClick={handleSignIn}
          size="lg"
          className="mt-8 w-full h-12 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          Continue with Google
        </Button>

        {user && !isAdmin && !loading && (
          <p className="mt-6 text-sm text-destructive">
            This account does not have admin access.
          </p>
        )}
      </div>
    </main>
  );
};

export default Login;
