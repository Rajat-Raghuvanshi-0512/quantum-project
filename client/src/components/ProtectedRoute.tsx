import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);
  if (loading) return <div>Loading...</div>;
  return (
    <>{isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />}</>
  );
};

export default ProtectedRoute;
