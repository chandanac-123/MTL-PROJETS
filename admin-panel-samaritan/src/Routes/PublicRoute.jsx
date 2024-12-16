import { Navigate, Outlet } from 'react-router-dom';
import { getInitialPath } from '../Utiles/Helper';

const PublicRoute = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  return <div>{!token?.ACCESS_TOKEN ? <Outlet /> : <Navigate to={getInitialPath()} />}</div>;
};

export default PublicRoute;
