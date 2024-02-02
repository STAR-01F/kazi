import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from './hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
}
const WithUnauth = ({children}: RequireAuthProps) => {
  const {user} = useAuth();
  const location = useLocation();

  // if (user) {
  //   return <Navigate to="/" state={{from: location}} replace />;
  // }
  return children;
};

export default WithUnauth;
