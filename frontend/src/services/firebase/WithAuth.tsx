import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from './hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
}
const WithAuth = ({children}: RequireAuthProps) => {
  const {user} = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{from: location}} replace />;
  }
  return children;
};

export default WithAuth;
