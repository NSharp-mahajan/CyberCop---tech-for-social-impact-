import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Firebase handles auth state automatically through AuthContext
        // Just wait for loading to complete and check if user is authenticated
        
        if (!loading) {
          if (user) {
            toast({
              title: "Authentication successful",
              description: "You have been signed in successfully.",
            });
            navigate("/dashboard");
          } else {
            setError("Authentication failed. Please try again.");
            setTimeout(() => {
              navigate("/auth");
            }, 3000);
          }
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "An error occurred during authentication");
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <h2 className="text-lg font-semibold">Completing authentication...</h2>
          <p className="text-muted-foreground">Please wait while we verify your credentials.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-red-600">Authentication Error</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
          <p className="text-sm text-muted-foreground">You will be redirected to the login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <h2 className="text-lg font-semibold">Authentication successful</h2>
        <p className="text-muted-foreground">Redirecting you to dashboard...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
