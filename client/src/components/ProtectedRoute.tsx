import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);
  return (
    <>
      {loading === false &&
        (isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />)}
    </>
  );
};

export default ProtectedRoute;
