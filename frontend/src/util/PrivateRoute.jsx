import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/UserContext';

const PrivateRoute = () => {
  const { authenticated, loading } = useContext(Context);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
