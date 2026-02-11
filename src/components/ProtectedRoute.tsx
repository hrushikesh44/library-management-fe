import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { Role } from '../auth/auth.types';

export function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles?: Role[];
}) {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.some(role => roles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
