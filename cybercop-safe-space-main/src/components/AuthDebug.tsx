import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
// Supabase integration removed - Firebase will be added later
// TODO: Implement Firebase database functions for auth debugging

export const AuthDebug = () => {
  const { user, session, loading } = useAuth();

  useEffect(() => {
    // Log current auth state
    console.log('AuthDebug - Current state:', {
      user: user?.email,
      session: !!session,
      loading
    });

    // Check Firebase directly
    const checkFirebase = async () => {
      console.log('AuthDebug - Firebase direct check');
      // Mock session for now
      const session = {
        user: { email: 'user@example.com' },
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString()
      };
      
      console.log('AuthDebug - Firebase check:', {
        session: !!session,
        user: session?.user?.email,
        error: null
      });
    };

    checkFirebase();
    
    // Listen to auth changes (placeholder)
    const subscription = {
      unsubscribe: () => console.log('AuthDebug - Firebase auth listener unsubscribed')
    };
    
    return () => {
      subscription.unsubscribe();
    };
  }, [user, session, loading]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 p-4 bg-black/80 text-white rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>User: {user ? user.email : 'null'}</p>
        <p>Session: {session ? 'active' : 'null'}</p>
      </div>
    </div>
  );
};
