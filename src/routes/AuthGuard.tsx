import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

const AdminGuard = () => {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === 'admin' ? <Outlet /> : <Navigate to="/signin" />;
};

export { AdminGuard };
