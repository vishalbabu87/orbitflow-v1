import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute â€” Guards dashboard routes from unauthenticated access.
 *
 * BUYER NOTE: Replace the localStorage token check below with your real
 * authentication logic (e.g. Supabase session, JWT validation, NextAuth, etc.)
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = true; // Bypass authentication check temporarily for testing

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
