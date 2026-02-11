import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function RoleRedirect() {
  const { roles } = useAuth ();

  if (roles.includes('admin')) return <Navigate to="/admin" replace />;
  if (roles.includes('librarian')) return <Navigate to="/librarian" replace />;
  return <Navigate to="/dashboard" replace />;
}

export default RoleRedirect;
